import { useEffect, useRef, useState, useCallback } from "react";
import Modal from 'react-modal';

// Tipos y configuraciones iniciales (se mantienen igual)
type FaceBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type EmotionScores = {
  anger: number;
  disgust: number;
  fear: number;
  joy: number;
  sadness: number;
  surprise: number;
  neutral: number;
};

type FaceData = {
  box: FaceBox;
  dominant_emotion: string;
  scores: EmotionScores;
};

type ProcessingResult = {
  faces: FaceData[];
};

const emotionColors: Record<string, string> = {
  joy: "#2ecc71",
  anger: "#e74c3c",
  sadness: "#3498db",
  surprise: "#f1c40f",
  fear: "#9b59b6",
  disgust: "#1abc9c",
  neutral: "#95a5a6",
};

const TARGET_PROCESSING_FPS = 5;
const MAX_QUEUE_SIZE = 3;

// Configuración de react-modal para accesibilidad
Modal.setAppElement('#root');

const RealTimePage = () => {
  // Referencias y estados (se mantienen igual)
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fpsCounterRef = useRef<HTMLDivElement>(null);
  const queueSizeDisplayRef = useRef<HTMLDivElement>(null);
  const processingStatsRef = useRef<HTMLDivElement>(null);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isProcessingActive, setIsProcessingActive] = useState(false);
  const [fps, setFps] = useState(0);
  const [queueSize, setQueueSize] = useState(0);
  const [emotionData, setEmotionData] = useState<EmotionScores | null>(null);
  const [totalFramesProcessed, setTotalFramesProcessed] = useState(0);
  const [dominantEmotion, setDominantEmotion] = useState<string>("Ninguna");
  const [averageConfidence, setAverageConfidence] = useState<number>(0);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const streamRef = useRef<MediaStream | null>(null);
  const processingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const frameCountRef = useRef(0);
  const lastFpsUpdateRef = useRef(0);
  const processingQueueRef = useRef<
    Array<{
      sequence: number;
      blob: Blob;
      timestamp: number;
    }>
  >([]);
  const isProcessingFrameRef = useRef(false);
  const requestSequenceRef = useRef(0);
  const lastProcessedSequenceRef = useRef(-1);
  const lastResultsRef = useRef<ProcessingResult | null>(null);
  const processingTimesRef = useRef<number[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Todas las funciones de lógica se mantienen igual
  const updateProcessingStats = useCallback((processingTime: number) => {
    processingTimesRef.current.push(processingTime);

    if (processingTimesRef.current.length > 10) {
      processingTimesRef.current.shift();
    }

    const avgTime =
      processingTimesRef.current.reduce((a, b) => a + b, 0) /
      processingTimesRef.current.length;
    const fpsEstimate = 1000 / avgTime;

    if (processingStatsRef.current) {
      processingStatsRef.current.innerHTML = `
        <div>Tiempo de procesamiento: ${avgTime.toFixed(1)}ms</div>
        <div>FPS estimados: ${fpsEstimate.toFixed(1)}</div>
        <div>Última secuencia: ${lastProcessedSequenceRef.current}</div>
      `;
    }
  }, []);

  const updateEmotionMetrics = useCallback((data: ProcessingResult) => {
    if (!data.faces || data.faces.length === 0) {
      return;
    }

    const face = data.faces[0];
    setEmotionData(face.scores);
    setDominantEmotion(face.dominant_emotion || "Ninguna");
    setTotalFramesProcessed((prev) => prev + 1);

    const scores = Object.values(face.scores);
    const maxScore = Math.max(...scores);
    setAverageConfidence(maxScore * 100);
  }, []);

  const processQueue = useCallback(async () => {
    if (
      isProcessingFrameRef.current ||
      processingQueueRef.current.length === 0
    ) {
      return;
    }

    isProcessingFrameRef.current = true;
    const startTime = performance.now();

    try {
      const frameData = processingQueueRef.current.shift();
      setQueueSize(processingQueueRef.current.length);

      if (!frameData) return;

      const formData = new FormData();
      formData.append("file", frameData.blob, "frame.jpg");
      formData.append("sequence", frameData.sequence.toString());

      const response = await fetch(
        // Consumiendo la API desde producción
        "https://emotion-detection-apileo-184861052679.northamerica-south1.run.app/api/v1/webcam/process-frame",
        
        /* descomenta para usar la API desde el docker"
        http://localhost:8000/api/v1/detection/process-image",
        */
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Error en el servidor");
      }

      const data = await response.json();
      const processingTime = performance.now() - startTime;

      updateProcessingStats(processingTime);

      if (frameData.sequence > lastProcessedSequenceRef.current) {
        lastProcessedSequenceRef.current = frameData.sequence;
        lastResultsRef.current = JSON.parse(JSON.stringify(data));
        if (lastResultsRef.current) {
          updateEmotionMetrics(lastResultsRef.current);
        }
      }
    } catch (error) {
      console.error("Error al procesar el frame:", error);
    } finally {
      isProcessingFrameRef.current = false;

      if (processingQueueRef.current.length > 0) {
        setTimeout(processQueue, 0);
      }
    }
  }, [updateProcessingStats, updateEmotionMetrics]);

  const addFrameToQueue = useCallback(() => {
    if (
      isProcessingFrameRef.current ||
      processingQueueRef.current.length >= MAX_QUEUE_SIZE ||
      !canvasRef.current
    ) {
      return;
    }

    const currentSequence = ++requestSequenceRef.current;

    canvasRef.current.toBlob(
      (blob) => {
        if (!blob) return;

        processingQueueRef.current.push({
          sequence: currentSequence,
          blob: blob,
          timestamp: Date.now(),
        });

        setQueueSize(processingQueueRef.current.length);

        if (!isProcessingFrameRef.current) {
          processQueue();
        }
      },
      "image/jpeg",
      0.8
    );
  }, [processQueue]);

  const startProcessing = useCallback(() => {
    if (!processingIntervalRef.current) {
      processingIntervalRef.current = setInterval(() => {
        if (
          !isProcessingFrameRef.current &&
          processingQueueRef.current.length < MAX_QUEUE_SIZE
        ) {
          addFrameToQueue();
        }
      }, 1000 / TARGET_PROCESSING_FPS);

      processQueue();
    }
  }, [addFrameToQueue, processQueue]);

  const acceptDisclaimer = useCallback(() => {
    setShowDisclaimer(false);
    const newProcessingState = !isProcessingActive;
    setIsProcessingActive(newProcessingState);

    if (newProcessingState) {
      startProcessing();
      if (processingStatsRef.current) {
        processingStatsRef.current.style.display = "block";
      }
    }
  }, [isProcessingActive, startProcessing]);

  const drawDetectionResults = useCallback((data: ProcessingResult) => {
    if (!ctxRef.current || !canvasRef.current) return;

    data.faces.forEach((face) => {
      const box = face.box;
      const emotion = face.dominant_emotion;
      const color = emotionColors[emotion] || "#00FF00";
      const maxScore = Math.max(...Object.values(face.scores));
      const percentage = (maxScore * 100).toFixed(1);
      const text = `${emotion} (${percentage}%)`;

      ctxRef.current!.strokeStyle = color;
      ctxRef.current!.lineWidth = 3;
      ctxRef.current!.strokeRect(box.x, box.y, box.width, box.height);

      ctxRef.current!.fillStyle = color;
      const textWidth = ctxRef.current!.measureText(text).width;
      ctxRef.current!.fillRect(box.x - 2, box.y - 25, textWidth + 10, 20);

      ctxRef.current!.fillStyle = "#ffffff";
      ctxRef.current!.font = "14px Arial";
      ctxRef.current!.fillText(text, box.x + 3, box.y - 10);
    });
  }, []);

  const renderLoop = useCallback(() => {
    if (
      !streamRef.current ||
      !canvasRef.current ||
      !videoRef.current ||
      !ctxRef.current
    )
      return;

    const now = performance.now();
    frameCountRef.current++;

    if (now - lastFpsUpdateRef.current >= 1000) {
      const newFps = frameCountRef.current;
      setFps(newFps);
      frameCountRef.current = 0;
      lastFpsUpdateRef.current = now;
    }

    ctxRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    ctxRef.current.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    const currentResults = lastResultsRef.current;
    if (currentResults?.faces && currentResults.faces.length > 0) {
      drawDetectionResults(currentResults);
    }

    animationFrameIdRef.current = requestAnimationFrame(renderLoop);
  }, [drawDetectionResults]);

  const stopProcessing = useCallback(() => {
    if (processingIntervalRef.current) {
      clearInterval(processingIntervalRef.current);
      processingIntervalRef.current = null;
      processingQueueRef.current = [];
      setQueueSize(0);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      stopProcessing();

      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;

      if (videoRef.current) {
        videoRef.current.srcObject = null;
        videoRef.current.style.display = "none";
      }

      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }

      if (ctxRef.current && canvasRef.current) {
        ctxRef.current.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      }

      processingQueueRef.current = [];
      lastResultsRef.current = null;
      setQueueSize(0);

      setIsCameraActive(false);
      setIsProcessingActive(false);
    }
  }, [stopProcessing]);

  const toggleProcessing = useCallback(() => {
    if (!isProcessingActive) {
      setShowDisclaimer(true);
      return;
    }

    const newProcessingState = !isProcessingActive;
    setIsProcessingActive(newProcessingState);

    if (newProcessingState) {
      startProcessing();
      if (processingStatsRef.current) {
        processingStatsRef.current.style.display = "block";
      }
    } else {
      stopProcessing();
      if (processingStatsRef.current) {
        processingStatsRef.current.style.display = "none";
      }
    }
  }, [isProcessingActive, startProcessing, stopProcessing]);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.style.display = "block";
          }
          renderLoop();
        };
      }

      setIsCameraActive(true);
    } catch (err) {
      console.error("Error al acceder a la cámara:", err);
      alert("No se pudo acceder a la cámara. Asegúrate de permitir el acceso.");
    }
  }, [renderLoop]);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctxRef.current = ctx;
        canvasRef.current.width = 640;
        canvasRef.current.height = 480;
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // Estilos personalizados para el modal
  const customModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '500px',
      width: '90%',
      backgroundColor: '#1b2427',
      border: '1px solid #366348',
      borderRadius: '8px',
      padding: '20px'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      zIndex: 50
    }
  };

  return (
    <div className="px-40 flex flex-1 bg-[#1b2427] drop-shadow-2xl justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
           Análisis de Emociones en Tiempo Real
          </p>
        </div>
        <div className="p-4">
          <div className="relative flex items-center justify-center bg-[#000000] bg-cover bg-center aspect-video rounded-lg p-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute opacity-0 w-full h-full object-cover"
            ></video>
            <canvas
              ref={canvasRef}
              className="w-full h-full object-cover"
            ></canvas>
            <div
              className="absolute top-[20px] right-[20px] bg-black/50 text-white px-[10px] py-[5px] rounded-[4px]"
              ref={fpsCounterRef}
            >
              {fps} FPS
            </div>
            <div
              className="absolute top-[60px] right-[20px] bg-black/50 text-white px-[10px] py-[5px] rounded-[4px]"
              ref={queueSizeDisplayRef}
            >
              Queue: {queueSize}
            </div>
          </div>
          <div
            className="text-center my-2.5 italic text-gray-500"
            ref={processingStatsRef}
            style={{ display: "none" }}
          >
            Procesando video en tiempo real...
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 max-w-[480px] justify-center">
            <button
              onClick={startCamera}
              disabled={isCameraActive}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#38e07b] text-[#122118] text-sm font-bold leading-normal tracking-[0.015em] grow"
            >
              <span className="truncate">Iniciar Cámara</span>
            </button>
            <button
              onClick={stopCamera}
              disabled={!isCameraActive}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#38e07b] text-[#122118] text-sm font-bold leading-normal tracking-[0.015em] grow"
            >
              <span className="truncate">Detener Cámara</span>
            </button>
            <button
              onClick={toggleProcessing}
              disabled={!isCameraActive}
              className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 ${
                isProcessingActive ? "bg-[#1e3a2a]" : "bg-[#264532]"
              } text-white text-sm font-bold leading-normal tracking-[0.015em] grow`}
            >
              <span className="truncate">
                {isProcessingActive
                  ? "Detener Captura de Emociones"
                  : "Iniciar Captura de Emociones"}
              </span>
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Distribución de Emociones
          </h2>
          <div className="flex flex-wrap gap-4 px-4 py-6">
            <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-lg border border-[#366348] p-6">
              <p className="text-white text-base font-medium leading-normal">
                Emociones Detectadas
              </p>
              <div className="flex min-h-[180px] w-full gap-2 items-end justify-between px-1">
                {emotionData ? (
                  [
                    "joy",
                    "anger",
                    "sadness",
                    "surprise",
                    "fear",
                    "disgust",
                    "neutral",
                  ].map((emotion) => {
                    const score =
                      emotionData[emotion as keyof EmotionScores] || 0;
                    const color = emotionColors[emotion] || "#264532";

                    return (
                      <div
                        key={emotion}
                        className="flex flex-col items-center flex-1 h-full"
                      >
                        <div className="flex flex-col items-center justify-end flex-1 w-full">
                          <div
                            className="border-[#96c5a9] border-t-2 w-full transition-all duration-300 rounded-t-sm"
                            style={{
                              height: `${(score * 100).toFixed(1)}%`,
                              backgroundColor: color,
                              minHeight: "2px",
                              maxHeight: "100%",
                            }}
                          ></div>
                        </div>
                        <div className="text-center mt-2">
                          <p className="text-[#96c5a9] text-[11px] font-bold leading-tight tracking-[0.015em] capitalize">
                            {emotion}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            {(score * 100).toFixed(0)}%
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex items-center justify-center h-full w-full">
                    <p className="text-gray-400">No hay datos disponibles</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Estadísticas de Procesamiento
          </h2>
          <div className="flex flex-wrap gap-4 p-4">
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#366348]">
              <p className="text-white text-base font-medium leading-normal">
                Emoción Dominante
              </p>
              <p className="text-white tracking-light text-2xl font-bold leading-tight capitalize">
                {dominantEmotion}
              </p>
            </div>
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#366348]">
              <p className="text-white text-base font-medium leading-normal">
                Confianza Promedio
              </p>
              <p className="text-white tracking-light text-2xl font-bold leading-tight">
                {averageConfidence.toFixed(0)}%
              </p>
            </div>
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#366348]">
              <p className="text-white text-base font-medium leading-normal">
                Total de Frames Procesados
              </p>
              <p className="text-white tracking-light text-2xl font-bold leading-tight">
                {totalFramesProcessed}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Disclaimer usando react-modal */}
      <Modal
        isOpen={showDisclaimer}
        onRequestClose={() => setShowDisclaimer(false)}
        style={customModalStyles}
        contentLabel="Autorización de Datos Biométricos"
      >
        <h3 className="text-white text-xl font-bold mb-4">
          Autorización de Datos Biométricos
        </h3>

        <div className="bg-[#122118] p-4 rounded-lg mb-4 max-h-60 overflow-y-auto">
          <p className="text-xs text-gray-300 leading-relaxed">
            "Autorizo el uso de mis datos biométricos faciales únicamente para:
            <br />
            <br />
            (1) Investigación educativa en FaceFeel AI,
            <br />
            (2) Desarrollo de algoritmos académicos
            <br />
            (3) Mejora de sistemas de reconocimiento emocional no comercial,
            conforme a la Ley 1581 de 2012 y RGPD. 
            <br />
            Mis datos serán anonimizados
            y almacenados seguramente por máximo 3 años. Conservo todos los
            derechos ARCO (acceso, rectificación, cancelación y oposición) y
            puedo retirar este consentimiento enviando solicitud a
            privacidad@facefeel.ai."
          </p>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setShowDisclaimer(false)}
            className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition"
          >
            Cancelar
          </button>
          <button
            onClick={acceptDisclaimer}
            className="px-4 py-2 text-white bg-[#38e07b] rounded-lg hover:bg-[#2ecc71] transition"
          >
            Aceptar y Continuar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default RealTimePage;
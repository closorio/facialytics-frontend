// src/pages/RealTime.tsx
import { useEffect, useRef, useState, useCallback } from "react";

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

const RealTimePage = () => {
  // Refs para elementos del DOM
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fpsCounterRef = useRef<HTMLDivElement>(null);
  const queueSizeDisplayRef = useRef<HTMLDivElement>(null);
  const processingStatsRef = useRef<HTMLDivElement>(null);

  // Estado del componente
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isProcessingActive, setIsProcessingActive] = useState(false);
  const [fps, setFps] = useState(0);
  const [queueSize, setQueueSize] = useState(0);
  const [emotionData, setEmotionData] = useState<EmotionScores | null>(null);
  const [totalFramesProcessed, setTotalFramesProcessed] = useState(0);
  const [dominantEmotion, setDominantEmotion] = useState<string>("Ninguna");
  const [averageConfidence, setAverageConfidence] = useState<number>(0);

  // Variables de estado persistentes
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

  // Función para dibujar los resultados de detección
  const drawDetectionResults = useCallback((data: ProcessingResult) => {
    if (!ctxRef.current || !canvasRef.current) return;

    data.faces.forEach((face) => {
      const box = face.box;
      const emotion = face.dominant_emotion;
      const color = emotionColors[emotion] || "#00FF00";
      const maxScore = Math.max(...Object.values(face.scores));
      const percentage = (maxScore * 100).toFixed(1);
      const text = `${emotion} (${percentage}%)`;

      // Dibujar bounding box
      ctxRef.current!.strokeStyle = color;
      ctxRef.current!.lineWidth = 3;
      ctxRef.current!.strokeRect(box.x, box.y, box.width, box.height);

      // Dibujar fondo para el texto
      ctxRef.current!.fillStyle = color;
      const textWidth = ctxRef.current!.measureText(text).width;
      ctxRef.current!.fillRect(box.x - 2, box.y - 25, textWidth + 10, 20);

      // Dibujar texto
      ctxRef.current!.fillStyle = "#ffffff";
      ctxRef.current!.font = "14px Arial";
      ctxRef.current!.fillText(text, box.x + 3, box.y - 10);
    });
  }, []);

  // Función para actualizar las métricas de emociones
  const updateEmotionMetrics = useCallback((data: ProcessingResult) => {
    if (!data.faces || data.faces.length === 0) {
      // No hay rostros detectados, pero mantenemos los datos anteriores
      return;
    }

    // Tomamos el primer rostro detectado
    const face = data.faces[0];
    setEmotionData(face.scores);
    setDominantEmotion(face.dominant_emotion || "Ninguna");
    setTotalFramesProcessed((prev) => prev + 1);

    // Calcular confianza promedio
    const scores = Object.values(face.scores);
    const maxScore = Math.max(...scores); // Usamos la emoción con mayor puntuación
    setAverageConfidence(maxScore * 100); // Convertir a porcentaje
  }, []);

  // Función para actualizar estadísticas de procesamiento
  const updateProcessingStats = useCallback((processingTime: number) => {
    processingTimesRef.current.push(processingTime);

    // Mantener solo las últimas 10 mediciones
    if (processingTimesRef.current.length > 10) {
      processingTimesRef.current.shift();
    }

    // Calcular promedio
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

  // Función para procesar la cola
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
      // Tomar el frame más antiguo de la cola
      const frameData = processingQueueRef.current.shift();
      setQueueSize(processingQueueRef.current.length);

      if (!frameData) return;

      // Crear FormData para enviar la imagen
      const formData = new FormData();
      formData.append("file", frameData.blob, "frame.jpg");
      formData.append("sequence", frameData.sequence.toString());

      // Enviar al backend para procesamiento
      const response = await fetch(
        "http://localhost:8000/api/v1/webcam/process-frame",
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

      // Actualizar estadísticas
      updateProcessingStats(processingTime);

      // Solo actualizar si es la respuesta más reciente
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

      // Procesar siguiente frame si hay en cola
      if (processingQueueRef.current.length > 0) {
        setTimeout(processQueue, 0);
      }
    }
  }, [updateProcessingStats, updateEmotionMetrics]);

  // Función para agregar frame a la cola de procesamiento
  const addFrameToQueue = useCallback(() => {
    if (
      isProcessingFrameRef.current ||
      processingQueueRef.current.length >= MAX_QUEUE_SIZE ||
      !canvasRef.current
    ) {
      return;
    }

    const currentSequence = ++requestSequenceRef.current;

    // Obtener el frame del canvas como Blob
    canvasRef.current.toBlob(
      (blob) => {
        if (!blob) return;

        processingQueueRef.current.push({
          sequence: currentSequence,
          blob: blob,
          timestamp: Date.now(),
        });

        setQueueSize(processingQueueRef.current.length);

        // Si no hay procesamiento activo, iniciarlo
        if (!isProcessingFrameRef.current) {
          processQueue();
        }
      },
      "image/jpeg",
      0.8
    );
  }, [processQueue]);

  // Bucle principal de renderizado
  const renderLoop = useCallback(() => {
    if (
      !streamRef.current ||
      !canvasRef.current ||
      !videoRef.current ||
      !ctxRef.current
    )
      return;

    // Calcular FPS
    const now = performance.now();
    frameCountRef.current++;

    if (now - lastFpsUpdateRef.current >= 1000) {
      const newFps = frameCountRef.current;
      setFps(newFps);
      frameCountRef.current = 0;
      lastFpsUpdateRef.current = now;
    }

    // Limpiar y dibujar frame de video
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

    // Dibujar resultados (usando copia local para evitar condiciones de carrera)
    const currentResults = lastResultsRef.current;
    if (currentResults?.faces && currentResults.faces.length > 0) {
      drawDetectionResults(currentResults);
    }

    animationFrameIdRef.current = requestAnimationFrame(renderLoop);
  }, [drawDetectionResults]);

  // Función para iniciar el procesamiento en tiempo real
  const startProcessing = useCallback(() => {
    if (!processingIntervalRef.current) {
      // Configurar intervalo para procesamiento continuo
      processingIntervalRef.current = setInterval(() => {
        if (
          !isProcessingFrameRef.current &&
          processingQueueRef.current.length < MAX_QUEUE_SIZE
        ) {
          addFrameToQueue();
        }
      }, 1000 / TARGET_PROCESSING_FPS);

      // Procesar la cola inicial
      processQueue();
    }
  }, [addFrameToQueue, processQueue]);

  // Función para detener el procesamiento
  const stopProcessing = useCallback(() => {
    if (processingIntervalRef.current) {
      clearInterval(processingIntervalRef.current);
      processingIntervalRef.current = null;
      processingQueueRef.current = [];
      setQueueSize(0);
    }
  }, []);

  // Función para detener la cámara
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      stopProcessing();

      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;

      if (videoRef.current) {
        videoRef.current.srcObject = null;
        videoRef.current.style.display = "none";
      }

      // Detener el bucle de renderizado
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }

      // Limpiar canvas
      if (ctxRef.current && canvasRef.current) {
        ctxRef.current.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      }

      // Limpiar estado
      processingQueueRef.current = [];
      lastResultsRef.current = null;
      setQueueSize(0);

      setIsCameraActive(false);
      setIsProcessingActive(false);
    }
  }, [stopProcessing]);

  // Alternar procesamiento en tiempo real
  const toggleProcessing = useCallback(() => {
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

  // Iniciar la cámara
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

        // Esperar a que el video esté listo
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.style.display = "block";
          }
          // Iniciar el bucle de renderizado
          renderLoop();
        };
      }

      setIsCameraActive(true);
    } catch (err) {
      console.error("Error al acceder a la cámara:", err);
      alert("No se pudo acceder a la cámara. Asegúrate de permitir el acceso.");
    }
  }, [renderLoop]);

  // Efecto para inicializar el contexto del canvas
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctxRef.current = ctx;
        // Configurar tamaño del canvas
        canvasRef.current.width = 640;
        canvasRef.current.height = 480;
      }
    }
  }, []);

  // Efecto para limpiar al desmontar el componente
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="px-40 flex flex-1 bg-[#1b2427] drop-shadow-2xl justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
            Real-time Emotion Analysis
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

        {/* Sección de gráficas de métricas */}
        <div className="mt-8">
          <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Emotion Distribution
          </h2>
          <div className="flex flex-wrap gap-4 px-4 py-6">
            <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-lg border border-[#366348] p-6">
              <p className="text-white text-base font-medium leading-normal">
                Current Emotion
              </p>
              <div className="flex min-h-[180px] w-full gap-2 items-end justify-between px-1">
                {emotionData ? (
                  // Lista fija de todas las emociones posibles en el orden deseado
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
            Key Metrics
          </h2>
          <div className="flex flex-wrap gap-4 p-4">
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#366348]">
              <p className="text-white text-base font-medium leading-normal">
                Dominant Emotion
              </p>
              <p className="text-white tracking-light text-2xl font-bold leading-tight capitalize">
                {dominantEmotion}
              </p>
            </div>
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#366348]">
              <p className="text-white text-base font-medium leading-normal">
                Average Confidence
              </p>
              <p className="text-white tracking-light text-2xl font-bold leading-tight">
                {averageConfidence.toFixed(0)}%
              </p>
            </div>
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#366348]">
              <p className="text-white text-base font-medium leading-normal">
                Total Frames Processed
              </p>
              <p className="text-white tracking-light text-2xl font-bold leading-tight">
                {totalFramesProcessed}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimePage;

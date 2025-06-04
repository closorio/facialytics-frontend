import { useState, useRef } from "react";
import type { ChangeEvent } from "react";

interface EmotionScores {
  joy: number;
  sadness: number;
  anger: number;
  surprise: number;
  fear: number;
  disgust: number;
  neutral: number;
}

interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Detection {
  faceId: string;
  emotions: EmotionScores;
  dominantEmotion: string;
  timestamp: string;
  boundingBox: BoundingBox;
}

interface ApiResponse {
  detections: Detection[];
  frameInfo: Record<string, number>;
}

const ImageCapturePage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ApiResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setResults(null);
      };
      reader.readAsDataURL(file);
    } else {
      setError("Por favor selecciona un archivo de imagen válido (JPEG o PNG)");
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-[#38e07b]");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-[#38e07b]");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-[#38e07b]");
    setError(null);

    const file = e.dataTransfer.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setResults(null);
      };
      reader.readAsDataURL(file);
    } else {
      setError("Por favor arrastra un archivo de imagen válido (JPEG o PNG)");
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);

    try {
      // Extraer solo los datos base64 (sin el prefijo data:image/...)
      const base64Data = selectedImage.split(",")[1];

      // Convertir base64 a Blob
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      // Determinar el tipo MIME de la imagen
      const mimeType = selectedImage.split(";")[0].split(":")[1];
      const blob = new Blob([byteArray], { type: mimeType });

      // Crear FormData como lo espera FastAPI
      const formData = new FormData();
      formData.append("file", blob, "image.jpg");

      // Enviar la solicitud
      const response = await fetch(
        // Consumiendo la API desde producción
        "https://emotion-detection-apileo-184861052679.northamerica-south1.run.app/api/v1/detection/process-image",
        /* descomenta para usar la API desde el docker"
        http://localhost:8000/api/v1/detection/process-image",
        */
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error al procesar la imagen");
      }

      const data: ApiResponse = await response.json();
      setResults(data);
    } catch (err) {
      console.error("Error:", err);
      setError(
        err instanceof Error ? err.message : "Ocurrió un error inesperado"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-40 flex flex-1 bg-[#1b2427] justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <h1 className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
            Análisis de Emociones en Imágenes
          </h1>
        </div>

        <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
          Sube una imagen para analizar las emociones de las personas que aparecen en ella. Nuestra IA avanzada detectará rostros y proporcionará una puntuación emocional para cada persona.
        </p>

        {error && (
          <div className="mx-4 mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        <div className="flex flex-col p-4">
          <div
            className="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-[#366348] px-6 py-14"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex max-w-[480px] flex-col items-center gap-2">
              <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
                {selectedImage
                  ? "Imagen lista para el análisis"
                  : "Arrastre y suelte una imagen aquí"}
              </p>
              <p className="text-white text-sm font-normal leading-normal max-w-[480px] text-center">
                Or
              </p>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <button
              onClick={handleBrowseClick}
              disabled={isLoading}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#264532] text-white text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-50"
            >
              <span className="truncate">Explorar archivos</span>
            </button>
          </div>
        </div>

        <div className="flex px-4 py-3 justify-center">
          <button
            onClick={handleAnalyze}
            disabled={!selectedImage || isLoading}
            className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 ${
              !selectedImage || isLoading ? "bg-gray-500" : "bg-[#38e07b]"
            } text-[#122118] text-sm font-bold leading-normal tracking-[0.015em]`}
          >
            <span className="truncate">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-current"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Analizando...
                </span>
              ) : (
                "Analizar"
              )}
            </span>
          </button>
        </div>

        {selectedImage && (
  <>
    <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
      Resultados
    </h2>
    <div className="flex w-full grow bg-[#122118] @container p-4">
      <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden">
        <img 
          src={selectedImage} 
          alt="Analyzed" 
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  </>
)}

{results?.detections && results.detections.length > 0 && (
  <div className="px-4 py-3 @container">
    <div className="flex overflow-hidden rounded-lg border border-[#366348] bg-[#122118]">
      <table className="flex-1">
        <thead>
          <tr className="bg-[#1b3124]">
            <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">
              Face ID
            </th>
            <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">
              Emoción Dominante
            </th>
            <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">
              Puntuación de Emoción
            </th>
          </tr>
        </thead>
        <tbody>
          {results.detections.map((detection, index) => (
            <tr key={index} className="border-t border-t-[#366348]">
              <td className="h-[72px] px-4 py-2 text-[#96c5a9] text-sm font-normal leading-normal">
                {detection.faceId}
              </td>
              <td className="h-[72px] px-4 py-2 text-[#96c5a9] text-sm font-normal leading-normal capitalize">
                {detection.dominantEmotion}
              </td>
              <td className="h-[72px] px-4 py-2 text-[#96c5a9] text-sm font-normal leading-normal">
                {(detection.emotions[detection.dominantEmotion as keyof EmotionScores] * 100).toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default ImageCapturePage;

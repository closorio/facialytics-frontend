// src/pages/RealTime.tsx
import { useState } from "react";
import CameraComponent from "../components/CameraComponent";
import ResultsDisplay from "../components/ResultsDisplay";
import useEmotionDetection from "../hooks/useEmotionDetection";

const RealTimePage = () => {
  const { results, detect, isProcessing, error } = useEmotionDetection();
  const [lastCaptureTime, setLastCaptureTime] = useState<string | null>(null);

  const handleCapture = async (imageData: string) => {
    await detect(imageData);
    setLastCaptureTime(new Date().toLocaleTimeString());
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text">
          Detección en Tiempo Real
        </h2>
        <div className="ml-4 flex items-center">
          <div
            className={`w-3 h-3 rounded-full mr-2 ${
              isProcessing ? "bg-yellow-500 animate-pulse" : "bg-green-500"
            }`}
          ></div>
          <span className="text-sm text-gray-400">
            {isProcessing ? "Procesando" : "Listo"}
          </span>
        </div>
      </div>

      <div className="flex flex-row gap-14">
        <div className="card w-1/2 px-6 m-2">
            <h3 className="text-xl font-semibold mb-4 text-light">Cámara</h3>
            <CameraComponent
              onCapture={handleCapture}
              isProcessing={isProcessing}
            />
            <div className="mt-4 flex justify-between items-center">
              {lastCaptureTime && (
                <p className="text-sm text-gray-400">
                  Última captura:{" "}
                  <span className="text-light">{lastCaptureTime}</span>
                </p>
              )}
              {error && (
                <p className="text-sm text-red-400 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {error}
                </p>
              )}
            </div>
        </div>

        <div className="card w-1/2 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-light">Resultados</h3>
            <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded-full">
              {results.length}{" "}
              {results.length === 1 ? "rostro detectado" : "rostros detectados"}
            </span>
          </div>
          <ResultsDisplay results={results} />
        </div>
      </div>
    </div>
  );
};

export default RealTimePage;

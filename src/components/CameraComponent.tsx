// src/components/CameraComponent.tsx
import { useEffect, useRef, useCallback } from 'react';
import useCamera from '../hooks/useCamera';

interface CameraComponentProps {
  onCapture: (imageData: string) => void;
  isProcessing: boolean;
}

const CameraComponent = ({ onCapture, isProcessing }: CameraComponentProps) => {
  const { videoRef, startCamera, stopCamera, captureImage, isCameraOn, error } = useCamera();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mover handleCapture dentro de useCallback para estabilidad de referencias
  const handleCapture = useCallback(async () => {
    try {
      const imageData = await captureImage();
      onCapture(imageData);
    } catch (err) {
      console.error(err);
    }
  }, [captureImage, onCapture]);

  // Mover startAutoCapture dentro de useCallback
  const startAutoCapture = useCallback((interval: number = 2000) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(handleCapture, interval);
  }, [handleCapture]);

  // Mover stopAutoCapture dentro de useCallback
  const stopAutoCapture = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopAutoCapture();
      stopCamera();
    };
  }, [stopAutoCapture, stopCamera]); // ← Todas las dependencias incluidas

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-auto rounded-lg border-2 border-primary-500"
        />
        {!isCameraOn && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <button
              onClick={startCamera}
              className="btn-primary"
            >
              Activar Cámara
            </button>
          </div>
        )}
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="mt-4 flex space-x-4">
        {isCameraOn && (
          <>
            <button
              onClick={handleCapture}
              disabled={isProcessing}
              className={`btn-primary ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isProcessing ? 'Procesando...' : 'Capturar'}
            </button>
            {intervalRef.current ? (
              <button
                onClick={stopAutoCapture}
                className="btn-secondary bg-red-600 hover:bg-red-700"
              >
                Detener Auto-Captura
              </button>
            ) : (
              <button
                onClick={() => startAutoCapture()}
                className="btn-secondary bg-green-600 hover:bg-green-700"
              >
                Auto-Captura (2s)
              </button>
            )}
            <button
              onClick={stopCamera}
              className="btn-secondary bg-gray-600 hover:bg-gray-700"
            >
              Apagar Cámara
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CameraComponent;
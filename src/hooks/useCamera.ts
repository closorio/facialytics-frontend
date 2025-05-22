// src/hooks/useCamera.ts
import { useState, useRef, useEffect, useCallback } from 'react';

const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      setStream(mediaStream);
      setIsCameraOn(true);
      setError(null);
    } catch (err) {
      setError('No se pudo acceder a la cámara. Asegúrate de haber dado los permisos necesarios.');
      setIsCameraOn(false);
      console.error('Error al acceder a la cámara:', err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCameraOn(false);
    }
  }, [stream]); // Depende solo de stream

  const captureImage = useCallback((): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!videoRef.current || !isCameraOn) {
        reject('La cámara no está activa');
        return;
      }

      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      } else {
        reject('No se pudo capturar la imagen');
      }
    });
  }, [isCameraOn]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return { videoRef, startCamera, stopCamera, captureImage, isCameraOn, error };
};

export default useCamera;
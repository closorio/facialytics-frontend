// src/hooks/useEmotionDetection.ts
import { useState } from 'react';
import { detectEmotions, saveEmotionResult } from '../services/emotionService';
import type { EmotionResult } from '../interfaces/types';

const useEmotionDetection = () => {
  const [results, setResults] = useState<EmotionResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<EmotionResult[]>([]);

  const detect = async (imageData: string) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      const detectionResults = await detectEmotions(imageData);
      setResults(detectionResults);
      
      // Guardar cada resultado en el historial
      for (const result of detectionResults) {
        await saveEmotionResult(result);
        setHistory(prev => [...prev, result]);
      }
    } catch (err) {
      setError('Error al detectar emociones. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return { results, detect, isProcessing, error, history };
};

export default useEmotionDetection;
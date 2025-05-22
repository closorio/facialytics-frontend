// src/interfaces/types.ts

interface BaseEmotion {
  emotions: {
    joy: number;
    sadness: number;
    anger: number;
    surprise: number;
    fear: number;
    disgust: number;
    neutral: number;
  };
  dominantEmotion: string;
  timestamp: string;
}

export interface EmotionResult extends BaseEmotion {
  faceId: string;
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface EmotionHistory extends BaseEmotion {
  id: string;
  imageSnapshot?: string;
}

export type EmotionAny = EmotionResult | EmotionHistory;

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
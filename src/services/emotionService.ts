// src/services/emotionService.ts
import apiClient from './api';
import type { EmotionResult, EmotionHistory } from '../interfaces/types';

export const detectEmotions = async (imageData: string): Promise<EmotionResult[]> => {
  const response = await apiClient.post('/detect', { image: imageData });
  return response.data;
};

export const getEmotionHistory = async (): Promise<EmotionHistory[]> => {
  const response = await apiClient.get('/history');
  return response.data;
};

export const saveEmotionResult = async (result: EmotionResult): Promise<void> => {
  await apiClient.post('/save', result);
};

export const getDashboardData = async (): Promise<EmotionHistory[]> => {
  const response = await apiClient.get('/history'); // Los mismos datos que history
  return response.data;
};
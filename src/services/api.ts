// src/services/api.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api', // Usará el proxy configurado en vite.config.ts
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
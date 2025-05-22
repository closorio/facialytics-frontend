// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import EmotionChart from '../components/EmotionChart';
import EmotionStats from '../components/EmotionStats';
import { getEmotionHistory } from '../services/emotionService';
import type { EmotionHistory } from '../interfaces/types';

const DashboardPage = () => {
  const [history, setHistory] = useState<EmotionHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getEmotionHistory(); // Reutiliza el mismo endpoint
        setHistory(data);
      } catch (err) {
        setError('Error al cargar el historial');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Cargando datos...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Dashboard de Emociones</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Distribución de Emociones</h3>
          <EmotionChart data={history} />
        </div>
        
        <div>
          <EmotionStats history={history} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
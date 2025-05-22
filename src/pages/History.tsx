// src/pages/History.tsx
import { useEffect, useState } from 'react';
import HistoryTable from '../components/HistoryTable';
import EmotionStats from '../components/EmotionStats';
import { getEmotionHistory } from '../services/emotionService';
import type { EmotionHistory } from '../interfaces/types';

const HistoryPage = () => {
  const [history, setHistory] = useState<EmotionHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getEmotionHistory();
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
    return <div className="text-center py-8">Cargando historial...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Historial de Detecciones</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Registros</h3>
            <HistoryTable history={history} />
          </div>
        </div>
        
        <div>
          <EmotionStats history={history} />
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
// src/components/EmotionStats.tsx
import type { EmotionAny } from '../interfaces/types';

interface EmotionStatsProps {
  history: EmotionAny[]; // Acepta cualquier tipo de emoción
}

const EmotionStats = ({ history }: EmotionStatsProps) => {
  if (history.length === 0) {
    return <div className="text-center text-gray-500">No hay datos históricos</div>;
  }

  const emotionCounts = history.reduce((acc, curr) => {
    acc[curr.dominantEmotion] = (acc[curr.dominantEmotion] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const total = history.length;
  const mostCommonEmotion = Object.entries(emotionCounts).reduce(
    (max, [emotion, count]) => (count > max.count ? { emotion, count } : max),
    { emotion: '', count: 0 }
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Estadísticas de Emociones</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium text-gray-700">Total de detecciones:</h4>
          <p className="text-2xl font-bold">{total}</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-700">Emoción más común:</h4>
          <p className="text-2xl font-bold capitalize">
            {mostCommonEmotion.emotion} ({((mostCommonEmotion.count / total) * 100).toFixed(1)}%)
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="font-medium text-gray-700 mb-2">Distribución de emociones:</h4>
        <div className="space-y-2">
          {Object.entries(emotionCounts).map(([emotion, count]) => (
            <div key={emotion} className="flex items-center">
              <span className="w-24 capitalize">{emotion}:</span>
              <div className="flex-grow bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-500 h-4 rounded-full"
                  style={{ width: `${(count / total) * 100}%` }}
                ></div>
              </div>
              <span className="ml-2 w-12 text-right">
                {((count / total) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmotionStats;
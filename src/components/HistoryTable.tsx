// src/components/HistoryTable.tsx
import type { EmotionHistory } from '../interfaces/types';

const emotionColors: Record<string, string> = {
  joy: 'bg-yellow-100 text-yellow-800',
  sadness: 'bg-blue-100 text-blue-800',
  anger: 'bg-red-100 text-red-800',
  surprise: 'bg-purple-100 text-purple-800',
  fear: 'bg-indigo-100 text-indigo-800',
  disgust: 'bg-green-100 text-green-800',
  neutral: 'bg-gray-100 text-gray-800',
};

const emotionIcons: Record<string, string> = {
  joy: '😀',
  sadness: '😢',
  anger: '😠',
  surprise: '😲',
  fear: '😨',
  disgust: '🤢',
  neutral: '😐',
};

interface HistoryTableProps {
  history: EmotionHistory[];
}

const HistoryTable = ({ history }: HistoryTableProps) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="inline-block p-4 bg-darker border border-gray-800 rounded-lg">
          <svg className="w-12 h-12 mx-auto text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-400">No hay registros históricos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-800">
      <table className="min-w-full bg-dark divide-y divide-gray-800">
        <thead className="bg-darker">
          <tr>
            <th className="py-3 px-4 text-left text-gray-300 font-medium">Fecha/Hora</th>
            <th className="py-3 px-4 text-left text-gray-300 font-medium">Emoción</th>
            <th className="py-3 px-4 text-left text-gray-300 font-medium">Probabilidades</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {history.map((item, index) => (
            <tr key={index} className="hover:bg-gray-900/50 transition-colors">
              <td className="py-3 px-4 text-gray-400">
                {new Date(item.timestamp).toLocaleString()}
              </td>
              <td className="py-3 px-4">
                <span className={`${emotionColors[item.dominantEmotion]} px-3 py-1 rounded-full text-sm font-medium capitalize inline-flex items-center`}>
                  <span className="mr-1">{emotionIcons[item.dominantEmotion]}</span>
                  {item.dominantEmotion}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex flex-wrap gap-1">
                  {Object.entries(item.emotions)
                    .sort((a, b) => b[1] - a[1])
                    .map(([emotion, value]) => (
                      <span
                        key={emotion}
                        className={`${emotionColors[emotion]} px-2 py-1 rounded text-xs font-mono`}
                      >
                        {emotion}: {(value * 100).toFixed(1)}%
                      </span>
                    ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
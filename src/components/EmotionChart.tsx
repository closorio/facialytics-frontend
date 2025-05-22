// src/components/EmotionChart.tsx
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { EmotionAny} from '../interfaces/types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FF6B6B'];

interface ChartData {
  name: string;
  value: number;
}

interface EmotionChartProps {
  data: EmotionAny[]; // Acepta cualquier tipo de emoción
}

const EmotionChart = ({ data }: EmotionChartProps) => {
  if (data.length === 0) {
    return <div className="text-center text-gray-500">No hay datos para mostrar</div>;
  }

  // Preparar datos para el gráfico de manera type-safe
  const chartData: ChartData[] = [
    { name: 'joy', value: data.reduce((acc, curr) => acc + curr.emotions.joy, 0) / data.length },
    { name: 'sadness', value: data.reduce((acc, curr) => acc + curr.emotions.sadness, 0) / data.length },
    { name: 'anger', value: data.reduce((acc, curr) => acc + curr.emotions.anger, 0) / data.length },
    { name: 'surprise', value: data.reduce((acc, curr) => acc + curr.emotions.surprise, 0) / data.length },
    { name: 'fear', value: data.reduce((acc, curr) => acc + curr.emotions.fear, 0) / data.length },
    { name: 'disgust', value: data.reduce((acc, curr) => acc + curr.emotions.disgust, 0) / data.length },
    { name: 'neutral', value: data.reduce((acc, curr) => acc + curr.emotions.neutral, 0) / data.length },
  ];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [(value as number * 100).toFixed(2) + '%', 'Porcentaje']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmotionChart;
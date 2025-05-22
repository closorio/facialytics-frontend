// src/components/ResultsDisplay.tsx
import type { EmotionResult } from "../interfaces/types";

interface ResultsDisplayProps {
  results: EmotionResult[];
}

const emotionColors: Record<string, string> = {
  joy: "from-yellow-500 to-amber-500",
  sadness: "from-blue-500 to-indigo-500",
  anger: "from-red-500 to-rose-500",
  surprise: "from-purple-500 to-fuchsia-500",
  fear: "from-indigo-500 to-violet-500",
  disgust: "from-green-500 to-emerald-500",
  neutral: "from-gray-500 to-slate-500",
};

const emotionIcons: Record<string, string> = {
  joy: "😀",
  sadness: "😢",
  anger: "😠",
  surprise: "😲",
  fear: "😨",
  disgust: "🤢",
  neutral: "😐",
};

const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  if (results.length === 0) {
    return (
      <div className="bg-darker border border-gray-800 p-6 rounded-lg text-center">
        <p className="text-gray-400 flex flex-col items-center">
          <svg
            className="w-full h-auto max-w-1/2 mb-2 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          No se han detectado rostros o emociones aún.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result, index) => (
        <div
          key={`${result.faceId}-${index}`}
          className="bg-darker border border-gray-800 p-4 rounded-lg">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-shrink-0">
              <div
                className="border-2 border-primary-500 rounded-lg overflow-hidden"
                style={{
                  width: result.boundingBox.width,
                  height: result.boundingBox.height,
                  position: "relative",
                  background: "rgba(0,0,0,0.1)",
                }}
              >
                <div
                  className="absolute inset-0 border-2 border-red-500 opacity-70"
                ></div>
              </div>
              <div className="mt-2 text-center text-sm font-medium text-gray-400">
                Rostro {index + 1}
              </div>
            </div>

            <div className="flex-grow">
            <div className="flex items-center mb-3">
              <h3 className="text-lg font-semibold mr-3">
                Emoción dominante:{" "}
                <span
                  className={`bg-gradient-to-r${
                    emotionColors[result.dominantEmotion]
                    } text-white px-3 py-1 rounded-full text-sm font-medium flex items-center`}>
                  {emotionIcons[result.dominantEmotion]}{" "}
                  {result.dominantEmotion}
                </span>
              </h3>
            </div>

              <div className="space-y-3">
                {Object.entries(result.emotions).map(([emotion, value]) => (
                  <div key={emotion} className="flex items-center">
                    <span className="w-24 flex items-center text-gray-400">
                      <span className="capitalize">
                      {emotionIcons[emotion]} {emotion}
                      </span>
                    </span>
                    <div className="flex-grow bg-gray-800 rounded-full h-2.5 mx-2">
                      <div
                        className={`h-2.5 rounded-full bg-gradient-to-r ${emotionColors[emotion]}`}
                        style={{ width: `${value * 100}%` }}
                      ></div>
                    </div>
                    <span className="w-12 text-right font-mono text-sm">
                      {(value * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultsDisplay;

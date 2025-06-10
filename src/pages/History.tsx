import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface EmotionScores {
  joy: number;
  sadness: number;
  anger: number;
  surprise: number;
  fear: number;
  disgust: number;
  neutral: number;
}

interface HistoryRecord {
  id: string;
  timestamp: string;
  dominant_emotion: string;
  emotion_scores: EmotionScores;
  detection_type: 'image' | 'video';
  image_snapshot: string;
}

interface HistoryResponse {
  records: HistoryRecord[];
  total: number;
  page: number;
  per_page: number;
}

const API_BASE_URL = 'https://emotion-detection-api-915719002582.northamerica-south1.run.app/api/v1';
//const API_BASE_URL = 'http://localhost:8000/api/v1';


const HistoryPage = () => {
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 12,
    total: 0
  });
  const [filters, setFilters] = useState({
    detection_type: '' as '' | 'image' | 'video',
    dominant_emotion: ''
  });
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isEmotionDropdownOpen, setIsEmotionDropdownOpen] = useState(false);

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page: pagination.page,
        per_page: pagination.per_page,
        ...(filters.detection_type && { detection_type: filters.detection_type }),
        ...(filters.dominant_emotion && { dominant_emotion: filters.dominant_emotion })
      };

      const response = await axios.get<HistoryResponse>(`${API_BASE_URL}/history/`, { params });
      
      setHistory(response.data.records);
      setPagination(prev => ({
        ...prev,
        total: response.data.total,
        page: response.data.page,
        per_page: response.data.per_page
      }));
    } catch (err) {
      setError('Error al cargar el historial. Por favor, inténtalo de nuevo.');
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.per_page, filters.detection_type, filters.dominant_emotion]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(pagination.total / pagination.per_page)) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  const handleFilterChange = (filterType: 'detection_type' | 'dominant_emotion', value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const getEmotionDisplayName = (emotion: string): string => {
    const emotionMap: Record<string, string> = {
      joy: 'Happy',
      sadness: 'Sad',
      anger: 'Angry',
      surprise: 'Surprised',
      fear: 'Fearful',
      disgust: 'Disgusted',
      neutral: 'Neutral'
    };
    return emotionMap[emotion] || emotion;
  };

  const toggleDropdown = (type: 'type' | 'emotion') => {
    if (type === 'type') {
      setIsTypeDropdownOpen(prev => !prev);
      setIsEmotionDropdownOpen(false);
    } else {
      setIsEmotionDropdownOpen(prev => !prev);
      setIsTypeDropdownOpen(false);
    }
  };

  const closeAllDropdowns = () => {
    setIsTypeDropdownOpen(false);
    setIsEmotionDropdownOpen(false);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(pagination.total / pagination.per_page);
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, pagination.page - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`text-sm leading-normal flex size-10 items-center justify-center rounded-full ${
            i === pagination.page
              ? 'text-white font-bold bg-[#264532]'
              : 'text-white font-normal hover:bg-[#264532]/50'
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex items-center justify-center p-4">
        <button
          className="flex size-10 items-center justify-center disabled:opacity-50"
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={pagination.page === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18px"
            height="18px"
            fill="currentColor"
            viewBox="0 0 256 256"
            className="text-white"
          >
            <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
          </svg>
        </button>
        
        {pages}
        
        <button
          className="flex size-10 items-center justify-center disabled:opacity-50"
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={pagination.page >= totalPages}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18px"
            height="18px"
            fill="currentColor"
            viewBox="0 0 256 256"
            className="text-white"
          >
            <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
          </svg>
        </button>
      </div>
    );
  };

  if (loading && history.length === 0) {
    return (
      <div className="px-40 flex flex-1 bg-[#1b2427] justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1 items-center justify-center">
          <p className="text-white">Cargando historial...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-40 flex flex-1 bg-[#1b2427] justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1 items-center justify-center">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={fetchHistory}
            className="mt-4 px-4 py-2 bg-[#264532] text-white rounded-lg"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="px-40 flex flex-1 bg-[#1b2427] justify-center py-5"
      onClick={closeAllDropdowns}
    >
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-white tracking-light text-[32px] font-bold leading-tight">
              Historial
            </p>
            <p className="text-[#96c5a9] text-sm font-normal leading-normal">
              Revisar capturas de análisis de emociones pasadas
            </p>
          </div>
        </div>
        
        <div className="flex gap-3 p-3 flex-wrap pr-4" onClick={e => e.stopPropagation()}>
          <div className="relative">
            <button 
              className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#264532] pl-4 pr-2"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('type');
              }}
            >
              <p className="text-white text-sm font-medium leading-normal">
                {filters.detection_type
                  ? filters.detection_type === "image"
                    ? "Imagen"
                    : "Video"
                  : "Tipo"}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="currentColor"
                viewBox="0 0 256 256"
                className={`text-white transition-transform ${isTypeDropdownOpen ? 'rotate-180' : ''}`}
              >
                <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
              </svg>
            </button>
            
            {isTypeDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-[#264532] rounded-lg shadow-lg">
                <button
                  className="block w-full text-left px-4 py-2 text-white text-sm hover:bg-[#96c5a9]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFilterChange("detection_type", "");
                    closeAllDropdowns();
                  }}
                >
                  Todos
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-white text-sm hover:bg-[#96c5a9]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFilterChange("detection_type", "image");
                    closeAllDropdowns();
                  }}
                >
                  Imagen
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-white text-sm hover:bg-[#96c5a9]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFilterChange("detection_type", "video");
                    closeAllDropdowns();
                  }}
                >
                  Video
                </button>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button 
              className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#264532] pl-4 pr-2"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('emotion');
              }}
            >
              <p className="text-white text-sm font-medium leading-normal">
                {filters.dominant_emotion 
                  ? getEmotionDisplayName(filters.dominant_emotion)
                  : "Emoción Dominante"}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="currentColor"
                viewBox="0 0 256 256"
                className={`text-white transition-transform ${isEmotionDropdownOpen ? 'rotate-180' : ''}`}
              >
                <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
              </svg>
            </button>
            
            {isEmotionDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full min-w-[110px] bg-[#264532] rounded-lg shadow-lg">
                <button
                  className="block w-full text-left px-4 py-2 text-white text-sm hover:bg-[#96c5a9]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFilterChange("dominant_emotion", "");
                    closeAllDropdowns();
                  }}
                >
                  Todas
                </button>
                {['joy', 'sadness', 'anger', 'surprise', 'fear', 'disgust', 'neutral'].map(emotion => (
                  <button
                    key={emotion}
                    className="block w-full text-left px-4 py-2 text-white text-sm hover:bg-[#96c5a9]"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFilterChange("dominant_emotion", emotion);
                      closeAllDropdowns();
                    }}
                  >
                    {getEmotionDisplayName(emotion)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8">
            <p className="text-white text-lg">No se encontraron registros</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              {history.map((record, index) => (
                <div key={record.id} className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-68 md:w-40 aspect-square bg-center bg-no-repeat bg-cover rounded-lg"
                    style={{
                      backgroundImage: `url("${record.image_snapshot}")`,
                    }}
                  ></div>
                  <div>
                    <p className="text-white text-base font-medium leading-normal">
                      Captura {index + 1 + (pagination.page - 1) * pagination.per_page}
                    </p>
                    <p className="text-[#96c5a9] text-sm font-normal leading-normal">
                      {record.detection_type === 'image' ? 'Imagen' : 'Video'} - {getEmotionDisplayName(record.dominant_emotion)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {renderPagination()}
          </>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
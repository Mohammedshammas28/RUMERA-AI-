import axios from 'axios';
import { 
  mockTextAnalysis, 
  mockImageAnalysis, 
  mockVideoAnalysis, 
  mockAudioAnalysis 
} from '@/lib/mock-data';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Silently reject - errors are handled with mock data in each function
    return Promise.reject(error);
  }
);

export const analyzeText = async (text) => {
  try {
    const response = await api.post('/analyze/text', { text });
    return response.data;
  } catch (error) {
    console.warn('Text analysis failed, using mock data:', error.message);
    // Return mock data if backend is unavailable
    return mockTextAnalysis;
  }
};

export const analyzeImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response = await api.post('/analyze/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.warn('Image analysis failed, using mock data:', error.message);
    // Return mock data if backend is unavailable
    return mockImageAnalysis;
  }
};

export const analyzeVideo = async (videoFile) => {
  try {
    const formData = new FormData();
    formData.append('video', videoFile);
    
    const response = await api.post('/analyze/video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.warn('Video analysis failed, using mock data:', error.message);
    // Return mock data if backend is unavailable
    return mockVideoAnalysis;
  }
};

export const analyzeAudio = async (audioFile) => {
  try {
    const formData = new FormData();
    formData.append('audio', audioFile);
    
    const response = await api.post('/analyze/audio', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.warn('Audio analysis failed, using mock data:', error.message);
    // Return mock data if backend is unavailable
    return mockAudioAnalysis;
  }
};

export default api;

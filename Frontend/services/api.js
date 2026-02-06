import axios from 'axios';
import { 
  mockTextAnalysis, 
  mockImageAnalysis, 
  mockVideoAnalysis, 
  mockAudioAnalysis 
} from '@/lib/mock-data';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use((config) => {
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const analyzeText = async (text) => {
  try {
    const response = await api.post('/analyze/text', { text });
    return response.data.data; // Return the data object
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
    return response.data.data; // Return the data object
  } catch (error) {
    console.warn('Image analysis failed, using mock data:', error.message);
    // Return mock data if backend is unavailable
    return mockImageAnalysis;
  }
};

export const analyzeVideo = async (videoInfo) => {
  try {
    // For video, send metadata instead of file
    const response = await api.post('/analyze/video', videoInfo);
    return response.data.data; // Return the data object
  } catch (error) {
    console.warn('Video analysis failed, using mock data:', error.message);
    // Return mock data if backend is unavailable
    return mockVideoAnalysis;
  }
};

export const analyzeAudio = async (transcription, filename) => {
  try {
    // For audio, send transcription text
    const response = await api.post('/analyze/audio', { 
      transcription, 
      filename 
    });
    return response.data.data; // Return the data object
  } catch (error) {
    console.warn('Audio analysis failed, using mock data:', error.message);
    // Return mock data if backend is unavailable
    return mockAudioAnalysis;
  }
};

export default api;

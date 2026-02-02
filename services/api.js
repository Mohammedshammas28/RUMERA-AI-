import axios from 'axios';

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
    console.error('[API Error]', error.message);
    return Promise.reject(error);
  }
);

export const analyzeText = async (text) => {
  try {
    const response = await api.post('/analyze/text', { text });
    return response.data;
  } catch (error) {
    throw new Error(`Text analysis failed: ${error.message}`);
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
    throw new Error(`Image analysis failed: ${error.message}`);
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
    throw new Error(`Video analysis failed: ${error.message}`);
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
    throw new Error(`Audio analysis failed: ${error.message}`);
  }
};

export default api;

import axios from 'axios';

const AUTH_API_BASE_URL = process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://localhost:5001';

const authApi = axios.create({
  baseURL: AUTH_API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Signup
export const signup = async (name, email, password) => {
  try {
    const response = await authApi.post('/api/auth/signup', {
      name,
      email,
      password,
    });
    
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

// Login
export const login = async (email, password) => {
  try {
    const response = await authApi.post('/api/auth/login', {
      email,
      password,
    });
    
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const response = await authApi.get('/api/auth/me');
    return response.data;
  } catch (error) {
    // Clear token if user is not authenticated
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    throw error.response?.data || { success: false, message: error.message };
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

// Get user from localStorage
export const getUserFromStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

export default authApi;

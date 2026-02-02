'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCurrentUser, logout as logoutService, isAuthenticated } from '@/services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/signup'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Check authentication on mount and when pathname changes
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = isAuthenticated();
      
      if (authenticated) {
        try {
          // Try to get user data from API
          const response = await getCurrentUser();
          if (response.user) {
            setUser(response.user);
            setIsLoggedIn(true);
          } else {
            setUser(null);
            setIsLoggedIn(false);
          }
        } catch (error) {
          // If token is invalid, clear auth
          setUser(null);
          setIsLoggedIn(false);
        }
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [pathname]);

  // Redirect logic - use replace for instant redirect
  useEffect(() => {
    if (!isLoading) {
      // If not authenticated and trying to access protected route
      if (!isLoggedIn && !isPublicRoute) {
        router.replace('/signup');
      }
      // If authenticated and trying to access auth routes
      else if (isLoggedIn && isPublicRoute) {
        router.replace('/');
      }
    }
  }, [isLoading, isLoggedIn, isPublicRoute, pathname, router]);

  const logout = () => {
    logoutService();
    setUser(null);
    setIsLoggedIn(false);
    // Instant redirect
    router.replace('/signup');
  };

  const login = (userData, token) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoggedIn, 
        isLoading, 
        logout, 
        login 
      }}
    >
      {isLoading && !isPublicRoute ? null : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

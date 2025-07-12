import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useAuth() {
  const [user, setUser] = useLocalStorage('user', null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user exists and has valid token
    if (user && user.token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData) => {
    setUser({ ...user, ...userData });
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser
  };
} 
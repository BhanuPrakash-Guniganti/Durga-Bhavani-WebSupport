import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AdminUser } from '../types';
import { api, getStoredUser, getStoredToken, clearStoredAuth } from '../services/api';

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  canPublish: () => boolean;
  canDelete: () => boolean;
  canUpload: () => boolean;
  canManageUsers: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(() => getStoredUser());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Validate stored session with backend on initial mount
  useEffect(() => {
    const initAuth = async () => {
      const token = getStoredToken();
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const currentUser = await api.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.warn('[Auth] Stored session invalid or expired:', err);
        clearStoredAuth();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password = 'DurgaBhavani@2025') => {
    setIsLoading(true);
    try {
      const res = await api.login(email, password);
      setUser(res.user);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await api.logout();
    } finally {
      setUser(null);
      setIsLoading(false);
    }
  };

  const canPublish = () => user?.role === 'super-admin' || user?.role === 'editor';
  const canDelete = () => user?.role === 'super-admin';
  const canUpload = () => !!user; // all authorized roles can upload photos
  const canManageUsers = () => user?.role === 'super-admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        canPublish,
        canDelete,
        canUpload,
        canManageUsers
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AdminUser } from '../types';

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, role?: AdminUser['role'], name?: string) => void;
  logout: () => void;
  canPublish: () => boolean;
  canDelete: () => boolean;
  canUpload: () => boolean;
  canManageUsers: () => boolean;
}

const AUTH_STORAGE_KEY = 'durga_bhavani_admin_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore corrupted data
        }
      }
    }
    // Default logged in admin for preview / testing
    return {
      id: 'usr-admin-01',
      name: 'Temple Committee Admin',
      email: 'admin@dodlapahad.org',
      role: 'super-admin',
      active: true
    };
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = (email: string, role: AdminUser['role'] = 'super-admin', name?: string) => {
    const newUser: AdminUser = {
      id: `usr-${Date.now()}`,
      name: name || (email.split('@')[0] || 'Administrator'),
      email,
      role,
      active: true
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const canPublish = () => user?.role === 'super-admin' || user?.role === 'editor';
  const canDelete = () => user?.role === 'super-admin';
  const canUpload = () => !!user; // all roles can upload photos
  const canManageUsers = () => user?.role === 'super-admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
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

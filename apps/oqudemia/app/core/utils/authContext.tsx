import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'admin' | 'user' | 'guest';

interface AuthContextType {
  isAuthenticated: boolean;
  roles: UserRole[];
  setRoles: (roles: UserRole[]) => void;
  clearRoles: () => void;
  logout: () => void;
  extendSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Centralized session management
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expires_at');
    setRoles([]);
    setIsAuthenticated(false);
    window.sessionStorage.removeItem('token_expiry_alerted');
    window.location.href = '/';
  };

  const extendSession = () => {
    const newExpiresAt = Date.now() + 30 * 60 * 1000; // extend by 30 minutes
    localStorage.setItem('token_expires_at', newExpiresAt.toString());
    window.sessionStorage.removeItem('token_expiry_alerted');
  };
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setRoles([]);
      }
    };
    checkToken();
    window.addEventListener('storage', checkToken);
    return () => window.removeEventListener('storage', checkToken);
  }, []);

  // fetchRolesFromBackend removed for now

  const clearRoles = () => {
    setRoles([]);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, roles, setRoles, clearRoles, logout, extendSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'admin' | 'user' | 'guest';

interface AuthContextType {
  isAuthenticated: boolean;
  roles: UserRole[];
  setRoles: (roles: UserRole[]) => void;
  clearRoles: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken'); // or use cookies
    if (token) {
      // You could decode token and extract roles here instead
      fetchRolesFromBackend(token);
    }
  }, []);

  const fetchRolesFromBackend = async (token: string) => {
    try {
      const res = await fetch('/api/user/roles', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setRoles(data.roles);
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Failed to fetch roles', err);
      setIsAuthenticated(false);
    }
  };

  const clearRoles = () => {
    setRoles([]);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, roles, setRoles, clearRoles }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

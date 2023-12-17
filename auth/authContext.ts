import { createContext, useContext, useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const AuthContext = createContext({ isAuthenticated: false, login: () => {}, logout: () => {} });

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async () => {
    await useLogin();
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Handle logout logic (clearing token, etc.)
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

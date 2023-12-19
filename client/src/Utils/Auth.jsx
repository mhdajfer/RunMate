import { createContext, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function login() {
    setIsAuthenticated(true);
  }

  function logout() {
    setIsAuthenticated(false);
  }

  function getIsAuthenticated() {
    return isAuthenticated;
  }

  return (
    <AuthContext.Provider value={{ login, logout, getIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

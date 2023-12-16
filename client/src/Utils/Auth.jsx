import { useState, createContext, useContext } from "react";

const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  function login(token) {
    setToken(token);
  }

  function logout() {
    setToken(null);
  }

  function display() {
    console.log(token);
  }
  return (
    <AuthContext.Provider value={{ token, display, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => {
  return useContext(AuthContext);
};

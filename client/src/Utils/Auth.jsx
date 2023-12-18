import { useState, createContext } from "react";

export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  function login(token) {
    console.log("token", token);
    setToken("Aju" + token);
  }

  function logout() {
    console.log(token);
    setToken(null);
  }

  function display() {
    console.log("diplay token", token);
  }
  return (
    <AuthContext.Provider value={{ token, display, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => {
  // eslint-disable-next-line no-undef
  return useContext(AuthContext);
};

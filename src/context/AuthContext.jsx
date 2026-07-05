import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  setAuthCredentials,
  clearAuthCredentials,
} from "../api/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [guest, setGuest] = useState(false);

  const login = (username, password) => {
    setAuthCredentials(username, password);

    setUser({
      username,
    });

    setGuest(false);
  };

  const continueAsGuest = () => {
    clearAuthCredentials();
    setUser(null);
    setGuest(true);
  };

  const logout = () => {
    clearAuthCredentials();
    setUser(null);
    setGuest(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        guest,
        login,
        continueAsGuest,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
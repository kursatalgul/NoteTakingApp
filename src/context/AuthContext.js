import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

// Create a context
const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = useState();
  const setAuth = (res) => {
    setAuthState(res);
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

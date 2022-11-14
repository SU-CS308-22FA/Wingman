import React, { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [isAuthenticated, setAuth] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

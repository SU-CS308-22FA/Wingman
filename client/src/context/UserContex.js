import React, { useState, createContext } from "react";

export const UsersContext = createContext();

export const UsersContextProvider = (props) => {
  const [user, setUser] = useState();

  return (
    <UsersContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

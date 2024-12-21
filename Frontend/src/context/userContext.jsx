import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUserData] = useState({});

  return (
    <UserContext.Provider value={{ theme, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

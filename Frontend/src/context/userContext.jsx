import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [token, settoken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );

  return (
    <UserContext.Provider value={{ userData, setUserData, token, settoken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

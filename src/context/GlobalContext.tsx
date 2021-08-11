import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Value } from "../dataTypes/global/interfaces";

const globalContext = React.createContext<Value | null>(null);

const GlobalContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [converterChecked, setConverterChecked] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setIsVerified(false);
    setIsLogged(false);
  };

  return (
    <globalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        converterChecked,
        setConverterChecked,
        isLoading,
        setIsLoading,
        logout,
        isVerified,
        setIsVerified,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(globalContext);
};

export default GlobalContextProvider;

import axios from "axios";
import React, { useContext, useState } from "react";
import { useGlobalContext } from "./GlobalContext";

interface Value {
  info: Info;
  langData: any;
  fetchLangData: (lang: string) => Promise<void>;
  fetchLangInfo: (lang: string) => Promise<void>;
}

interface Info {
  name: string;
  type: string;
  character_length: number;
}

const libraryContext = React.createContext<Value | null>(null);

const LibraryContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const { isLogged } = useGlobalContext()!;
  const BACKEND = process.env.REACT_APP_BACKEND;
  const [info, setInfo] = useState<Info>({
    name: "ASCII",
    type: "1 and 0",
    character_length: 7,
  });
  const [langData, setLangData] = useState<any>([{}]);

  const fetchLangInfo = async (lang: string) => {
    try {
      if (isLogged && lang !== "ascii") {
        const { data } = await axios.get(`${BACKEND}/languages/${lang}/info`);
        setInfo(data);
      } else {
        setInfo({
          name: "ASCII",
          type: "1 and 0",
          character_length: 7,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLangData = async (lang: string) => {
    try {
      if (isLogged && lang !== "ascii") {
        const { data } = await axios.get(`${BACKEND}/languages/${lang}/data`);
        setLangData(data);
      } else {
        const { data } = await axios.get(`${BACKEND}/languages/ascii/data`);
        setLangData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <libraryContext.Provider
      value={{ info, langData, fetchLangData, fetchLangInfo }}
    >
      {children}
    </libraryContext.Provider>
  );
};

export const useLibraryContext = () => {
  return useContext(libraryContext);
};

export default LibraryContextProvider;

import axios from "axios";
import React, { useContext, useState } from "react";
import { useCallback } from "react";
import { Value, Language } from "../dataTypes/profile/interfaces";
import { useGlobalContext } from "./GlobalContext";

const profileContext = React.createContext<Value | null>(null);

const ProfileContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const { setIsLoading } = useGlobalContext()!;
  const [languageData, setLanguageData] = useState<{
    own_languages: Language[];
    added_languages: Language[];
  }>({
    own_languages: [],
    added_languages: [],
  });
  const [addLanguageText, setAddLanguageText] = useState("");
  const [addLanguageFormatError, setAddLanguageFormatError] = useState(false);
  const [addLanguageFindError, setAddLanguageFindError] = useState(false);
  const [alreadyAddedError, setAlreadyAddedError] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const BACKEND = process.env.REACT_APP_BACKEND;
  const fetchOwnLanguageData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND}/languages?username=${
          JSON.parse(localStorage.getItem("user")!)[0].username
        }`
      );
      setLanguageData((current) => {
        return {
          ...current,
          own_languages: data,
        };
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const fetchAddedLanguageData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND}/languages/added?username=${
          JSON.parse(localStorage.getItem("user")!)[0].username
        }`
      );
      console.log(data);
      setLanguageData((current) => {
        return { ...current, added_languages: [...data] };
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const deleteLanguage = useCallback(async (lang: string) => {
    try {
      await axios.delete(
        `${BACKEND}/languages?language=${lang}&username=${
          JSON.parse(localStorage.getItem("user")!)[0].username
        }`
      );
    } catch (error) {
      console.log(error);
    } finally {
      fetchPatterns();
    }
  }, []);
  const removeAddedLanguage = useCallback(async (language: string) => {
    try {
      await axios.delete(
        `${BACKEND}/languages/added?username=${
          JSON.parse(localStorage.getItem("user")!)[0].username
        }&language=${language}`
      );
    } catch (error) {
      console.log(error);
    } finally {
      fetchPatterns();
    }
  }, []);
  const checkIsAdded = () => {
    for (let i = 0; i < languageData.added_languages.length; i++) {
      if (languageData.added_languages[i].secret_key === addLanguageText) {
        setAlreadyAddedError(true);
        return;
      }
    }
    for (let i = 0; i < languageData.own_languages.length; i++) {
      if (languageData.own_languages[i].secret_key === addLanguageText) {
        setAlreadyAddedError(true);
        return;
      }
    }
    setAlreadyAddedError(false);
  };
  const addLanguage = useCallback(async (secret_key: string) => {
    const BACKEND = process.env.REACT_APP_BACKEND;
    try {
      await axios.post(
        `${BACKEND}/languages/added?username=${
          JSON.parse(localStorage.getItem("user")!)[0].username
        }&key=${secret_key}`
      );
    } catch (error) {
      console.log(error);
    } finally {
      fetchPatterns();
    }
  }, []);

  const checkFormat = () => {
    if (addLanguageText.length !== 36) {
      setAddLanguageFormatError(true);
      return;
    } else {
      setAddLanguageFormatError(false);
    }
    const arr = addLanguageText.split("-");

    if (arr.length === 5) {
      setAddLanguageFormatError(false);
    } else {
      setAddLanguageFormatError(true);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      if (i === 0) {
        if (arr[i].length === 8) {
          setAddLanguageFormatError(false);
        } else {
          setAddLanguageFormatError(true);
          return;
        }
      } else if (i === 4) {
        if (arr[i].length === 12) {
          setAddLanguageFormatError(false);
        } else {
          setAddLanguageFormatError(true);
          return;
        }
      } else {
        if (arr[i].length === 4) setAddLanguageFormatError(false);
        else {
          setAddLanguageFormatError(true);
          return;
        }
      }
    }
  };

  const checkForPattern = async () => {
    const { data } = await axios.post(
      `${BACKEND}/languages/verify/key?key=${addLanguageText}`,
      {
        key: addLanguageText,
      }
    );
    setAddLanguageFindError(data.error);
  };

  const checkEverything = () => {
    setIsVerified(false);
    checkFormat();
    checkIsAdded();
    checkForPattern();
    setIsVerified(true);
  };

  const fetchPatterns = () => {
    setIsLoading(true);
    fetchAddedLanguageData();
    fetchOwnLanguageData();
    setIsLoading(false);
  };
  return (
    <profileContext.Provider
      value={{
        ...languageData,
        addLanguage,
        fetchPatterns,
        removeAddedLanguage,
        deleteLanguage,
        addLanguageText,
        setAddLanguageText,
        addLanguageFormatError,
        setAddLanguageFormatError,
        addLanguageFindError,
        setAddLanguageFindError,
        alreadyAddedError,
        checkEverything,
        isVerified,
      }}
    >
      {children}
    </profileContext.Provider>
  );
};

export const useProfileContext = () => useContext(profileContext);

export default ProfileContextProvider;

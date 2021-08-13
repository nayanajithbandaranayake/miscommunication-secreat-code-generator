import React, { useReducer, useContext } from "react";
import { InitialState, Value } from "../dataTypes/converter/interface";
import { converterReducer } from "../reducers/converterReducer";
import {
  UPDATE_CONVERTER_INPUT,
  UPDATE_CONVERTER_OUTPUT,
  CHECK_VALIDITY_ENGLISH_CONVERTER,
  CHECK_VALIDITY_SYMBOLS_CONVERTER,
  UPDATE_LANG_CONVERTER,
  SET_LANGUAGES_CONVERTER,
  CHANGE_CODE_TYPE,
  CHECK_VALIDITY_SPACE_CONVERTER,
  RESET_ALL_ERRORS,
  CHECK_VALIDITY_DIVISION_CONVERTER,
  CHECK_VALIDITY_TYPE_CONVERTER,
  SET_DECODE_ERROR,
} from "../actions/types";
import axios from "axios";
import { useGlobalContext } from "./GlobalContext";

const converterContext = React.createContext<Value | null>(null);

const initialState: InitialState = {
  info: {
    languages: ["ascii"],
    lang: "ascii",
  },
  input: "",
  output: "",
  english_error: false,
  symbol_error: false,
  space_error: false,
  space_checked: false,
  english_checked: false,
  symbols_checked: false,
  divide_checked: false,
  divide_error: false,
  type_error: false,
  type_checked: false,
  decode_error: false,
  code_type: "encode",
};

const ConverterContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [state, dispatch] = useReducer(converterReducer, initialState);
  const { isLogged, setIsLoading } = useGlobalContext()!;
  const setInput = (phrase: string) => {
    dispatch({ type: UPDATE_CONVERTER_INPUT, payload: phrase });
  };
  const setOutput = (phrase: string) => {
    dispatch({ type: UPDATE_CONVERTER_OUTPUT, payload: phrase });
  };

  const setLang = (lang: string) => {
    dispatch({ type: UPDATE_LANG_CONVERTER, payload: lang });
  };

  const changeCodeType = (type: string) => {
    dispatch({ type: CHANGE_CODE_TYPE, payload: type });
  };

  const symbolErrorCheck = (phrase: string) => {
    dispatch({ type: CHECK_VALIDITY_SYMBOLS_CONVERTER, payload: phrase });
  };
  const englishErrorCheck = (phrase: string) => {
    dispatch({ type: CHECK_VALIDITY_ENGLISH_CONVERTER, payload: phrase });
  };
  const spaceErrorCheck = (phrase: string) => {
    dispatch({ type: CHECK_VALIDITY_SPACE_CONVERTER, payload: phrase });
  };
  const setDecodeError = (err: boolean) => {
    dispatch({ type: SET_DECODE_ERROR, payload: err });
  };
  const typeErrorCheck = (phrase: string, language: string) => {
    if (isLogged && language !== "ascii") {
      axios.get(`${BACKEND}/languages/${language}/info`).then((res) => {
        dispatch({
          type: CHECK_VALIDITY_TYPE_CONVERTER,
          payload: {
            phrase,
            type: res.data.type,
          },
        });
      });
    } else {
      dispatch({
        type: CHECK_VALIDITY_TYPE_CONVERTER,
        payload: { phrase, type: "1 and 0" },
      });
    }
  };

  const resetAllErrors = () => {
    dispatch({ type: RESET_ALL_ERRORS });
  };

  const BACKEND = process.env.REACT_APP_BACKEND;

  const encode = async (phrase: string, language: string) => {
    setIsLoading(true);
    const { data } = await axios.get(
      `${BACKEND}/convert/encode/${language}?phrase=${phrase}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "https://miscommunication.netlify.app",
        },
      }
    );

    setOutput(data.phrase);
    setIsLoading(false);
  };

  const decode = async (phrase: string, language: string) => {
    setIsLoading(true);
    if (!state.divide_error && !state.type_error) {
      const { data } = await axios.post(
        `${BACKEND}/convert/decode/${language}`,
        {
          phrase,
        }
      );
      if (data.error) {
        setDecodeError(true);
      } else {
        setDecodeError(false);
      }
      setOutput(data.phrase);
    }
    setIsLoading(false);
  };
  const setLanguages = async () => {
    if (isLogged) {
      const { data }: any = await axios.get(
        `${BACKEND}/languages/all?username=${
          JSON.parse(localStorage.getItem("user")!)[0].username
        }`,
        {
          headers: {
            "Access-Control-Allow-Origin":
              "https://miscommunication.netlify.app",
          },
        }
      );
      if (data.length !== 0) {
        let languages = [];
        for (let i = 0; i < data.length; i++) {
          const { name } = data[i];
          languages.push(name);
        }
        dispatch({
          type: SET_LANGUAGES_CONVERTER,
          payload: languages,
        });
      }
    } else {
      dispatch({ type: SET_LANGUAGES_CONVERTER, payload: ["ascii"] });
    }
  };
  const divideErrorCheck = (phrase: string, language: string) => {
    if (isLogged && language !== "ascii") {
      axios
        .get(
          `${BACKEND}/languages/${language}/info?username=${
            JSON.parse(localStorage.getItem("user")!)[0].username
          }`,
          {
            headers: {
              "Access-Control-Allow-Origin":
                "https://miscommunication.netlify.app",
            },
          }
        )
        .then((res) =>
          dispatch({
            type: CHECK_VALIDITY_DIVISION_CONVERTER,
            payload: { phrase, length: res.data.character_length },
          })
        );
    } else {
      dispatch({
        type: CHECK_VALIDITY_DIVISION_CONVERTER,
        payload: {
          phrase,
          length: 7,
        },
      });
    }
  };
  return (
    <converterContext.Provider
      value={{
        ...state,
        setInput,
        setOutput,
        encode,
        decode,
        setLang,
        englishErrorCheck,
        spaceErrorCheck,
        symbolErrorCheck,
        divideErrorCheck,
        typeErrorCheck,
        setLanguages,
        changeCodeType,
        resetAllErrors,
      }}
    >
      {children}
    </converterContext.Provider>
  );
};

export const useConverterContext = () => {
  return useContext(converterContext);
};

export default ConverterContextProvider;

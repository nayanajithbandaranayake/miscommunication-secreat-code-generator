import React from "react";
import { useContext, useReducer } from "react";
import { Value, LoginInitialState } from "../dataTypes/login/interfaces";
import { loginReducer } from "../reducers/loginReducer";
import {
  UPDATE_INPUT_LOGIN,
  ERROR_LOGIN,
  CLICKED_LOGIN,
  CHECK_VALIDITY_EMAIL_LOGIN,
} from "../actions/types";
import axios from "axios";
import { useGlobalContext } from "./GlobalContext";

const loginContext = React.createContext<Value | null>(null);
const initialState: LoginInitialState = {
  login_data: {
    email: "",
    password: "",
  },
  email_error: false,
  empty_error: false,
  post_error: false,
  clicked: false,
  server_error: false,
};

const LoginContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const { setIsLogged, setIsLoading, setIsVerified } = useGlobalContext()!;
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const updateInputs = (name: string, value: string) => {
    dispatch({ type: UPDATE_INPUT_LOGIN, payload: { name, value } });
  };

  const setError = (error: boolean, type: string) => {
    dispatch({ type: ERROR_LOGIN, payload: { error, type } });
  };
  const setClicked = () => {
    dispatch({ type: CLICKED_LOGIN });
  };

  const validateEmail = (email: string) => {
    dispatch({ type: CHECK_VALIDITY_EMAIL_LOGIN, payload: email });
  };
  const BACKEND = process.env.REACT_APP_BACKEND!;

  const verifyData = async (email: string, password: string) => {
    try {
      const { data } = await axios.get(
        `${BACKEND}/users/login/verify?email=${email}&password=${password}`
      );
      if (data.error === true) {
        setError(true, "post");
      } else {
        setError(false, "post");
      }
      setIsVerified(true);
    } catch (error) {
      console.log(error);
    }
  };

  const postLoginData = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      if (!state.post_error) {
        const user = await axios.get(
          `${BACKEND}/users/login?email=${email}&password=${password}`
        );

        localStorage.setItem("user", JSON.stringify(user.data));
        setIsLogged(true);
        setError(false, "error");
      } else {
        console.log("post-error");
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(true, "error");
      setIsLogged(false);
      setIsLoading(false);
    }
  };

  return (
    <loginContext.Provider
      value={{
        ...state,
        updateInputs,
        setError,
        setClicked,
        validateEmail,
        postLoginData,
        verifyData,
      }}
    >
      {children}
    </loginContext.Provider>
  );
};

export const useLoginContext = () => {
  return useContext(loginContext);
};

export default LoginContextProvider;

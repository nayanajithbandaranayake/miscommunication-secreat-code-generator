import React, { useReducer, useContext } from "react";
import { signupReducer } from "../reducers/signupReducer";
import { SignupInitialState, Value } from "../dataTypes/signup/interfaces";
import {
  CHECK_VALIDITY_EMAIL,
  CHECK_VALIDITY_USERNAME,
  CHECK_VALIDITY_PASSWORD,
  CHECK_VALIDITY_CONFIRM,
  ERROR,
  UPDATE_INPUT,
  CLICKED,
} from "../actions/types";
import axios from "axios";
import { useGlobalContext } from "./GlobalContext";

const signupContext = React.createContext<Value | null>(null);

const initialState: SignupInitialState = {
  signup_data: {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  username_error: false,
  email_error: false,
  password_error: false,
  confirm_error: false,
  empty_error: false,
  post_error: false,
  clicked: false,
  server_error: false,
  username_post_error: false,
  email_post_error: false,
};

const SignupContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const { setIsLogged, setIsLoading, setIsVerified } = useGlobalContext()!;

  const [state, dispatch] = useReducer(signupReducer, initialState);

  const validateUsername = (value: string) => {
    dispatch({ type: CHECK_VALIDITY_USERNAME, payload: value });
  };
  const validateEmail = (value: string) => {
    dispatch({ type: CHECK_VALIDITY_EMAIL, payload: value });
  };
  const validatePassword = (value: string) => {
    dispatch({ type: CHECK_VALIDITY_PASSWORD, payload: value });
  };
  const validateConfirm = (value: string) => {
    dispatch({ type: CHECK_VALIDITY_CONFIRM, payload: value });
  };
  const setError = (type: string, error: boolean) => {
    dispatch({ type: ERROR, payload: { type, error } });
  };

  const updateInputs = (name: string, value: string) => {
    dispatch({ type: UPDATE_INPUT, payload: { name, value } });
  };

  const setClicked = () => {
    dispatch({ type: CLICKED });
  };
  const BACKEND = process.env.REACT_APP_BACKEND;

  const verifyData = async (username: string, email: string) => {
    try {
      const { data } = await axios.get(`${BACKEND}/users`);
      const user = data.find((item: any) => item.username === username);
      const userEmail = data.find((item: any) => item.email === email);

      if (user) {
        setError("user-error", true);
      } else {
        setError("user-error", false);
      }
      if (userEmail) {
        setError("email-error", true);
      } else {
        setError("email-error", false);
      }
      setIsVerified(true);
    } catch (error) {
      console.log(error);
    }
  };

  const postData = async (
    username: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    try {
      if (state.email_post_error || state.username_post_error) {
        setIsLogged(false);
        setError("error", true);
      } else {
        await axios.post(`${BACKEND}/users/signup`, {
          username,
          email,
          password,
        });
        localStorage.setItem("user", JSON.stringify([{ username, email }]));
        setIsLogged(true);
        setError("error", false);
      }
      console.log("there");

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError("error", true);
    }
  };

  return (
    <signupContext.Provider
      value={{
        ...state,
        setError,
        validateEmail,
        updateInputs,
        postData,
        validateUsername,
        validateConfirm,
        validatePassword,
        setClicked,
        verifyData,
      }}
    >
      {children}
    </signupContext.Provider>
  );
};

export const useSignupContext = () => {
  const data = useContext(signupContext);
  return data;
};

export default SignupContextProvider;

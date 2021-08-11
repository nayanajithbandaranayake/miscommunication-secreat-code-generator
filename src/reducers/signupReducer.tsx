import React from "react";
import {
  CHECK_VALIDITY_CONFIRM,
  CHECK_VALIDITY_PASSWORD,
  CHECK_VALIDITY_USERNAME,
  CHECK_VALIDITY_EMAIL,
  ERROR,
  UPDATE_INPUT,
  CLICKED,
} from "../actions/types";
import { SignupInitialState, SignupData } from "../dataTypes/signup/interfaces";

type Action =
  | {
      type: "CHECK_VALIDITY_EMAIL";
      payload: string;
    }
  | {
      type: "CHECK_VALIDITY_USERNAME";
      payload: string;
    }
  | {
      type: "CHECK_VALIDITY_PASSWORD";
      payload: string;
    }
  | {
      type: "CHECK_VALIDITY_CONFIRM";
      payload: string;
    }
  | { type: "POST_SIGNUP_DATA"; payload: SignupData }
  | { type: "ERROR"; payload: { type: string; error: boolean } }
  | { type: "UPDATE_INPUT"; payload: { name: string; value: string } }
  | { type: "CLICKED" };

export const signupReducer: React.Reducer<SignupInitialState, Action> = (
  state,
  action
): SignupInitialState => {
  if (action.type === ERROR) {
    const { error, type } = action.payload;
    if (type === "empty") {
      return {
        ...state,
        empty_error: error,
      };
    }
    if (type === "user-error") {
      return {
        ...state,
        username_post_error: error,
      };
    }
    if (type === "email-error") {
      return {
        ...state,
        email_post_error: error,
      };
    }
  }
  if (action.type === UPDATE_INPUT) {
    const { name, value } = action.payload;
    return {
      ...state,
      signup_data: {
        ...state.signup_data,
        [name]: value,
      },
    };
  }
  if (action.type === CHECK_VALIDITY_USERNAME) {
    if (action.payload.length < 5 || action.payload.length > 20) {
      return { ...state, username_error: true };
    } else {
      return { ...state, username_error: false };
    }
  }
  if (action.type === CHECK_VALIDITY_EMAIL) {
    let chars = 0;
    for (let char of action.payload) {
      if (char === " ") return { ...state, email_error: true };
      if (char === "@") chars++;
    }
    if (chars === 1) {
      return { ...state, email_error: false };
    } else {
      return { ...state, email_error: true };
    }
  }
  if (action.type === CHECK_VALIDITY_PASSWORD) {
    if (action.payload.length > 8) {
      return { ...state, password_error: false };
    } else {
      return { ...state, password_error: true };
    }
  }
  if (action.type === CHECK_VALIDITY_CONFIRM) {
    const value = action.payload;
    if (state.signup_data.password === value) {
      return { ...state, confirm_error: false };
    } else {
      return { ...state, confirm_error: true };
    }
  }
  if (action.type === CLICKED) {
    return { ...state, clicked: true };
  }
  return { ...state };
};

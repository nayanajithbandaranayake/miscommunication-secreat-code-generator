import React from "react";
import { LoginInitialState } from "../dataTypes/login/interfaces";
import {
  CHECK_VALIDITY_EMAIL_LOGIN,
  CLICKED_LOGIN,
  ERROR_LOGIN,
  UPDATE_INPUT_LOGIN,
} from "../actions/types";

type Action =
  | { type: "ERROR_LOGIN"; payload: { error: boolean; type: string } }
  | { type: "CHECK_VALIDITY_EMAIL_LOGIN"; payload: string }
  | { type: "CLICKED_LOGIN" }
  | { type: "UPDATE_INPUT_LOGIN"; payload: { name: string; value: string } };

export const loginReducer: React.Reducer<LoginInitialState, Action> = (
  state,
  action
) => {
  if (action.type === ERROR_LOGIN) {
    const { error, type } = action.payload;
    if (type === "empty") {
      return { ...state, empty_error: error };
    }
    if (type === "post") {
      return { ...state, post_error: error };
    }
    if (type === "error") {
      return { ...state, server_error: error };
    }
  }
  if (action.type === CLICKED_LOGIN) {
    return {
      ...state,
      clicked: true,
    };
  }
  if (action.type === CHECK_VALIDITY_EMAIL_LOGIN) {
    const email = action.payload;
    let chars = 0;
    for (let char of email) {
      if (char === " ") return { ...state, email_error: true };
      if (char === "@") chars++;
    }
    if (chars === 1) {
      return { ...state, email_error: false };
    } else {
      return { ...state, email_error: true };
    }
  }
  if (action.type === UPDATE_INPUT_LOGIN) {
    const { name, value } = action.payload;
    return { ...state, login_data: { ...state.login_data, [name]: value } };
  }
  return { ...state };
};

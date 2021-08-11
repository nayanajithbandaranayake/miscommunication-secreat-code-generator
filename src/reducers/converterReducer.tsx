import React from "react";
import { InitialState } from "../dataTypes/converter/interface";
import chkchars from "chkchars";
import {
  UPDATE_CONVERTER_INPUT,
  UPDATE_CONVERTER_OUTPUT,
  CHECK_VALIDITY_SYMBOLS_CONVERTER,
  CHECK_VALIDITY_ENGLISH_CONVERTER,
  UPDATE_LANG_CONVERTER,
  CHANGE_CODE_TYPE,
  SET_LANGUAGES_CONVERTER,
  CHECK_VALIDITY_SPACE_CONVERTER,
  RESET_ALL_ERRORS,
  CHECK_VALIDITY_DIVISION_CONVERTER,
  CHECK_VALIDITY_TYPE_CONVERTER,
  SET_DECODE_ERROR,
} from "../actions/types";

type Action =
  | { type: "UPDATE_CONVERTER_INPUT"; payload: string }
  | { type: "UPDATE_CONVERTER_OUTPUT"; payload: string }
  | { type: "CHECK_VALIDITY_SYMBOLS_CONVERTER"; payload: string }
  | { type: "CHECK_VALIDITY_ENGLISH_CONVERTER"; payload: string }
  | { type: "CHECK_VALIDITY_SPACE_CONVERTER"; payload: string }
  | {
      type: "CHECK_VALIDITY_TYPE_CONVERTER";
      payload: { phrase: string; type: "1 and 0" | "symbols" };
    }
  | {
      type: "CHECK_VALIDITY_DIVISION_CONVERTER";
      payload: { phrase: string; length: number };
    }
  | { type: "UPDATE_LANG_CONVERTER"; payload: string }
  | { type: "CHANGE_CODE_TYPE"; payload: string }
  | { type: "RESET_ALL_ERRORS" }
  | { type: "SET_LANGUAGES_CONVERTER"; payload: string[] }
  | { type: "SET_DECODE_ERROR"; payload: boolean };

export const converterReducer: React.Reducer<InitialState, Action> = (
  state,
  action
) => {
  if (action.type === UPDATE_CONVERTER_INPUT) {
    return {
      ...state,
      input: action.payload,
    };
  }
  if (action.type === UPDATE_CONVERTER_OUTPUT) {
    return {
      ...state,
      output: action.payload,
    };
  }
  if (action.type === SET_DECODE_ERROR) {
    return {
      ...state,
      decode_error: action.payload,
    };
  }
  if (action.type === CHECK_VALIDITY_TYPE_CONVERTER) {
    const { phrase, type } = action.payload;
    if (type === "symbols") {
      if (chkchars.allSymbols(phrase)) {
        return {
          ...state,
          type_checked: true,
          type_error: false,
        };
      } else {
        return {
          ...state,
          type_checked: true,
          type_error: true,
        };
      }
    }
    if (type === "1 and 0") {
      const possibles = ["1", "0"];
      let possible_count = 0;
      for (let char of phrase) {
        for (let num of possibles) if (char === num) possible_count++;
      }
      if (possible_count === phrase.length)
        return { ...state, type_checked: true, type_error: false };
      else return { ...state, type_checked: true, type_error: true };
    }
  }
  if (action.type === CHECK_VALIDITY_SYMBOLS_CONVERTER) {
    const phrase = action.payload;
    const { count, found } = chkchars.symbols(phrase);
    if (count === 0) {
      return {
        ...state,
        symbol_error: false,
        symbols_checked: true,
      };
    } else if (found.length === 1 && found.includes("_")) {
      return {
        ...state,
        symbol_error: false,
        symbols_checked: true,
      };
    }
    return {
      ...state,
      symbol_error: true,
      symbols_checked: true,
    };
  }
  if (action.type === CHECK_VALIDITY_ENGLISH_CONVERTER) {
    const english = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];

    const phrase = action.payload.toLowerCase();
    let matches = 0;
    let space_count = 0;
    const { count: num_count } = chkchars.numbers(phrase);

    for (let char of phrase) {
      if (char === "_") space_count++;
      else {
        for (let eng of english) {
          if (char === eng) {
            matches++;
          }
        }
      }
    }

    if (matches + space_count + num_count === phrase.length) {
      return {
        ...state,
        english_error: false,
        english_checked: true,
      };
    } else {
      return {
        ...state,
        english_error: true,
        english_checked: false,
      };
    }
  }
  if (action.type === CHANGE_CODE_TYPE) {
    if (action.payload === "encode" || action.payload === "decode") {
      return {
        ...state,
        code_type: action.payload,
      };
    }
    return {
      ...state,
    };
  }
  if (action.type === CHECK_VALIDITY_SPACE_CONVERTER) {
    const phrase = action.payload;
    for (let char of phrase) {
      if (char === " ") {
        return {
          ...state,
          space_error: true,
          space_checked: true,
        };
      }
    }
    return {
      ...state,
      space_error: false,
      space_checked: true,
    };
  }
  if (action.type === SET_LANGUAGES_CONVERTER) {
    return {
      ...state,
      info: {
        ...state.info,
        languages: action.payload,
      },
    };
  }
  if (action.type === UPDATE_LANG_CONVERTER) {
    return {
      ...state,
      info: {
        ...state.info,
        lang: action.payload,
      },
    };
  }
  if (action.type === RESET_ALL_ERRORS) {
    return {
      ...state,
      english_checked: false,
      symbols_checked: false,
      space_checked: false,
      divide_checked: false,
      type_checked: false,
    };
  }
  if (action.type === CHECK_VALIDITY_DIVISION_CONVERTER) {
    const { length, phrase } = action.payload;
    if (phrase.length % length === 0) {
      return {
        ...state,
        divide_error: false,
        divide_checked: true,
      };
    }
    return {
      ...state,
      divide_error: true,
      divide_checked: true,
    };
  }
  return { ...state };
};

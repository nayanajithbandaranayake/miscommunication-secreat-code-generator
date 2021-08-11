import React, { SetStateAction, Dispatch } from "react";
import { BooleanLiteral } from "typescript";

export interface InputData {
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  f: string;
  g: string;
  h: string;
  i: string;
  j: string;
  k: string;
  l: string;
  m: string;
  n: string;
  o: string;
  p: string;
  q: string;
  r: string;
  s: string;
  t: string;
  u: string;
  v: string;
  w: string;
  x: string;
  y: string;
  z: string;
  one: string;
  two: string;
  three: string;
  four: string;
  five: string;
  six: string;
  seven: string;
  eight: string;
  nine: string;
  zero: string;
  under_score: string;
}
export interface Value {
  data: InputData;
  setInputData: Dispatch<SetStateAction<InputData>>;
  setType: Dispatch<SetStateAction<Type>>;
  name: string;
  type: Type;
  setName: Dispatch<SetStateAction<string>>;
  characterLength: number;
  setCharacterLength: Dispatch<SetStateAction<number>>;
  updateInputs: React.ChangeEventHandler<HTMLInputElement>;

  errors: {
    empty: boolean;
    type: boolean;
    length: boolean;
    char_length_zero: boolean;
    duplicate_name: boolean;
    name_english_error: boolean;
  };
  checkErrors: () => void;
  verified: boolean;
  setVerified: Dispatch<SetStateAction<boolean>>;
  createPattern: () => Promise<void>;
}

export type Type = "1 and 0" | "symbols";
export type EnglishInputs = [
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
  "z"
];
export type Letter =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";

export type NumberInputs = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "zero"
];

export type Number =
  | "one"
  | "two"
  | "three"
  | "four"
  | "five"
  | "six"
  | "seven"
  | "eight"
  | "nine"
  | "zero";

export interface Value {
  input: string;
  setInput: (phrase: string) => void;
  setOutput: (phrase: string) => void;
  setLang: (lang: string) => void;
  symbolErrorCheck: (phrase: string) => void;
  englishErrorCheck: (phrase: string) => void;
  spaceErrorCheck: (phrase: string) => void;
  divideErrorCheck: (phrase: string, language: string) => void;
  setLanguages: () => Promise<void>;
  output: string;
  symbol_error: boolean;
  english_error: boolean;
  space_error: boolean;
  code_type: "encode" | "decode";
  space_checked: boolean;
  english_checked: boolean;
  symbols_checked: boolean;
  changeCodeType: (type: string) => void;
  encode: (phrase: string, language: string) => Promise<void>;
  decode: (phrase: string, language: string) => Promise<void>;
  info: {
    languages: string[];
    lang: string;
  };
  resetAllErrors: () => void;
  decode_error: boolean;
  divide_error: boolean;
  divide_checked: boolean;
  type_error: boolean;
  type_checked: boolean;
  typeErrorCheck: (phrase: string, language: string) => void;
}

export interface InitialState {
  info: {
    languages: string[];
    lang: string;
  };
  input: string;
  output: string;
  english_error: boolean;
  symbol_error: boolean;
  space_error: boolean;
  space_checked: boolean;
  divide_error: boolean;
  decode_error: boolean;
  divide_checked: boolean;
  type_error: boolean;
  type_checked: boolean;
  english_checked: boolean;
  symbols_checked: boolean;
  code_type: "encode" | "decode";
}

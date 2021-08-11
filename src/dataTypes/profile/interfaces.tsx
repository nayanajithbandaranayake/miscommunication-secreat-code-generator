export interface Language {
  name: string;
  character_length: number;
  type: string;
  secret_key: string;
}

export interface Value {
  own_languages: Language[];
  added_languages: Language[];
  addLanguageText: string;
  addLanguageFormatError: boolean;
  addLanguageFindError: boolean;
  alreadyAddedError: boolean;
  isVerified: boolean;
  setAddLanguageFormatError: React.Dispatch<React.SetStateAction<boolean>>;
  setAddLanguageFindError: React.Dispatch<React.SetStateAction<boolean>>;
  setAddLanguageText: React.Dispatch<React.SetStateAction<string>>;
  fetchPatterns: () => void;
  removeAddedLanguage: (language: string) => Promise<void>;
  checkEverything: () => void;
  deleteLanguage: (lang: string) => Promise<void>;
  addLanguage: (secret_key: string) => Promise<void>;
}

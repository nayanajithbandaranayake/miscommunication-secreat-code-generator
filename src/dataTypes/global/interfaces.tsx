import React from "react";

export interface Value {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isVerified: boolean;
  setConverterChecked: React.Dispatch<React.SetStateAction<boolean>>;
  converterChecked: boolean;
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
}

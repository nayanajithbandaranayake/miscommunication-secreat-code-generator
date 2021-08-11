import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import SignupContextProvider from "./context/SignupContext";
import LoginContextProvider from "./context/LoginContext";
import GlobalContextProvider from "./context/GlobalContext";
import ConverterContextProvider from "./context/ConverterContext";
import LibraryContextProvider from "./context/LibraryContext";
import ProfileContextProvider from "./context/ProfileContext";
import CreatePatternProvider from "./context/CreatePatternContext";

ReactDOM.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <SignupContextProvider>
        <LoginContextProvider>
          <ConverterContextProvider>
            <LibraryContextProvider>
              <ProfileContextProvider>
                <CreatePatternProvider>
                  <App />
                </CreatePatternProvider>
              </ProfileContextProvider>
            </LibraryContextProvider>
          </ConverterContextProvider>
        </LoginContextProvider>
      </SignupContextProvider>
    </GlobalContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

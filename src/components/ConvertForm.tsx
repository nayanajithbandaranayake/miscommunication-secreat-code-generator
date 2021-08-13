import React from "react";
import { useConverterContext } from "../context/ConverterContext";
import styled from "styled-components";
import { useGlobalContext } from "../context/GlobalContext";
import { useEffect } from "react";
import { ImSpinner8 } from "react-icons/im";

const ConvertForm = () => {
  const {
    code_type,
    encode,
    decode,
    symbolErrorCheck,
    englishErrorCheck,
    english_error,
    symbol_error,
    input,
    output,
    setInput,
    setOutput,
    space_checked,
    english_checked,
    setLang,
    symbols_checked,
    spaceErrorCheck,
    space_error,
    setLanguages,
    divide_error,
    divide_checked,
    divideErrorCheck,
    type_checked,
    type_error,
    typeErrorCheck,
    resetAllErrors,
    decode_error,
    info: { lang, languages },
  } = useConverterContext()!;

  const { isLogged, isLoading } = useGlobalContext()!;

  useEffect(() => {
    setLanguages();
    // eslint-disable-next-line
  }, [isLogged]);

  useEffect(() => {
    resetAllErrors();
    // eslint-disable-next-line
  }, [input]);

  useEffect(() => {
    setInput("");
    setOutput("");
    // eslint-disable-next-line
  }, [code_type]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (code_type === "encode") {
      symbolErrorCheck(input);
      englishErrorCheck(input);
      spaceErrorCheck(input);
      if (space_checked && english_checked && symbols_checked) {
        if (!english_error && !symbol_error && !space_error) {
          encode(input, lang);
        }
      }
    }
    if (code_type === "decode") {
      spaceErrorCheck(input);
      divideErrorCheck(input, lang);
      typeErrorCheck(input, lang);
      if (space_checked && type_checked && divide_checked) {
        if (!type_error && !divide_error && !decode_error) {
          decode(input, lang);
        }
      }
    }
  };
  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setInput(e.target.value);
  };

  return (
    <Wrapper className="convert-form" onSubmit={handleSubmit}>
      <label htmlFor="pattern">choose pattern</label>
      <select
        name="pattern"
        id="pattern"
        onChange={(e) => setLang(e.target.value)}
      >
        {languages.map((lang, index) => {
          return (
            <option value={lang} key={index}>
              {lang}
            </option>
          );
        })}
      </select>
      {type_error && (
        <h5 className="error">
          Your input contains somthing that is not compatible with the pattern's
          type.
        </h5>
      )}
      {divide_error && (
        <h5 className="error">
          Length of your input is can not be perfectly divided by the pattern's
          character length.
        </h5>
      )}
      <br />
      <br />
      {decode_error && (
        <h5 className="error">Unable to decode please check your input.</h5>
      )}
      <div>
        <label htmlFor="input" className="name">
          input
        </label>
        <textarea
          name="input"
          id="input"
          value={input}
          onChange={handleChange}
        ></textarea>
        {symbol_error && (
          <h5 className="error">
            Only letters, numbers and under scores are allowed.
          </h5>
        )}
        {english_error && !space_error && !symbol_error && (
          <h5 className="error">Only english letters are allowed.</h5>
        )}
        {space_error && <h5 className="error">Please use '_' for spacing.</h5>}
        <button type="submit" className="btn convert-btn">
          {isLoading ? (
            <div className="spinner">
              <ImSpinner8 />
            </div>
          ) : code_type === "encode" ? (
            "Encode"
          ) : (
            "Decode"
          )}
        </button>
        <label htmlFor="output" className="name">
          output
        </label>
        <textarea
          name="output"
          id="output"
          value={output}
          onChange={(e) => setOutput(e.target.value)}
        ></textarea>
        <button
          className="copy-btn"
          onClick={() => navigator.clipboard.writeText(output)}
        >
          Copy
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  min-height: 25em;
  min-width: 15em;
  border-radius: 0.5em;
  box-shadow: 0 0 0.4em 0.3em rgba(0, 0, 0, 0.1);
  padding: 3em;
  margin-bottom: 5em;
  box-sizing: content-box;
  select {
    border: none;
    background: #eeeeff;
    padding: 0.3em;
    font-size: 0.8em;
  }
  .name {
    font-size: 1em;
    margin-bottom: 0.8em;
    display: block;
  }
  .attention {
    margin-top: 1em;
    font-size: 0.9em;
    color: orange;
  }
  & > div {
    margin-top: 2em;
  }
  label {
    text-transform: capitalize;
    margin-right: 1.5em;
  }
  button {
    display: block;
  }
  textarea {
    display: block;
    resize: none;
    border-radius: 0.1em;
    height: 8em;
    font-size: 1em;
    max-width: 100%;
    min-width: 80%;
    padding: 1em;
    border: none;
    background: #eeeeff;
  }
`;

export default ConvertForm;

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useProfileContext } from "../context/ProfileContext";

const UserPatternManageArea = () => {
  const {
    addLanguageText,
    setAddLanguageText,
    addLanguageFindError,
    addLanguageFormatError,
    alreadyAddedError,
    addLanguage,
    checkEverything,
    isVerified,
  } = useProfileContext()!;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    checkEverything();
    if (isVerified) {
      if (
        !addLanguageFormatError &&
        !alreadyAddedError &&
        !addLanguageFindError
      ) {
        addLanguage(addLanguageText);
        setAddLanguageText("");
      }
    }
  };

  return (
    <Wrapper className="manage-area">
      If you are interested create your own pattern and share it with your
      friends using the secret key.
      <Link to="/patterns/create" className="btn login-btn">
        Create a Pattern
      </Link>
      <form onSubmit={handleSubmit}>
        <label htmlFor="add-pattern">Add a Pattern (enter a secret key)</label>
        {alreadyAddedError && (
          <h4 className="error">You already have that pattern.</h4>
        )}
        {addLanguageFormatError && (
          <h4 className="error">Wrong format please check the secret key.</h4>
        )}
        {addLanguageFindError && !addLanguageFormatError && (
          <h4 className="error">
            Couldn't find your pattern please check your secret key.
          </h4>
        )}
        <input
          type="text"
          id="add-pattern"
          placeholder="ex :- 00000000-0000-0000-000000000000"
          value={addLanguageText}
          onChange={(e) => setAddLanguageText(e.target.value)}
        />
        <button type="submit" className="btn submit-btn">
          Add
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  background: #eeffee;
  height: 100%;
  width: 100%;
  border-radius: 0.25em;
  padding: 1em 0.5em;

  form {
    display: flex;
    flex-direction: column;
    input {
      display: block;
      background: white;
      padding: 1em;
      font-size: 1em;
      &::placeholder {
        font-style: italic;
      }
    }
    label {
      display: block;
      margin-bottom: 1em;
    }
  }
  div {
    margin-top: 3em;
  }
`;

export default UserPatternManageArea;

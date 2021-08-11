import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import CreatePatternForm from "../components/CreatePatternForm";
import Head from "../components/Head";
import { useCreatePatternContext } from "../context/CreatePatternContext";

const CreatePatternPage = () => {
  const {
    checkErrors,
    errors: { empty, type, length, char_length_zero },
    createPattern,
    setType,
    setName,
    characterLength,
    setCharacterLength,
    verified,
    type: patternType,
    name,
  } = useCreatePatternContext()!;
  const history = useHistory();
  const handleSubmit = () => {
    checkErrors();
    if (verified) {
      if (!empty && !type && !length) {
        createPattern();
        history.push(
          `/profile/${JSON.parse(localStorage.getItem("user")!)[0].username}`
        );
      }
    }
  };
  return (
    <Wrapper className="section">
      <Head
        title="Create Pattern"
        description="Here is the place where you can create your own custom secret patterns."
        keywords="create pattern secret"
      />
      <div className="btn-container">
        <Link className="btn home-btn" to="/">
          Back Home
        </Link>
        <Link
          className="btn submit-btn"
          to={`/profile/${
            JSON.parse(localStorage.getItem("user")!)[0].username
          }`}
        >
          Back to Profile
        </Link>
      </div>
      <form className="basic-info">
        <div>
          <label htmlFor="pattern-name">Pattern name</label>
          <input
            type="text"
            name="name"
            id="pattern-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="pattern-char-length">Character Length</label>
          <input
            type="text"
            name="characterLength"
            value={characterLength}
            onChange={(e) => setCharacterLength(Number(e.target.value))}
            id="pattern-char-length"
          />
        </div>
        <div>
          <label htmlFor="pattern-type">Pattern type</label>
          <select
            name="type"
            id="pattern-type"
            value={patternType}
            onChange={(e) => {
              if (e.target.value === "1 and 0") {
                setType(e.target.value);
              }
              if (e.target.value === "symbols") {
                setType(e.target.value);
              }
            }}
          >
            <option value="1 and 0">1 and 0</option>
            <option value="symbols">Symbols</option>
          </select>
        </div>
      </form>
      <CreatePatternForm />
      <div className="bottom-section">
        <button
          type="button"
          className="btn convert-btn"
          onClick={handleSubmit}
        >
          Create
        </button>
        <div className="error-section">
          {empty && <h4 className="error">A input is empty. Please fill it</h4>}
          {length && !char_length_zero && (
            <h4 className="error">
              The length of at least one of your inputs does not match with the
              given "character length".
            </h4>
          )}
          {type && (
            <h4 className="error">
              The type of at least one of your inputs does not match with the
              provided "type".
            </h4>
          )}
          {char_length_zero && (
            <h4 className="error">The "character length" cannot be zero</h4>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-rows: 8em 15em auto auto;
  align-items: center;
  justify-content: center;
  input {
    background: #eeeeff;
    padding: 1em;
    font-size: 1em;
  }
  .basic-info div,
  .pattern-entries {
    display: grid;
    grid-template-columns: 9em 18em;
    align-items: center;
    margin-bottom: 1em;
  }
  .bottom-section {
    grid-row: 4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 4em;
    .error {
      font-size: 0.9em;
    }
  }
  select {
    padding: 1em;
    font-size: 1em;
  }
  .btn-container {
    grid-row: 1;
    margin-bottom: 4em;
  }
  .basic-info {
    grid-row: 2;
    border-radius: 1em;
    padding: 3em;
    box-shadow: 0 0 0.6em 0.3em rgba(0, 0, 0, 0.1);
    input {
      background: #eeffee;
    }
  }
  .input-container:nth-last-child(1) {
    margin-bottom: 6em;
  }
  .input-container {
    padding: 0 3em;
    margin-top: 6em;

    .pattern-entries {
      input {
        background: #eeeeff;
      }
      p {
        margin-right: 2em;
        font-size: 1em;
      }
    }
  }
`;

export default CreatePatternPage;

import React from "react";
import { useState } from "react";
import styled from "styled-components";
import {
  EnglishInputs,
  Letter,
  NumberInputs,
  Number,
} from "../dataTypes/createPattern/interface";
import { useCreatePatternContext } from "../context/CreatePatternContext";

const CreatePatternForm = () => {
  const { data, updateInputs } = useCreatePatternContext()!;

  let englishId = 0;
  let numberId = 0;
  const englishInputs: EnglishInputs = [
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
  const numberInputs: NumberInputs = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "zero",
  ];

  return (
    <Wrapper>
      <div className="english-inputs input-container">
        <h3>English Letters</h3>
        {englishInputs.map((letter: Letter | string) => {
          const value: Letter = englishInputs[englishId];
          englishId++;
          return (
            <div key={letter} className="pattern-entries">
              <p>{letter} : </p>
              <input
                type="text"
                name={letter}
                value={data[value]}
                onChange={updateInputs}
              />
            </div>
          );
        })}
      </div>
      <div className="number-inputs input-container">
        <h3>Numbers</h3>
        {numberInputs.map((num) => {
          const value: Number = numberInputs[numberId];
          numberId++;
          return (
            <div key={num} className="pattern-entries">
              <p>{num} : </p>
              <input
                type="text"
                name={num}
                value={data[value]}
                onChange={updateInputs}
              />
            </div>
          );
        })}
      </div>
      <div className="other-inputs input-container">
        <h3>Other</h3>
        <div className="pattern-entries">
          <p>under_score : </p>
          <input
            type="text"
            name="under_score"
            value={data.under_score}
            onChange={updateInputs}
          />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.form``;

export default CreatePatternForm;

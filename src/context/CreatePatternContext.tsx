import React, { useContext, useState } from "react";
import { InputData, Value, Type } from "../dataTypes/createPattern/interface";
import chkchars from "chkchars";
import axios from "axios";
const createPatternContext = React.createContext<Value | null>(null);

const CreatePatternProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [inputData, setInputData] = useState<InputData>({
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
    f: "",
    g: "",
    h: "",
    i: "",
    j: "",
    k: "",
    l: "",
    m: "",
    n: "",
    o: "",
    p: "",
    q: "",
    r: "",
    s: "",
    t: "",
    u: "",
    v: "",
    w: "",
    x: "",
    y: "",
    z: "",
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    six: "",
    seven: "",
    eight: "",
    nine: "",
    zero: "",
    under_score: "",
  });

  const [type, setType] = useState<Type>("1 and 0");
  const [name, setName] = useState("");
  const [characterLength, setCharacterLength] = useState(0);
  const [errors, setErrors] = useState({
    empty: false,
    type: false,
    length: false,
    char_length_zero: false,
    duplicate_name: false,
    name_english_error: false,
  });
  const [verified, setVerified] = useState(false);
  const updateInputs: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setInputData({ ...inputData, [name]: value });
  };

  const BACKEND = process.env.REACT_APP_BACKEND;

  const checkName = async () => {
    if (chkchars.isEnglish(name)) {
      setErrors((current) => {
        return {
          ...current,
          name_english_error: false,
        };
      });
    } else {
      setErrors((current) => {
        return {
          ...current,
          name_english_error: true,
        };
      });
    }
    const { data } = await axios.get(
      `${BACKEND}/languages/verify/name?name=${name}`
    );
    setErrors((current) => {
      return {
        ...current,
        duplicate_name: data.result,
      };
    });
  };

  const checkErrors = () => {
    setVerified(false);
    checkName();
    for (let item of Object.values(inputData)) {
      if (item && name && characterLength) {
        setErrors((errors) => {
          return { ...errors, empty: false };
        });
      } else {
        setErrors((errors) => {
          return { ...errors, empty: true };
        });
        break;
      }
      if (characterLength === 0) {
        setErrors((errors) => {
          return {
            ...errors,
            char_length_zero: true,
          };
        });
        break;
      } else {
        setErrors((errors) => {
          return {
            ...errors,
            char_length_zero: false,
          };
        });
      }
      if (type === "symbols") {
        if (chkchars.symbols(item).count === item.length) {
          setErrors((errors) => {
            return { ...errors, type: false };
          });
        } else {
          setErrors((errors) => {
            return { ...errors, type: true };
          });
          break;
        }
      } else {
        if (item === "0" || item === "1") {
          setErrors((errors) => {
            return { ...errors, type: false };
          });
        } else {
          setErrors((errors) => {
            return { ...errors, type: true };
          });
          break;
        }
      }
      if (item.length === characterLength) {
        setErrors((errors) => {
          return { ...errors, length: false };
        });
      } else {
        setErrors((errors) => {
          return { ...errors, length: false };
        });
        break;
      }
    }
    setVerified(true);
  };

  const createPattern = async () => {
    try {
      await axios.post(
        `${BACKEND}/languages/essentials?username=${
          JSON.parse(localStorage.getItem("user")!)[0].username
        }`,
        {
          name,
          characterLength,
          type,
        }
      );
      await axios.post(
        `${BACKEND}/languages?username=${
          JSON.parse(localStorage.getItem("user")!)[0].username
        }&language=${name}`,
        {
          data: { ...inputData },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <createPatternContext.Provider
      value={{
        data: { ...inputData },
        errors,
        updateInputs,
        setInputData,
        setType,
        name,
        type,
        setName,
        characterLength,
        setCharacterLength,
        createPattern,
        verified,
        setVerified,
        checkErrors,
      }}
    >
      {children}
    </createPatternContext.Provider>
  );
};

export const useCreatePatternContext = () => {
  return useContext(createPatternContext);
};

export default CreatePatternProvider;

import React, { useEffect } from "react";
import { useConverterContext } from "../context/ConverterContext";
import { useLibraryContext } from "../context/LibraryContext";
import SecretSet from "../components/SecretSet";
import Head from "../components/Head";
const Library = () => {
  const {
    info: { languages, lang },
    setLang,
  } = useConverterContext()!;
  const { fetchLangData, fetchLangInfo, info } = useLibraryContext()!;

  useEffect(() => {
    fetchLangData(lang);
    fetchLangInfo(lang);
    console.log(info);
    // eslint-disable-next-line
  }, [lang]);

  const { character_length, type, name } = info;

  return (
    <section className="section library">
      <Head
        title="Library"
        description="Here is our secret pattern library."
        keywords="miscommunication secret code library"
      />
      <div className="title-container">
        <h3>Welcome to the secret code library</h3>
        <p>Here you can find all the details about your secret patterns.</p>
      </div>
      <div className="info-container">
        <div className="selector">
          <label htmlFor="select-library">Select your pattern</label>
          <select
            id="select-library"
            className="select"
            value={lang}
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
        </div>
        <article className="details">
          <p>
            <span>name : </span>
            {name}
          </p>
          <p>
            <span>type : </span>
            {type}
          </p>
          <p>
            <span>character length : </span>
            {character_length}
          </p>
        </article>
      </div>
      <SecretSet />
    </section>
  );
};

export default Library;

import React from "react";
import ConvertForm from "../components/ConvertForm";
import Head from "../components/Head";
import { useConverterContext } from "../context/ConverterContext";

const HomePage = () => {
  const { changeCodeType } = useConverterContext()!;
  return (
    <section className="section home-page">
      <Head
        title="Home"
        description="Welcome to Miscommunication. The greatest secret code generating web app."
        keywords="miscommunication secret code generator free cool"
      />
      <div className="introduction">
        <h4>Miscommunication</h4>
        <p>
          Hmm lemme guess.. you need a secret language to chat with your friend,
          right? Well you are in the best place then. Through Miscommunication
          you can generate secret codes from english. We use ASCII for default{" "}
          {"(1 english letter represents seven 1 and 0 s)"} but if you don't
          like them you can sign up and make your own patterns. In case you
          forgot your pattern we have a library including the data about all
          your patterns.
        </p>
      </div>
      <div>
        <select
          id="encode-or-decode"
          className="select"
          onChange={(e) => changeCodeType(e.target.value.toLowerCase())}
        >
          <option value="encode">Encode</option>
          <option value="decode">Decode</option>
        </select>
        <ConvertForm />
      </div>
    </section>
  );
};

export default HomePage;

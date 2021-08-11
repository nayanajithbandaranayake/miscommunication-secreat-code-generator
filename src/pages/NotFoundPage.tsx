import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Head from "../components/Head";

const NotFoundPage = () => {
  return (
    <Wrapper className="section section-center">
      <Head
        title="Not found"
        description="Miscommunication not found page."
        keywords="not found"
      />
      <h1>404</h1>
      <h2>Oops! That's a dead end.</h2>
      <div>
        <Link to="/" className="btn submit-btn">
          Back Home
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  h1 {
    font-size: 6em;
    margin-bottom: 1em;
  }
  h2 {
    font-size: 2.4em;
    margin-bottom: 1.5em;
  }
`;

export default NotFoundPage;

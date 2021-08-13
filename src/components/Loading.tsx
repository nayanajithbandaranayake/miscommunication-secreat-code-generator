import React from "react";
import styled from "styled-components";
import { ImSpinner8 } from "react-icons/im";

const Loading = () => {
  return (
    <Wrapper className="section-center">
      <article>
        <div className="spinner">
          <ImSpinner8 />
        </div>
        <h4>Loading...</h4>
      </article>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: fixed;
  z-index: 25;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export default Loading;

import React from "react";
import { Helmet } from "react-helmet";

interface Props {
  title: string;
  description: string;
  keywords: string;
}

const Head: React.FC<Props> = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <title>{`${title} | Miscommunication`}</title>
    </Helmet>
  );
};

export default Head;

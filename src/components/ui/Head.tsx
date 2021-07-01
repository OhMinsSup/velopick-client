import React from "react";
import { Helmet } from "react-helmet-async";

interface HeadProps {
  title: string;
  description: string;
}
const Head: React.FC<HeadProps> = ({ title, description }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} data-rh="true"></meta>
      </Helmet>
    </>
  );
};

export default Head;

import React from "react";
import { css } from "@emotion/react";
import { PickMap } from "../components/PickMap";

interface PickPageProps {}
const PickPage: React.FC<PickPageProps> = () => {
  return (
    <div className="w-full h-full p-8">
      <PickMap />
    </div>
  );
};

export default PickPage;

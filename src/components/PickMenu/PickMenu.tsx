import React from "react";
import { useLocation } from "react-router";
import SubPickMenu from "./SubPickMenu";

interface PickMenuProps {}
const PickMenu: React.FC<PickMenuProps> = () => {
  const location = useLocation();

  switch (location.pathname) {
    case "/":
      return <SubPickMenu />;
    case "/explore":
      return <div className="">explore</div>;
    case "/member":
      return <div className="">member</div>;
    case "/search":
      return <div className="">search</div>;
    default:
      return <div className="">default</div>;
  }
};

export default PickMenu;

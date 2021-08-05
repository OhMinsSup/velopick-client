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
    case "/member":
    default:
      return null;
  }
};

export default PickMenu;

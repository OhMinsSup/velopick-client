import React, { useCallback, useState } from "react";
import { css } from "@emotion/react";
import { BiMapPin, BiUser, BiWorld } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { defaultThumbnail } from "../../assets/images";
import palette from "../../libs/style/palette";
import UserMenu from "../common/UserMenu";

const navItemStyles = (active: boolean) =>
  css`
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.75rem;
  line-height: 1.375;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  --tw-text-opacity: 1;
  color: ${
    active ? palette.amber400 : "rgba(17, 24, 39, var(--tw-text-opacity))"
  };
  letter-spacing: -0.025em;
  width: 100%;

  & > svg {
    flex-shrink: 0;
    height: 1.3rem;
    margin-right: 0.5rem;
    opacity: 0.5;
    fill: currentColor;
    width: 3rem;
  }

  &:hover {
    background: ${palette.blueGray100};
  }
`;

function SidebarHeader() {
  const location = useLocation();

  return (
    <div
      className="flex flex-row items-center flex-shrink-0 md:w-full md:flex-col"
    >
      <div className="relative md:mb-8 md:w-full">
        <h1 className="text-xl font-bold text-brand-blue md:text-brand-black">
          <Link to="/" className="flex flex-row items-center justify-center">
            <span className="font-mono">Velopick</span>
          </Link>
        </h1>
      </div>
      <div
        className="fixed top-0 left-0 z-50 hidden w-full mt-16 md:block md:relative md:top-auto md:mt-auto"
      >
        <nav
          className="absolute left-0 flex flex-col w-2/3 p-5 overflow-hidden bg-white border rounded-lg shadow-xl dark:bg-brand-dark-grey-900 md:bg-transparent md:dark:bg-transparent md:border-none md:p-0 md:w-auto dark:border-brand-grey-800 md:relative top-100 md:top-auto md:shadow-none md:rounded-none md:overflow-auto"
        >
          <div className="md:mb-1">
            <Link to="/" css={navItemStyles(location.pathname === "/")}>
              <BiMapPin />
              <span>Pick</span>
            </Link>
          </div>

          <div className="md:mb-1">
            <Link
              to="/explore"
              css={navItemStyles(location.pathname === "/explore")}
            >
              <BiWorld />
              <span>Explore</span>
            </Link>
          </div>

          <div className="md:mb-1">
            <Link
              to="/member"
              css={navItemStyles(location.pathname === "/member")}
            >
              <BiUser />
              <span>Member</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

interface SidebarFooterProps {
  onClickUserMenu: () => void;
}
function SidebarFooter({ onClickUserMenu }: SidebarFooterProps) {
  return (
    <div
      className="flex flex-row items-center flex-shrink-0 md:flex-col text-brand-grey-800 dark:text-brand-grey-300"
    >
      <div className="relative w-auto">
        <button
          type="button"
          className="block w-10 h-10 overflow-hidden rounded-full md:w-12 md:h-12 md:my-4 profile-thumb"
          onClick={onClickUserMenu}
        >
          <img
            className="block w-full profile-thumb"
            src={defaultThumbnail}
            alt="User Profile"
          />
        </button>
      </div>
    </div>
  );
}

interface SidebarProps {}
const Sidebar: React.FC<SidebarProps> = () => {
  const [visibleUserMenu, setVisibleUserMenu] = useState(false);

  const onClickUserMenu = useCallback(() => {
    setVisibleUserMenu((prev) => !prev);
  }, []);

  return (
    <div className="md:h-screen">
      <header
        className="relative z-40 flex flex-row items-center justify-between w-full py-2 md:border-b-0 md:overflow-auto dark:border-brand-grey-800 md:h-full md:flex-col md:py-5"
      >
        <SidebarHeader />
        <SidebarFooter onClickUserMenu={onClickUserMenu} />
        {visibleUserMenu && <UserMenu />}
      </header>
    </div>
  );
};

export default Sidebar;

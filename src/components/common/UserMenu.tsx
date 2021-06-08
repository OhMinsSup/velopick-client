import React from "react";
import { css } from "@emotion/react";
import { BiLogIn, BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

const MenuItem: React.FC<{
  text: string;
  to: string;
  icon: React.ReactNode;
}> = ({ text, to, icon }) => {
  return (
    <Link
      to={to}
      className="flex flex-row items-center px-4 py-2 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-grey-700"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

interface UserMenuProps {}
const UserMenu: React.FC<UserMenuProps> = () => {
  return (
    <div
      css={userMenuStyles}
      className="fixed top-0 right-0 z-50 h-auto mt-16 mr-5 bg-white border rounded-lg shadow-lg md:right-auto md:top-auto md:mt-0 md:mr-0 md:bottom-0 md:left-0 md:mb-5 dark:border-brand-grey-800 w-72 dark:bg-brand-dark-grey-800"
    >
      <div className="relative z-30 w-full overflow-hidden text-sm rounded">
        <MenuItem
          to="/login"
          icon={<BiLogIn className="w-6 h-6 mr-2 opacity-75 fill-current" />}
          text="Login"
        />
        <MenuItem
          to="/register"
          icon={
            <BiUserCircle className="w-6 h-6 mr-2 opacity-75 fill-current" />
          }
          text="Sign up"
        />
      </div>
    </div>
  );
};

export default UserMenu;

const userMenuStyles = css`
  @media (min-width: 768px) {
    margin-left: 17.5rem;
  }
`;

import React from "react";
import { css } from "@emotion/react";
import PlaceCard from "../common/PlaceCard";

interface PickMapSearchSidebarProps {}
const PickMapSearchSidebar: React.FC<PickMapSearchSidebarProps> = () => {
  return (
    <div className="block">
      <form className="py-5">
        <input
          type="text"
          name="query"
          placeholder="검색"
          autoComplete="off"
          css={searchInputStyles}
        />
      </form>
      <div className="flex flex-col space-y-4">
        <PlaceCard />
        <PlaceCard />
        <PlaceCard />
        <PlaceCard />
        <PlaceCard />
      </div>
    </div>
  );
};

export default PickMapSearchSidebar;

const searchInputStyles = css`
  height: 50px;
  line-height: 50px;
  width: 100%;
  margin: 0;
  padding: 0 36px 0 36px;
  border: 1px solid #f2f4f7;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 400;
  color: #767676;
  background-color: #f2f4f7;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

import React from "react";
import { css } from "@emotion/react";

import TagContainer from "./TagContainer";
import UserTagContainer from "./UserTagContainer";

interface SubPickMenuProps {}
const SubPickMenu: React.FC<SubPickMenuProps> = () => {
  return (
    <>
      <TagContainer label="태그" placeholder="태그를 입력해주세요." />
      <UserTagContainer label="회원" placeholder="회원을 입력해주세요." />
      <div className="p-4 mt-5 bg-white border rounded-lg dark:bg-brand-dark-grey-800 dark:border-brand-grey-800">
        <h3 className="mb-1 text-sm font-bold text-brand-grey-700 dark:text-brand-grey-400">
          <span>장소</span>
        </h3>
        <div className="relative">
          <div className="relative mb-2">
            <div
              css={displayNoneStyles}
              className="absolute right-0 z-10 w-full h-auto overflow-hidden bg-white border rounded-lg shadow-lg dark:border-brand-grey-800 top-100 dark:bg-brand-dark-grey-900"
            ></div>
          </div>
          <div className="flex flex-row flex-wrap">선택한 장소가 없습니다.</div>
        </div>
      </div>
    </>
  );
};

export default SubPickMenu;

const displayNoneStyles = css`
  display: none;
`;

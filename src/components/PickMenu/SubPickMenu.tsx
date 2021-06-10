import { css } from "@emotion/react";
import React from "react";
import { useTagAction, useTagValue } from "../../atoms/tagState";
import { TagItem } from "../TagModal";

const TagArea = () => {
  const tags = useTagValue();
  const { removeTag, insertTag, changeTag } = useTagAction();

  return (
    <div className="p-4 mt-5 bg-white border rounded-lg dark:bg-brand-dark-grey-800 dark:border-brand-grey-800">
      <h3 className="mb-1 text-sm font-bold text-brand-grey-700 dark:text-brand-grey-400">
        <span>태그</span>
      </h3>
      <div className="relative">
        <div className="relative mb-2">
          <div
            css={displayNoneStyles}
            className="absolute right-0 z-10 w-full h-auto overflow-hidden bg-white border rounded-lg shadow-lg dark:border-brand-grey-800 top-100 dark:bg-brand-dark-grey-900"
          ></div>
        </div>
        <div className="flex flex-row flex-wrap">
          {tags.length ? (
            tags.map((tag, index) => (
              <TagItem
                key={`menu-${tag}-${index}`}
                onClick={() => console.log(tag)}
              >
                {tag}
              </TagItem>
            ))
          ) : (
            <span>선택한 태그가 없습니다</span>
          )}
        </div>
      </div>
    </div>
  );
};

interface SubPickMenuProps {}
const SubPickMenu: React.FC<SubPickMenuProps> = () => {
  return (
    <>
      <TagArea />
      {/*  */}
      <div className="p-4 mt-5 bg-white border rounded-lg dark:bg-brand-dark-grey-800 dark:border-brand-grey-800">
        <h3 className="mb-1 text-sm font-bold text-brand-grey-700 dark:text-brand-grey-400">
          <span>회원</span>
        </h3>
        <div className="relative">
          <div className="relative mb-2">
            <div
              css={displayNoneStyles}
              className="absolute right-0 z-10 w-full h-auto overflow-hidden bg-white border rounded-lg shadow-lg dark:border-brand-grey-800 top-100 dark:bg-brand-dark-grey-900"
            ></div>
          </div>
          <div className="flex flex-row flex-wrap">선택한 회원이 없습니다.</div>
        </div>
      </div>
      {/*  */}
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

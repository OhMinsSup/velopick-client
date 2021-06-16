import React from "react";
import { css } from "@emotion/react";

import { useTagAction, useTagValue } from "../../atoms/tagState";
import { useUserAction, useUserValue } from "../../atoms/userState";

import { TagItem } from "../TagModal";

const UserArea = () => {
  const users = useUserValue();
  const { removeUser } = useUserAction();

  const onRemove = (tagId: number) => {
    removeUser(tagId);
  };

  return (
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
        <div className="flex flex-row flex-wrap">
          {users.length ? (
            users.map((user, index) => (
              <TagItem
                key={`menu-${user.id}-${index}`}
                onClick={() => onRemove(user.id)}
              >
                {user.name}
              </TagItem>
            ))
          ) : (
            <span>선택한 회원이 없습니다</span>
          )}
        </div>
      </div>
    </div>
  );
};

const TagArea = () => {
  const tags = useTagValue();
  const { removeTag } = useTagAction();

  const onRemove = (tag: string) => {
    removeTag(tag);
  };

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
                onClick={() => onRemove(tag)}
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
      <UserArea />
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

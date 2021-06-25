import React, { useCallback, useEffect, useRef, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

import { useUserTagKeywordSearchQuery } from "../../api/user/user.hook";
import { useUserAction, useUserValue } from "../../atoms/userState";

import DropdownTagItem from "../ui/DropdownTagItem";
import TagItem from "../ui/TagItem";

interface UserTagContainerProps {
  label: string;
  placeholder: string;
}
const UserTagContainer: React.FC<UserTagContainerProps> = ({
  label,
  placeholder,
}) => {
  const userTags = useUserValue();
  const { removeUser } = useUserAction();
  const [keyword, setKeyword] = useState("");
  const { data } = useUserTagKeywordSearchQuery(keyword);
  const editableDiv = useRef<HTMLDivElement>(null);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }, []);

  const onRemove = (tagId: number) => removeUser(tagId);

  const onClose = () => setKeyword("");

  useEffect(() => {
    if (editableDiv.current) {
      if (keyword === "") {
        editableDiv.current.innerText = keyword;
      }
    }
  }, [keyword]);

  return (
    <OutsideClickHandler onOutsideClick={onClose}>
      <div className="p-4 mt-5 bg-white border rounded-lg">
        <h3 className="mb-1 text-sm font-bold text-gray-700">
          <span>{label}</span>
        </h3>
        <div className="relative">
          <div className="relative mb-2">
            <input
              type="text"
              id="dropdown-user-input"
              autoComplete="off"
              data-toggle="dropdown"
              className="w-full text-gray-800 bg-transparent placeholder-gray-500 focus:outline-none"
              value={keyword}
              placeholder={placeholder}
              onChange={onChange}
            />
            {data && data.length ? (
              <div className="absolute right-0 z-10 w-full h-auto overflow-hidden bg-white border rounded-lg shadow-lg top-100">
                {data.map((tag) => (
                  <DropdownTagItem
                    type="USER"
                    key={tag.id}
                    tag={tag}
                    onClose={onClose}
                  />
                ))}
              </div>
            ) : null}
          </div>
          <div className="flex flex-row flex-wrap">
            {userTags.length
              ? userTags.map((userTag) => (
                  <TagItem
                    key={`${userTag.name}-${userTag.id}`}
                    name={userTag.name}
                    onRemove={() => onRemove(userTag.id)}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default UserTagContainer;

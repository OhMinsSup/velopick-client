import React, { useCallback, useEffect, useRef, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

import { useTagKeywordSearchQuery } from "../../api/pick/pick.hook";
import { useTagAction, useTagValue } from "../../atoms/tagState";

import DropdownTagItem from "../ui/DropdownTagItem";
import TagItem from "../ui/TagItem";

interface TagContainerProps {
  label: string;
  placeholder: string;
}
const TagContainer: React.FC<TagContainerProps> = ({ label, placeholder }) => {
  const tags = useTagValue();
  const { removeTag, insertTag, changeTag } = useTagAction();
  const [keyword, setKeyword] = useState("");
  const { data } = useTagKeywordSearchQuery(keyword);
  const editableDiv = useRef<HTMLDivElement>(null);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }, []);

  const onKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && keyword === "") {
        changeTag(tags.slice(0, tags.length - 1));
        return;
      }

      const keys = [",", "Enter"];
      if (keys.includes(e.key) && tags.length < 5) {
        // 등록
        e.preventDefault();

        insertTag(keyword);
        setKeyword("");
      }
    },
    [tags, keyword],
  );

  const onRemove = (tag: string) => removeTag(tag);

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
              id="dropdown-tag-input"
              autoComplete="off"
              data-toggle="dropdown"
              className="w-full text-gray-800 bg-transparent placeholder-gray-500 focus:outline-none"
              value={keyword}
              placeholder={placeholder}
              onChange={onChange}
              onKeyPress={onKeyPress}
            />
            {data && data.length
              ? (
                <div
                  className="absolute right-0 z-10 w-full h-auto overflow-hidden bg-white border rounded-lg shadow-lg top-100"
                >
                  {data.map((tag) => (
                    <DropdownTagItem
                      type="TAG"
                      key={tag.id}
                      tag={tag}
                      onClose={onClose}
                    />
                  ))}
                </div>
              )
              : null}
          </div>
          <div className="flex flex-row flex-wrap">
            {tags.length
              ? tags.map((tag, i) => (
                <TagItem
                  key={`${tag}-${i}`}
                  name={tag}
                  onRemove={() => onRemove(tag)}
                />
              ))
              : null}
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default TagContainer;

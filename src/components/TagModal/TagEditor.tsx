import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

import { useTagAction, useTagValue } from "../../atoms/tagState";

import palette from "../../libs/style/palette";
import { mediaQuery } from "../../libs/style/media";
import { intervalCall } from "../../libs/utils";
import { css } from "@emotion/react";

const intervalCall1000 = intervalCall(1000);

const SearchTagItem = () => {
  return (
    <div className="text-sm">
      <div className="flex justify-start cursor-pointer text-gray-700 hover:text-amber-400 hover:bg-amber-100 rounded-md px-2 py-2 my-2">
        <span className="bg-amber-400 h-2 w-2 m-2 rounded-full"></span>
        <div className="flex-grow font-medium px-2">Tighten Co.</div>
      </div>
    </div>
  );
};

interface TagEditorProps {
  ref?: React.RefObject<HTMLDivElement>;
}

export const TagItem: React.FC<{
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ onClick, children }) => {
  return <Tag onClick={onClick}>{children}</Tag>;
};

const TagEditor: React.FC<TagEditorProps> = () => {
  const tags = useTagValue();
  const { removeTag, insertTag, changeTag } = useTagAction();

  const [value, setValue] = useState("");

  const editableDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editableDiv.current) {
      if (value === "") {
        editableDiv.current.innerText = value;
      }
    }
  }, [value]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && value === "") {
        changeTag(tags.slice(0, tags.length - 1));
        return;
      }

      const keys = [",", "Enter"];
      if (keys.includes(e.key) && tags.length < 5) {
        // 등록
        e.preventDefault();

        intervalCall1000(() => {
          insertTag(value);
          setValue("");
        });
      }
    },
    [tags, value]
  );

  const onRemove = (tag: string) => removeTag(tag);

  return (
    <TagEditorBlock className="space-y-3">
      <input
        type="text"
        className="w-full input-text small focus:outline-none text-black placeholder-gray-500"
        placeholder="태그를 입력하세요"
        aria-label="Tag"
        tabIndex={2}
        value={value}
        onChange={onChangeInput}
        onKeyPress={onKeyPress}
      />
      <div>
        {tags.map((tag) => (
          <TagItem key={tag} onClick={() => onRemove(tag)}>
            {tag}
          </TagItem>
        ))}
      </div>
      <div className="w-full" css={resultStyles}>
        {Array.from({ length: 30 }).map((value, index) => (
          <SearchTagItem key={index} />
        ))}
      </div>
    </TagEditorBlock>
  );
};

export default TagEditor;

const resultStyles = css`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

export const TagEditorBlock = styled.div`
  color: ${palette.blueGray800};
  font-size: 1.125rem;
  display: flex;
  flex-wrap: wrap;
  [contenteditable="true"]:empty:before {
    content: attr(placeholder);
    display: block; /* For Firefox */
    color: ${palette.blueGray500};
  }
`;

const Tag = styled.div`
  color: ${palette.blueGray900};
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  height: 2rem;
  border-radius: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border: 1px solid ${palette.amber300};
  color: ${palette.amber300};
  margin-right: 0.75rem;
  transition: ease-in 0.125s;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
  margin-bottom: 0.75rem;
  animation: popIn 0.125s forwards ease-in-out;
  ${mediaQuery(767)} {
    height: 1.5rem;
    font-size: 0.75rem;
    border-radius: 0.75rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

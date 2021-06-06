import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

import palette from "../../libs/style/palette";
import { mediaQuery } from "../../libs/style/media";
import { intervalCall } from "../../libs/utils";

const intervalCall1000 = intervalCall(1000);

interface TagEditorProps {
  ref?: React.RefObject<HTMLDivElement>;
  tags: string[];
  onChange: (tags: string[]) => void;
}

const TagItem: React.FC<{
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ onClick, children }) => {
  return <Tag onClick={onClick}>{children}</Tag>;
};

const TagEditor: React.FC<TagEditorProps> = ({
  tags: initialTags,
  onChange,
}) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);

  const ignore = useRef(false);
  const editableDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tags.length === 0) return;
    onChange(tags);
  }, [tags, onChange]);

  useEffect(() => {
    setTags(initialTags);
  }, [initialTags]);

  useEffect(() => {
    if (editableDiv.current) {
      if (value === "") {
        editableDiv.current.innerText = value;
      }
    }
  }, [value]);

  const insertTag = useCallback(
    (tag: string) => {
      ignore.current = true;
      setValue("");
      if (tag === "" || tags.includes(tag)) return;
      let processed = tag;
      processed = tag.trim();
      if (processed.indexOf(" #") > 0) {
        const tempTags: string[] = [];
        const regex = /#(\S+)/g;
        let execArray: RegExpExecArray | null = null;
        while ((execArray = regex.exec(processed))) {
          if (execArray !== null) {
            tempTags.push(execArray[1]);
          }
        }
        setTags([...tags, ...tempTags]);
        return;
      }
      if (processed.charAt(0) === "#") {
        processed = processed.slice(1, processed.length);
      }
      setTags([...tags, processed]);
    },
    [tags]
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && value === "") {
        setTags(tags.slice(0, tags.length - 1));
        return;
      }
      const keys = [",", "Enter"];
      if (keys.includes(e.key)) {
        // 등록
        e.preventDefault();
        intervalCall1000(() => {
          insertTag(value);
        });
      }
    },
    [tags, value]
  );

  const onRemove = (tag: string) => {
    const nextTags = tags.filter((t) => t !== tag);
    setTags(nextTags);
  };

  return (
    <TagEditorBlock>
      {tags.map((tag) => (
        <TagItem key={tag} onClick={() => onRemove(tag)}>
          {tag}
        </TagItem>
      ))}
      <StyledInput
        placeholder="태그를 입력하세요"
        tabIndex={2}
        value={value}
        onChange={onChangeInput}
        onKeyDown={onKeyDown}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </TagEditorBlock>
  );
};

export default TagEditor;

const TagEditorBlock = styled.div`
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

const StyledInput = styled.input`
  display: inline-flex;
  outline: none;
  cursor: text;
  font-size: 1.125rem;
  line-height: 2rem;
  ${mediaQuery(767)} {
    line-height: 1.5rem;
    font-size: 0.75rem;
  }
  margin-bottom: 0.75rem;
  min-width: 8rem;
  border: none;
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

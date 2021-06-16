import React, { useCallback, useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";

import { TagEditorBlock, TagItem } from "../TagModal/TagEditor";
import { useUserAction, useUserValue } from "../../atoms/userState";
import { intervalCall } from "../../libs/utils";

const intervalCall1000 = intervalCall(1000);

const SearchUserItem = () => {
  return (
    <div className="text-sm">
      <div className="flex justify-start cursor-pointer text-gray-700 hover:text-amber-400 hover:bg-amber-100 rounded-md px-2 py-2 my-2">
        <img
          src="https://pantazisoft.com/img/avatar-2.jpeg"
          className="rounded-full h-6 shadow-md inline-block mr-2"
          alt=""
        />
        <div className="flex-grow font-medium px-2">Tighten Co.</div>
      </div>
    </div>
  );
};

interface UserEditorProps {}
const UserEditor: React.FC<UserEditorProps> = () => {
  const users = useUserValue();
  const { removeUser, insertUser, changeUser } = useUserAction();
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
        changeUser(users.slice(0, users.length - 1));
        return;
      }

      const keys = [",", "Enter"];
      if (keys.includes(e.key) && users.length < 5) {
        // 등록
        e.preventDefault();

        intervalCall1000(() => {
          insertUser({
            id: Date.now() + 1,
            name: "test",
            thumbnail: "https://pantazisoft.com/img/avatar-2.jpeg",
          });
          setValue("");
        });
      }
    },
    [users, value]
  );

  const onRemove = (tagId: number) => removeUser(tagId);

  return (
    <TagEditorBlock className="space-y-3">
      <input
        type="text"
        className="w-full input-text small focus:outline-none text-black placeholder-gray-500"
        placeholder="회원을 입력하세요"
        aria-label="User"
        tabIndex={2}
        value={value}
        onChange={onChangeInput}
        onKeyPress={onKeyPress}
      />
      <div>
        {users.map((user) => (
          <TagItem key={user.id} onClick={() => onRemove(user.id)}>
            {user.name}
          </TagItem>
        ))}
      </div>
      <div className="w-full" css={resultStyles}>
        {Array.from({ length: 30 }).map((value, index) => (
          <SearchUserItem key={index} />
        ))}
      </div>
    </TagEditorBlock>
  );
};

export default UserEditor;

const resultStyles = css`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  height: 23rem;
`;

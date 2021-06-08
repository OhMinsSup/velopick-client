import { css } from "@emotion/react";
import React, { useState } from "react";
import { TagEditorBlock } from "../TagModal/TagEditor";

interface UserEditorProps {}
const UserEditor: React.FC<UserEditorProps> = () => {
  const [value, setValue] = useState("");

  return (
    <TagEditorBlock>
      <input
        type="text"
        className="w-full input-text small focus:outline-none text-black placeholder-gray-500"
        placeholder="친구를 입력하세요"
        aria-label="User"
        tabIndex={2}
        value={value}
      />
      <div className="w-full overflow-y-auto" css={resultStyles}>
        {Array.from({ length: 30 }).map((value, index) => (
          <div className="text-sm" key={index}>
            <div className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
              <img
                src="https://pantazisoft.com/img/avatar-2.jpeg"
                className="rounded-full h-6 shadow-md inline-block mr-2"
                alt=""
              />
              <div className="flex-grow font-medium px-2">Tighten Co.</div>
            </div>
          </div>
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

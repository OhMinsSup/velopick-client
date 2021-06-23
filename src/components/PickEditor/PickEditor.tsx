import React, { useCallback, useState } from "react";
import { BiWorld, BiLock } from "react-icons/bi";
import { css } from "@emotion/react";

import IconButton from "../common/IconButton";
import useInputs from "../../hooks/useInputs";
import { useTagValue } from "../../atoms/tagState";
import { useUserValue } from "../../atoms/userState";

interface PickEditorProps { }
const PickEditor: React.FC<PickEditorProps> = () => {
  const tags = useTagValue();
  const users = useUserValue();

  const [published, setPublished] = useState(true);

  const [form, onChange] = useInputs({
    title: "",
    slug: "",
    description: "",
  });

  const onClickPrivate = useCallback(() => {
    setPublished(false);
  }, []);

  const onClickPublic = useCallback(() => {
    setPublished(true);
  }, []);

  return (
    <div>
      <div className="mb-6">
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-semibold text-brand-grey-900 dark:text-brand-grey-300"
        >
          타이틀
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={form.title}
          className="input-text"
          autoComplete="off"
          placeholder="타이틀"
          onChange={onChange}
        />
      </div>

      <div className="flex flex-col items-start w-full mb-6 md:w-1/2 md:pr-4">
        <label
          htmlFor="slugField"
          className="block mb-2 text-sm font-semibold text-brand-grey-900 dark:text-brand-grey-300"
        >
          URL 설정
        </label>
        <small className="block mb-2 -mt-2 text-brand-grey-700 dark:text-brand-grey-400">
          예시: test-123 소문자 영숫자 및 "-"만 허용됩니다. 도메인 이름이 아닌
          경로만 포함하십시오.
        </small>
        <input
          type="text"
          className="input-text"
          id="slug"
          name="slug"
          placeholder="URL"
          value={form.slug}
          onChange={onChange}
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-semibold text-brand-grey-900 dark:text-brand-grey-300"
        >
          설명
        </label>
        <textarea
          id="description"
          name="description"
          className="input-text min-h-16"
          placeholder="너의 픽을 설명해주세요..."
          value={form.description}
          css={textareaStyles}
          onChange={onChange}
        ></textarea>
      </div>
      <div className="mb-12 flex space-x-2">
        <IconButton
          icon={<BiWorld />}
          active={published}
          description="전체 공개"
          onClick={onClickPublic}
        />
        <IconButton
          icon={<BiLock />}
          active={!published}
          description="비공개"
          onClick={onClickPrivate}
        />
      </div>
      <div className="mb-12 flex space-x-2">
        <IconButton active={false} description="등록하기" onClick={() => { }} />
      </div>
    </div>
  );
};

export default PickEditor;

const textareaStyles = css`
  height: 154px;
  margin-top: 0px;
  margin-bottom: 0px;
`;

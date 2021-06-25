import React, { useCallback } from "react";

import { TagModel } from "../../api/pick/pick.typedef";
import { useTagAction } from "../../atoms/tagState";
import { useUserAction } from "../../atoms/userState";

import Image from "./Image";

export type TagType = "TAG" | "USER";

interface DropdownTagItemProps {
  type: TagType;
  tag: TagModel;
  onClose: () => void;
}
const DropdownTagItem: React.FC<DropdownTagItemProps> = ({
  type,
  tag,
  onClose,
}) => {
  const { insertTag } = useTagAction();
  const { insertUser } = useUserAction();

  const onClick = useCallback(() => {
    switch (type) {
      case "TAG":
        insertTag(tag.name);
        break;
      case "USER":
        insertUser(tag);
        break;
      default:
        break;
    }

    onClose();
  }, []);

  return (
    <div
      className="flex flex-row w-full px-4 py-2 border-b hover:bg-gray-100 text-black cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col flex-1 min-w-0">
        <span className="block mb-px font-semibold truncate">{tag.name}</span>
        {tag.count ? (
          <span className="text-sm text-brand-grey-500">
            {tag.count}개의 태그
          </span>
        ) : null}
      </div>
      {tag.image && (
        <div className="block w-10 h-10 overflow-hidden rounded bg-brand-grey-100">
          <Image
            className="block w-full"
            src={tag.image}
            alt="dropdown tag item"
          />
        </div>
      )}
    </div>
  );
};

export default DropdownTagItem;

import React from "react";
import { BiX } from "react-icons/bi";

interface TagItemProps {
  name: string;
  onRemove: () => void;
}
const TagItem: React.FC<TagItemProps> = ({ name, onRemove }) => {
  return (
    <div className="flex flex-row items-center mb-2 mr-2 button-primary small">
      <button className="mr-2">
        <span>{name}</span>
      </button>
      <button type="button" className="w-4 h-4 fill-current" onClick={onRemove}>
        <BiX className="w-full h-full" />
      </button>
    </div>
  );
};

export default TagItem;

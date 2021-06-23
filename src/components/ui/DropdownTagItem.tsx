import React from "react";
import { Link } from "react-router-dom";

const DropdownTagItem = () => {
  return (
    <Link
      to="/"
      className="flex flex-row w-full px-4 py-2 border-b hover:bg-gray-100 text-black"
      href="#"
      data-index="0"
    >
      <div className="flex flex-col flex-1 min-w-0">
        <span className="block mb-px font-semibold truncate">AWS</span>
        <span className="text-sm text-brand-grey-500">1.8K posts</span>
      </div>
      <div className="block w-10 h-10 overflow-hidden rounded bg-brand-grey-100">
        <img
          className="block w-full"
          src="https://cdn.hashnode.com/res/hashnode/image/upload/vmrnzobr1lonnigttn3c/1450468151.png?w=40&amp;h=40&amp;fit=crop&amp;crop=entropy&amp;auto=compress"
          alt="dropdown tag item"
        />
      </div>
    </Link>
  );
};

export default DropdownTagItem;

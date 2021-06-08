import React from "react";

interface PickMenuProps {}
const PickMenu: React.FC<PickMenuProps> = () => {
  return (
    <div className="">
      <div className="p-4 mt-5 bg-white border rounded-lg dark:bg-brand-dark-grey-800 dark:border-brand-grey-800">
        <h3 className="mb-1 text-sm font-bold text-brand-grey-700 dark:text-brand-grey-400">
          <span>Select tags</span>
        </h3>
        <div className="relative">
          <div className="relative mb-2">
            <input
              type="text"
              id="dropdown-input"
              autoComplete="off"
              data-toggle="dropdown"
              className="w-full text-gray-800 bg-transparent dark:text-white placeholder-brand-grey-500 focus:outline-none"
              placeholder="Start typing to search…"
            />
            <div
              className="absolute right-0 z-10 w-full h-auto overflow-hidden bg-white border rounded-lg shadow-lg dark:border-brand-grey-800 top-100 dark:bg-brand-dark-grey-900"
              style={{ display: "none" }}
            ></div>
          </div>
          <div className="flex flex-row flex-wrap"></div>
        </div>
      </div>
      {/*  */}
      <div className="p-4 mt-5 bg-white border rounded-lg dark:bg-brand-dark-grey-800 dark:border-brand-grey-800">
        <h3 className="mb-1 text-sm font-bold text-brand-grey-700 dark:text-brand-grey-400">
          <span>Select Users</span>
        </h3>
        <div className="relative">
          <div className="relative mb-2">
            <input
              type="text"
              id="dropdown-input"
              autoComplete="off"
              data-toggle="dropdown"
              className="w-full text-gray-800 bg-transparent dark:text-white placeholder-brand-grey-500 focus:outline-none"
              placeholder="Start typing to search…"
            />
            <div
              className="absolute right-0 z-10 w-full h-auto overflow-hidden bg-white border rounded-lg shadow-lg dark:border-brand-grey-800 top-100 dark:bg-brand-dark-grey-900"
              style={{ display: "none" }}
            ></div>
          </div>
          <div className="flex flex-row flex-wrap"></div>
        </div>
      </div>
    </div>
  );
};

export default PickMenu;

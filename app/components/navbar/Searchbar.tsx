"use client";

import { BiSearch } from "react-icons/bi";

const Searchbar = () => {
  return (
    <div className="w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md cursor-pointer transition border-[1px] xl:ml-40 ml-0">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold px-6">Anywhere</div>
        <div className="text-sm font-semibold px-6 hidden sm:block border-x-[1px]">
          Any week
        </div>
        <div className="text-sm text-gray-600 flex items-center pl-6 pr-2 gap-3">
          <div className="hidden sm:block">Add guests</div>
          <div className="p-2 rounded-full text-white bg-rose-500">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;

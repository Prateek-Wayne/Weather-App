import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

const SearchBar = (props: Props) => {
  return (
    <form onSubmit={props.onSubmit} className="flex ml-1 h-10">
      <input
        className=" py-2 w-full  border border-gray-300 rounded-l-md focus:outline-none text-sm  focus:border-blue-500 h-full"
        placeholder="Search location"
        value={props.value}
        onChange={props.onChange}
      />
      <button
        className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600  h-full"
        type="submit"
      >
        <IoSearchOutline className="text-2xl" />
      </button>
    </form>
  );
};

export default SearchBar;


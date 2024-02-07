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
    <form onSubmit={props.onSubmit} className="ml-1 flex">
      <input
        className="border-gray-500 bg-slate-200 h-8 rounded-l-md px-5 text-2xl"
        placeholder="Search location"
        value={props.value}
        onChange={props.onChange}
      />
      <button
        className=" border-gray-500 rounded-r-md bg-blue-300"
        type="submit"
      >
        <IoSearchOutline className="text-3xl" />
      </button>
    </form>
  );
};

export default SearchBar;

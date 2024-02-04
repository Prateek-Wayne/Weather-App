import React from "react";
import { MdSunny } from "react-icons/md";
import { TiLocationArrow } from "react-icons/ti";
import { ImLocation2 } from "react-icons/im";
import SearchBar from "./SearchBar";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="shadow-sm  sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px]     w-full    flex   justify-between items-center  max-w-7xl px-3 mx-auto">
        <p className="flex items-center justify-center gap-2  ">
          <h2 className="text-gray-500 text-3xl">Weather</h2>
          <MdSunny className="text-3xl text-yellow-300 " />
        </p>
        <section className="flex gap-1 items-center ">
        <TiLocationArrow  title="Your Current Location" className="text-4xl hover:cursor-pointer text-pink-300" />

        <ImLocation2    className="text-2xl text-pink-300"  />
        <p className="text-2xl text-gray-500" >India</p>
        <SearchBar/>


        </section>
      </div>
    </nav>
  );
};

export default Navbar;

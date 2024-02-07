import React, { useState } from "react";
import { MdSunny } from "react-icons/md";
import { TiLocationArrow } from "react-icons/ti";
import { ImLocation2 } from "react-icons/im";
import SearchBar from "./SearchBar";
import axios from "axios";

type Props = {};

const Navbar = (props: Props) => {
  // I will use this city to give in a jotai state then pass to main function
  const [city, setCity] = useState<string>("");
  const [error,setError]=useState("");
  const [suggestion, setSuggestion] = useState<string[]>([]);
  const [showSuggestion,setShowSuggestion]=useState<boolean>(false);

  const handleChange = async (e: string) => {
    setCity(e);
    let cityArray: string[] = [];
    if(e.length>2)
    {
      try {
        const respone = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${e}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
        );
        respone?.data?.list.map((i: any) => {
          cityArray.push(i.name);
        });
        if (cityArray.length > 0) {
          setSuggestion(cityArray);
          setShowSuggestion(true);
          setError("");
        }
      } catch (error) {
        setShowSuggestion(false);
        setSuggestion([]);
      }
    }
    else{
      setShowSuggestion(false);
      setError("location not Found");
    }
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("Submit clicked");
  };

  const handleSuggestionBoxClick=(list:string)=>{
      setCity(list);
      setShowSuggestion(false);
  }

  return (
    <nav className="shadow-sm  sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px]     w-full    flex   justify-between items-center  max-w-7xl px-3 mx-auto">
        <p className="flex items-center justify-center gap-2  ">
          <h2 className="text-gray-500 text-3xl">Weather</h2>
          <MdSunny className="text-3xl text-yellow-300 " />
        </p>
        <section className="flex gap-1 items-center ">
          <TiLocationArrow
            title="Your Current Location"
            className="text-4xl hover:cursor-pointer text-pink-300"
          />

          <ImLocation2 className="text-2xl text-pink-300" />
          <p className="text-2xl text-gray-500">India</p>
          <SearchBar
            value={city}
            onChange={(e) => {
              handleChange(e.target.value);
            }}
            onSubmit={handleSubmit}
          />
            <SuggetionBox showSuggestions={showSuggestion} suggestions={suggestion} error={error} handleSuggestionBoxClick={handleSuggestionBoxClick} />
        </section>
      </div>
    </nav>
  );
};


function SuggetionBox({
  showSuggestions,
  suggestions,
  handleSuggestionBoxClick,
  error
}: {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionBoxClick: (item: string) => void;
  error: string;
}) {
  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className="mb-4 bg-white absolute border top-[60px] right-22 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2 ">
          {error && suggestions.length < 1 && (
            <li className="text-red-500 p-1 "> {error}</li>
          )}
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionBoxClick(item)}
              className="cursor-pointer p-1 rounded   hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Navbar;

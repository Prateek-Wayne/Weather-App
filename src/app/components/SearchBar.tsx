import React from 'react'
import { IoSearchOutline } from "react-icons/io5";

type Props = {}

const SearchBar = (props: Props) => {
  return (
    <div className='ml-1 flex'>
        <input className='border-gray-500 bg-slate-200 h-8 rounded-l-md px-5 text-2xl' placeholder='Search location' />
        <button className=' border-gray-500 rounded-r-md bg-blue-300' >
            <IoSearchOutline className='text-3xl'  />
        </button>
    </div>
  )
}

export default SearchBar
import React, { useContext, useState } from "react";
import { PokemonContext } from "../contexts/PokemonContext";

const Search = () => {
  const { setSearch, search, handleSelectFiler } = useContext(PokemonContext);

  return (
    <div className="flex justify-center w-full text-black mt-20 p-4 fixed z-10 bg-white">
      <div className="flex justify-center items-center gap-10 bg-yellow-100 w-[80%] h-[8rem] rounded-md">
        <div className="flex justify-center w-[60%]">
          <span className="flex justify-center items-center p-2 bg-yellow-300 rounded-s-md text-black">
            Search
          </span>
          <input
            type="text"
            className="bg-white p-3 outline-none rounded-e-md w-full"
            placeholder="Name pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;

import CardPokemon from "./CardPokemon";
import React, { useContext } from "react";
import { PokemonContext } from "../../../contexts/PokemonContext";
import { useLocation } from "react-router-dom";
import Navbar from "../../Navbar";

const SearchPokemon = () => {
  const location = useLocation();
  const { globalPokemons } = useContext(PokemonContext);
  const filteredPokemons = globalPokemons.filter((pokemon) =>
    pokemon.name.includes(location.state.toLowerCase())
  );
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <div className="flex w-full justify-center">
        <div className="flex flex-wrap gap-2 w-[90%] mt-32">
          {filteredPokemons.map((pokemon) => (
            <CardPokemon pokemon={pokemon} key={pokemon.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPokemon;

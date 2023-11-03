import React, { useContext } from "react";
import { PokemonContext } from "../../../contexts/PokemonContext";
import { UserContext } from "../../../contexts/UserContext";
import { DotSpinner, DotPulse } from "@uiball/loaders";
import CardPokemon from "./CardPokemon";

const ListPokemon = () => {
  const { allPokemons, onClickLoadMore, loading, submitPokemonList, openDot } = useContext(PokemonContext);
  const { idUser } = useContext(UserContext);
  
  return (
    <div className="flex justify-center p-3 mt-32">
      <div className="flex flex-col items-center justify-center w-[90%]">
        {loading ? (
          <div className="flex justify-center items-center mt-32">
            <DotSpinner size={40} speed={0.9} color="black" />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="list flex justify-start flex-wrap gap-2">
              {allPokemons.map((data) => (
                <CardPokemon pokemon={data} key={data.id} submitPokemonList={submitPokemonList} idUser={idUser}/>
              ))}
            </div>
            {!openDot ?
                        <button
                        className="p-1 mt-4 mb-28 w-[8rem] bg-white border border-opacity-100 text-black rounded-[1rem]"
                        onClick={onClickLoadMore}
                      >
                        Show more
                      </button>

                      :
                      <DotPulse size={40} speed={0.9} color="black" />
          }

          </div>
        )}
      </div>
    </div>
  );
};

export default ListPokemon;

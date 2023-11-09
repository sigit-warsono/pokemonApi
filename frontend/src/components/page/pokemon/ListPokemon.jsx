import React, { useContext } from "react";
import { PokemonContext } from "../../../contexts/PokemonContext";
import { UserContext } from "../../../contexts/UserContext";
import { DotSpinner, DotPulse } from "@uiball/loaders";
import CardPokemon from "./CardPokemon";
import ReactPaginate from 'react-paginate';


const ListPokemon = () => {
  const { perPage, dataPokemons, onClickLoadMore, loading, submitPokemonList } = useContext(PokemonContext);
  const { idUser } = useContext(UserContext);
  
  return (
    <div className="flex justify-center p-3 mt-64">
      <div className="flex flex-col items-center justify-center w-[90%]">
        {loading ? (
          <div className="flex justify-center items-center mt-32">
            <DotSpinner size={40} speed={0.9} color="black" />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="list flex justify-start flex-wrap gap-2">
              {dataPokemons.map((data) => (
                <CardPokemon pokemon={data} key={data.id} submitPokemonList={submitPokemonList} idUser={idUser}/>
              ))}
            </div>
      
      <ReactPaginate
        previousLabel={"← Prev"}
        nextLabel={"Next →"}
        breakLabel="..."
        containerClassName="flex gap-5 justify-center items-center p-2 mt-4 mb-10 text-yellow-400"
        pageCount={perPage}
        onPageChange={onClickLoadMore}
        previousLinkClassName={"w-[5rem]"}
        nextLinkClassName={"w-[5rem]"}
        disabledClassName={"p-2 text-slate-300 text-slate-200"}
        activeClassName={"border border-yellow-200 p-3 rounded-[50%] bg-yellow-400 text-white w-[3rem] text-center"}
      />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListPokemon;

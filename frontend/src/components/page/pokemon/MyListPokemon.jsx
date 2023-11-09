import React, { useContext } from "react";
import Navbar from "../../Navbar";
import { PokemonContext } from "../../../contexts/PokemonContext";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { PiListDashesFill } from 'react-icons/pi';


const MyListPokemon = () => {
  const { myPokemon, changePage, pages, rows, searchDataMyPoke, query, setQuery, deletePokeMylist } =
    useContext(PokemonContext);
    console.log(pages)
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full mt-[10rem]">
        <div className="search flex justify-between w-[80%] mb-3">
            <div className="flex items-center gap-1"><PiListDashesFill /> <span>My list pokemon</span></div>
          <form className="flex items-center" onSubmit={searchDataMyPoke}>
            <input
              type="text"
              className="p-2 bg-slate-200"
              placeholder="Search name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="p-[0.6rem] bg-yellow-300 text-black text-[0.9rem]">
              Search
            </button>
          </form>
        </div>
        <table class="w-[80%] table-fixed border-collapse border border-slate-400">
          <thead>
            <tr>
              <th className="border border-slate-300 w-[7rem]">Id Pokemon</th>
              <th className="border border-slate-300">Image</th>
              <th className="border border-slate-300">Name</th>
              <th className="border border-slate-300">Information</th>
            </tr>
          </thead>
          <tbody>
            
            {
            myPokemon.length > 0 ?
            myPokemon.map((poke, index) => (
              <tr key={poke.id}>
                <td className="border border-slate-300 text-center">
                  {poke.idPokemon}
                </td>
                <td className="border text-center flex justify-center">
                  <img src={poke.image} alt="" className="w-[5rem] h-[5rem]" />
                </td>
                <td className="border border-slate-300 text-center">
                  {poke.name}
                </td>
                <td className="border border-slate-300 text-center">
                  <button
                    className="p-2 bg-yellow-300 text-[#514F4E] text-[0.8rem] rounded-[1rem] cursor-pointer"
                    onClick={() =>
                      navigate(`/pokemon-detail-my-list/${poke.idPokemon}`)
                    }
                  >
                    More Detail
                  </button>
                  &nbsp;
                  <button
                    className="p-2 bg-red-300 text-[#514F4E] text-[0.8rem] rounded-[1rem] cursor-pointer"
                    onClick={() =>
                      deletePokeMylist(poke.id)
                    }
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
            :
            <tr>
                <td>Data not found</td>
            </tr>
        }
          </tbody>
        </table>
        {myPokemon.length > 0 ?
        <nav
          className="pagination is-centered flex"
          key={rows}
          role="navigation"
          aria-label="Pagination"
        >
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={changePage}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </nav>
        :
        <div className="clas"></div>
}
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default MyListPokemon;

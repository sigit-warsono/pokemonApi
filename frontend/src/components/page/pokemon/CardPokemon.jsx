import { useNavigate } from "react-router-dom";
import { RiPlayListAddFill } from "react-icons/ri";

const CardPokemon = ({ pokemon, submitPokemonList, idUser }) => {
  const navigate = useNavigate();

  const namePoke = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  return (
    <div
      className="card bg-slate-100 w-[15rem] h-[15rem] flex flex-col justify-start gap-2 items-center rounded-[10%] p-4"
      key={pokemon.id}
    >
      {!idUser ? (
        <div className="flex justify-start items-center w-full">
          <span>#{pokemon.id}</span>
        </div>
      ) : (
        <div className="flex justify-between items-center w-full">
          <span>#{pokemon.id}</span>
          <span className="cursor-pointer tooltip" data-tip="Add my list">
            <RiPlayListAddFill
              onClick={() => submitPokemonList(pokemon.id, idUser)}
            />
          </span>
        </div>
      )}

      <img
        src={pokemon.sprites.other.dream_world.front_default}
        alt=""
        className="w-[5rem] h-[5rem]"
      />
      <span className="text-[1rem]">{namePoke}</span>
      <div className="flex gap-1">
        <button
          className="p-2 bg-yellow-300 text-[#514F4E] text-[0.8rem] rounded-[1rem] cursor-pointer"
          onClick={() => navigate(`/pokemon-detail/${pokemon.id}`)}
        >
          More Detail
        </button>
      </div>
    </div>
  );
};

export default CardPokemon;

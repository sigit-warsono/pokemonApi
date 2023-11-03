import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Navbar";
import { DotSpinner } from "@uiball/loaders";
import { useNavigate, useParams } from "react-router-dom";
import { PokemonContext } from "../../../contexts/PokemonContext";
import CountUp from "react-countup";
import { IoArrowBackSharp } from "react-icons/io5";

const DetailPokemon = () => {
  const navigate = useNavigate();
  const { getPokemonByID } = useContext(PokemonContext);
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    fetchPokemon(id);
  }, []);

  const fetchPokemon = async (id) => {
    const data = await getPokemonByID(id);
    setPokemon(data);
    setLoading(false);
  };



  return (
    <div className="flex flex-col gap-5">
      <Navbar />
      <div className="flex w-full justify-center mt-32">
        <div className="flex w-[90%]">
        <IoArrowBackSharp className="text-[3rem] text-slate-300 cursor-pointer" onClick={()=> navigate("/")}/>
        </div>
          </div>
      {loading ? (
        <div className="flex justify-center items-center mt-32">
          <DotSpinner size={40} speed={0.9} color="black" />
        </div>
      ) : (
        <div className="detail h-auto flex mt-[10rem] justify-center">
         
          <div className="card w-[70%] bg-slate-200 rounded-[15rem] p-9 flex flex-col gap-4 justify-center items-center">
            <img
              src={pokemon.sprites.other.dream_world.front_default}
              alt=""
              className="w-[16rem] h-[15rem] rounded-[50%] -mt-[12rem] bg-black"
            />
            <div className="information">
              <span className="text-[2rem] text-[#514F4E]">{pokemon.name}</span>
            </div>
            <div className="flex justify-center gap-6">
              <div className="type flex flex-col items-center">
                <span className="text-[1.2rem] font-semibold">Type</span>
                <div className="flex gap-2">
                  {pokemon.types.map((type, index) => (
                    <span
                      key={type.type.name}
                      className="rounded-[1rem] text-center "
                    >
                      #{type.type.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="type flex flex-col items-center">
                <span className="text-[1.2rem] font-semibold">Weight </span>
                <div className="flex gap-2">
                  <span className="text-[1rem] text-[#514F4E]">
                    {pokemon.weight} Kg
                  </span>
                </div>
              </div>
              <div className="type flex flex-col items-center">
                <span className="text-[1.2rem] font-semibold">Height </span>
                <div className="flex gap-2">
                  <span className="text-[1rem] text-[#514F4E]">
                    {pokemon.height} Cm
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center w-full mt-11">
              <span className="text-[1.2rem] font-semibold ml-14">
                Statistic
              </span>
              <div className="flex gap-4">
                <div className="bound rounded-[50%] bg-yellow-200 p-5 w-[9rem] h-[9rem] flex justify-center">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-[2rem] text-[#514F4E]">
                      <CountUp end={pokemon.stats[1].base_stat} duration={5} />
                    </span>
                    <span className="text-[0.8rem]">Attack</span>
                  </div>
                </div>

                <div className="bound rounded-[50%] bg-yellow-200 p-5 w-[9rem] h-[9rem] flex justify-center">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-[2rem] text-[#514F4E]">
                      <CountUp end={pokemon.stats[2].base_stat} duration={5} />
                    </span>
                    <span className="text-[0.8rem]">Defense</span>
                  </div>
                </div>

                <div className="bound rounded-[50%] bg-yellow-200 p-5 w-[9rem] h-[9rem] flex justify-center">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-[2rem] text-[#514F4E]">
                      <CountUp end={pokemon.stats[3].base_stat} duration={5} />
                    </span>
                    <span className="text-[0.8rem]">Special attack</span>
                  </div>
                </div>

                <div className="bound rounded-[50%] bg-yellow-200 p-5 w-[9rem] h-[9rem] flex justify-center">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-[2rem] text-[#514F4E]">
                      <CountUp end={pokemon.stats[5].base_stat} duration={5} />
                    </span>
                    <span className="text-[0.8rem]">Speed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPokemon;

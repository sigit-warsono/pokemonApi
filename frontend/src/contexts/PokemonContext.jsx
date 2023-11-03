import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [globalPokemons, setGlobalPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const Swal = require("sweetalert2");
  const [openDot, setOpenDot] = useState(false);
  const { idUser } = useContext(UserContext);
  const [myPokemon, setMyPokemon] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");

  //ßßconsole.log(idUser);

  useEffect(() => {
    getAllPokemons();
  }, [offset]);

  useEffect(() => {
    getGlobalPokemons();
  }, []);

  useEffect(() => {
    getMyListPokemon();
  }, [idUser, page, keyword]);

  const getAllPokemons = async (limit = 20) => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL_API}pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await res.json();

    const promises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return data;
    });
    const results = await Promise.all(promises);

    setAllPokemons([...allPokemons, ...results]);
    setLoading(false);
  };

  const getGlobalPokemons = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL_API}pokemon?limit=100000&offset=0`
      );
      const data = await res.json();
      const promises = data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const data = await res.json();
        return data;
      });
      const results = await Promise.all(promises);
      setGlobalPokemons(results);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onClickLoadMore = () => {
    setOpenDot(true);
    setTimeout(() => {
      setOpenDot(false);
      setOffset(offset + 20);
    }, 3400);
  };

  const getPokemonByID = async (id) => {
    const baseURL = "https://pokeapi.co/api/v2/";
    const res = await fetch(`${baseURL}pokemon/${id}`);
    const data = await res.json();
    return data;
  };

  const submitPokemonList = async (id, idUs) => {
    const baseURL = "https://pokeapi.co/api/v2/";
    const res = await fetch(`${baseURL}pokemon/${id}`);
    const data = await res.json();
    try {
      await axios.post("http://localhost:8080/add-list-pokemon", {
        idPokemon: id,
        idUser: idUs,
        name: data.name,
        image: data.sprites.other.dream_world.front_default,
      });
      Swal.fire({
        title: "Success",
        text: "Add list my pokemon",
        icon: "success",
        timer: 1000,
      });
    } catch (error) {
      if (error.response) {
      }
    }
  };

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const getMyListPokemon = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/my-list-pokemon/${idUser}?search_query=${keyword}&page=${page}&limit=${limit}`
      );
      setMyPokemon(response.data.result);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);

      // console.log(response)
    } catch (error) {
      console.log(error.message);
    }
  };

  const searchDataMyPoke = (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  };

  return (
    <PokemonContext.Provider
      value={{
        allPokemons,
        globalPokemons,
        onClickLoadMore,
        loading,
        getPokemonByID,
        submitPokemonList,
        openDot,
        myPokemon,
        pages,
        changePage,
        rows,
        searchDataMyPoke,
        query,
        setQuery,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };

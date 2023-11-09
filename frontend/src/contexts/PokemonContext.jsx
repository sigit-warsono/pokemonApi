import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
  const [globalPokemons, setGlobalPokemons] = useState([]);
  const [dataPokemons, setDataPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const Swal = require("sweetalert2");
  const { idUser } = useContext(UserContext);
  const [myPokemon, setMyPokemon] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");



  useEffect(() => {
    getGlobalPokemons();
  }, []);

  useEffect(() => {
    getMyListPokemon();
  }, [idUser, page, keyword]);

  

  const resultPokemon = globalPokemons.filter((data)=>{
    return data.name.includes(search);
  });

  const totalRows = resultPokemon.length;
  const totalPerPage = totalRows / 25;
  const perPage = Math.ceil(totalPerPage);
  const totalCurrentPage = currentPage + 1;
  const limitPage = (totalRows * totalCurrentPage) / perPage;
  const offsetPage =(25 * totalCurrentPage) - 25;



  useEffect(()=>{
    setDataPokemons(resultPokemon.slice(offsetPage, limitPage))
  },[search, limitPage, offsetPage]);

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

  const onClickLoadMore = ({ selected : selectedPage }) => {
    setCurrentPage(selectedPage)
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
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
      });
      Swal.fire({
        title: "Success",
        text: "Add list my pokemon",
        icon: "success",
        confirmButtonColor: "#FFFF00",
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

    } catch (error) {
      console.log(error.message);
    }
  };

  const searchDataMyPoke = (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  };

  const deletePokeMylist = async (id)=>{
    try {
      await axios.delete(`http://localhost:8080/delete-my-list-pokemon/${id}`);
      getMyListPokemon();
      Swal.fire({
        title: "Remove success",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <PokemonContext.Provider
      value={{
        globalPokemons,
        onClickLoadMore,
        loading,
        getPokemonByID,
        submitPokemonList,
        myPokemon,
        pages,
        changePage,
        rows,
        searchDataMyPoke,
        query,
        setQuery,
        dataPokemons,
        search,
        setSearch,
        perPage,
        deletePokeMylist
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };

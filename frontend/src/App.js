import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/page/Home";
import Login from "./components/page/auth/Login";
import Register from "./components/page/auth/Register";
import DetailPokemon from "./components/page/pokemon/DetailPokemon";
import DetailPokemonMylist from "./components/page/pokemon/DetailPokemonMylist";
import MyListPokemon from "./components/page/pokemon/MyListPokemon";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pokemon-detail/:id" element={<DetailPokemon />} />
        <Route path="/pokemon-detail-my-list/:id" element={<DetailPokemonMylist />} />
        <Route path="/my-list-pokemon" element={<MyListPokemon />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

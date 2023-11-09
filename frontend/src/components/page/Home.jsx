import React from "react";
import Navbar from "../Navbar";
import ListPokemon from "./pokemon/ListPokemon";
import Search from "../Search";

const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Search />
      <ListPokemon />
    </div>
  );
};

export default Dashboard;

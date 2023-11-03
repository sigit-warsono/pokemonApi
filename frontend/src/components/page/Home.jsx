import React from "react";
import Navbar from "../Navbar";
import ListPokemon from "./pokemon/ListPokemon";

const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <ListPokemon />
    </div>
  );
};

export default Dashboard;

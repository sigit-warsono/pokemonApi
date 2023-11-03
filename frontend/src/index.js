import React from "react";
/* eslint-disable */ 
import ReactDOM from "react-dom/client";
import "./index.css";
import { PokemonProvider } from "./contexts/PokemonContext";
import { UserProvider } from "./contexts/UserContext";
import App from "./App";
import axios from "axios";
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <PokemonProvider>
      <App />
    </PokemonProvider>
  </UserProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const ListPokemon = db.define("listPokemon",{
    idPokemon: {
        type: DataTypes.STRING
    },
    idUser:{
        type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
  },
    image:{
        type: DataTypes.STRING
    },
},{
    freezeTableName: true
})

export default ListPokemon;
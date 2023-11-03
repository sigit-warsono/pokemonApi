import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Users = db.define("users",{
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
  },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName: true
})

export default Users;
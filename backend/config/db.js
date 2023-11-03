import {Sequelize} from "sequelize";

const db = new Sequelize("pokemon", "root", "",{
    host: "localhost",
    dialect: "mysql"
});

export default db;

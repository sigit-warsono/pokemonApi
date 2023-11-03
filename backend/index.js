import express from "express";
import db from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
// import Users from "./models/user.js";
import ListPokemon from "./models/myListPokemon.js";
import router from "./routes/index.js";


const app = express();
dotenv.config();

try {
    await db.authenticate();
    console.log("Database connected...");
    //await ListPokemon.sync();
} catch (error) {
    console.error(error);
}


app.use(cors({ credentials:true, origin:"http://localhost:3000"}));
app.use(cookieParser());
app.use(express.json());
app.use(router);

// db.databaseConf.sync();


app.listen(8080, ()=> console.log("server running http://localhost:8080"))
import express from "express";
import {HomeApi, Register, Login, Logout} from "../controllers/user.js"
import { freshToken } from "../controllers/refreshToken.js";
import { addLsitPokemon, MyLiskPokemon, Remove } from "../controllers/pokemon.js";

const router = express.Router();
router.get("/", HomeApi);
router.post("/register", Register);
router.post("/login", Login);
router.delete("/logout", Logout);
router.get("/token", freshToken);
router.post("/add-list-pokemon", addLsitPokemon);
router.get("/my-list-pokemon/:id", MyLiskPokemon);
router.delete("/delete-my-list-pokemon/:id", Remove);

export default router;
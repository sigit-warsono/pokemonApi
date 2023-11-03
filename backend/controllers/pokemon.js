import Pokemon from "../models/myListPokemon.js";
import {Op} from "sequelize";

export const addLsitPokemon = async(req, res)=>{
    const { idPokemon, idUser, name, image } = req.body;

     try {
        await Pokemon.create({
            idPokemon: idPokemon,
            idUser: idUser,
            name: name,
            image: image
        });
        res.json({ msg: "List pokemon berhasil ditambah"});
     } catch (error) {
        console.log(error);
     }
}

export const MyLiskPokemon =async(req, res)=>{

    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Pokemon.count({
        where:{
            [Op.and]: [{name:{
                [Op.like]: '%'+search+'%'
            }},{idUser: req.params.id}]
        }
    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Pokemon.findAll({
        where:{
            [Op.and]: [{name:{
                [Op.like]: '%'+search+'%'
            }}, {idUser: req.params.id}]
        },
        offset: offset,
        limit: limit,
        order:[
            ['id', 'DESC']
        ]
    });
    res.json({
        result: result,
        page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage
    });
}

import Users from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const HomeApi = (req, res) => {
    res.send("Welcome rest api");
  };

  export const Register = async(req, res)=>{
    const { firstName, lastName, email, password } = req.body;
     const salt = await bcrypt.genSalt();
     const hashPassword = await bcrypt.hash(password, salt);
     try {
        await Users.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashPassword
        });
        res.json({ msg: "Register Berhasil"});
     } catch (error) {
        console.log(error);
     }
}

export const Login = async(req, res)=> {
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        });

        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({ msg: "Wrong password"});
        const userId = user[0].id;
        const firstName = user[0].firstName;
        const email = user[0].email;
        const accessToken = jwt.sign({userId, firstName, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({userId, firstName, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });


        await Users.update({refresh_token: refreshToken},{
            where: {
                id: userId
            }
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: true
        })
        res.json({ accessToken });

    } catch (error) {
        res.status(404).json({msg:"Email tidak ditemukan"})
    }
}

export const Logout = async(req, res)=>{
    const refreshToken = req.cookies.refreshToken;
    console.log('Cookies: ', req.cookies.refreshToken)

        if(!refreshToken) return res.sendStatus(204);
        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        if(!user[0]) return res.sendStatus(204);

        const userId = user[0].id;
        await Users.update({refresh_token: null},{
            where: {
                id: userId
            }
        });
        res.clearCookie('refreshToken');
        return res.sendStatus(200);
}
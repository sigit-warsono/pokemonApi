import Users from "../models/user.js";
import jwt from "jsonwebtoken";

export const freshToken = async(req, res)=>{
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        if(!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded)=>{
            if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const firstName = user[0].firstName;
            console.log(firstName);
            const email = user[0].email;

            const accessToken = jwt.sign({userId, firstName, email},process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });
            res.json({ accessToken });
        })
    } catch (error) {
        console.log(error.message);
    }
}
import { Request , Response , NextFunction } from "express";
import  Jwt  from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export interface AuthRequest extends Request {
    user? : {id : number ; email : string}
};

export const verifyToken = (req : AuthRequest , res : Response , next : NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({message : `Access denied. No token provided.`})

    const token = authHeader.split(" ")[1] 
    try{
        const decoded = Jwt.verify(token , process.env.JWT_SECRET as string) as {id : number , email : string};
        req.user = decoded
        next()
    } catch(err){
        res.status(400).json({message : `Invalid token.`})
    }
}
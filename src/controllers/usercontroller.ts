import { Request , Response } from "express"; 
import bcrypt from 'bcrypt';
import  jwt  from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { registerSchema , loginSchema} from "../validators/userValidator";
import { createUser , getUserByEmail , User } from "../models/usermodel";

export const register = async (req : Request , res : Response) => {
    try{
        const {error} = registerSchema.validate(req.body)
        if (error) {
            return res.status(400).json({message : error.details[0].message })
        }

        const {fname , lname , email , password} = req.body

        const exsistingUser = await getUserByEmail(email);
        if (exsistingUser) {
            return res.status(400).json({message : `Email Already registered`})
        }

        const hashedPassword = await bcrypt.hash(password , 10) 

        await createUser({fname , lname , email , password: hashedPassword , created_at : new Date()})

        res.status(201).json({message : `User Registered successfully`}) 
    } catch (err) {
        console.error(err)
        res.status(500).json({message : `Server Error `})
    }
};

export const login = async (req : Request , res : Response) => {
    try{
        const {error} = loginSchema.validate(req.body)
        if (error) { 
            return res.status(400).json({message : error.details[0].message})
        }

        const {email , password} = req.body 

        const user = await getUserByEmail(email) 
        if (!user) return res.status(400).json({message :`Invalid email or password`}) ;

        const isMatch = await bcrypt.compare(password , user.password) 
        if (!isMatch) return res.status(400).json({message : `Invalid email or password`})

        const token = jwt.sign({ id : user.id , email: user.email} , process.env.JWT_SECRET as string , {expiresIn : "1d"})
        res.json({message : `Login successfully` 
            , token})
    } catch (err) {
        console.error(err) 
        res.status(500).json({message: `Server Error`})
    }
};


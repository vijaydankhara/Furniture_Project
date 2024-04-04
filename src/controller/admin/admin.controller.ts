import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import UserService from "../../services/user.service";

const userService = new UserService();

declare global {
    namespace Express {
        interface Request {
            admin?: any;
        }
    }
}

export const registerAdmin = async(req:Request, res:Response) => {
    try {
        let admin = await userService.addNewUser({ email: req.body.email });
        console.log(admin);
        if(admin){
            return res.status(400).json({ message: `Admin is Already Registerd...`});
        }
        let hashPassword = await bcrypt.hash(req.body.password, 10);
        // console.log(hashPassword);
        admin = await userService.addNewUser({
            ...req.body,
            password: hashPassword,
            isAdmin: true
        });
        res.status(201).json({admin: admin, message: `New Admin Is Added SuccesFully...`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${console.error()}`});
    } 
};

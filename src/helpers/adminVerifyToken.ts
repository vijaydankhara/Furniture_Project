import jwt from "jsonwebtoken";
import User from "../model/user_model";
import { Request, Response, NextFunction } from 'express';

// Import token 
import { token } from 'morgan';

declare global {
    namespace Express {
        interface Request {
            admin?: any;
        }
    }
}

// ADMIN VERIFY TOKEN
const adminVerifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers['authorization'];
        if (authorization === undefined) {
            return res.json({ message: `Invalid Authorization ${console.error()}` });
        }
        let token = authorization.split(" ")[1];
        if (token === undefined) {
            return res.status(401).json({ message: `Unauthorized ${console.error()}` });
        } else {
            let {adminId} = jwt.verify(token, 'Admin');
            let admin = await User.findById(adminId);
            if (admin) {
                req.admin = admin;
                next();
            } else {
                return res.status(401).json({ message: `Invalid Admin (token) ${console.error()}` });
            }
        }
    } catch (error) {
        console.log(error);
        res.json({ message: `Internal Server Error From Admin Token` });
    }
}

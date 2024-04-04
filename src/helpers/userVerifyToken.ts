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

// user VERIFY TOKEN
const userVerifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers['authorization'];
        if (authorization === undefined) {
            return res.json({ message: `Invalid Authorization ${console.error()}` });
        }
        let token = authorization.split(" ")[1];
        if (token === undefined) {
            return res.status(401).json({ message: `Unauthorized ${console.error()}` });
        } else {
            let {userId} = jwt.verify(token, 'User');
            let admin = await User.findById(userId);
            if (admin) {
                req.user = user;
                next();
            } else {
                return res.status(401).json({ message: `Invalid user (token) ${console.error()}` });
            }
        }
    } catch (error) {
        console.log(error);
        res.json({ message: `Internal Server Error From user Token` });
    }
}

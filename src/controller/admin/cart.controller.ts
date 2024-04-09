import { Request, Response } from 'express';
import CartServices from '../../services/cart.service'; 

const cartServices = new CartServices();
//  get All Carts
export const getAllCart = async (req: Request, res: Response) => {
    try {
        let carts = await cartServices.getAllCart(
            { admin: (req.admin as any)._id, isDelete: false }, // Provide both arguments
            (req.admin as any)._id  // Second argument (user) getAllCart in passed To 2 Argument
        );
        res.status(200).json(carts);
        console.log(carts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error.!!!!` });
    }
};

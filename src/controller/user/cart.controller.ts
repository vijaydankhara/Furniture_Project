import { Request, Response } from 'express';
import CartServices from '../../services/cart.service'; 

const cartServices = new CartServices();
declare global {
    namespace Express {
        interface Request {
            user?: object | undefined;
        }
    }
}

export const addToCart = async (req: Request, res: Response) => {
    try {
        let cart = await cartServices. getCart({
            user: (req.user as any)._id, 
            cartItem: req.body.cartItem,
            isDelete: false
        });
        if (cart) {
            return res.json({ message: "This Item Already In your Cart" });
        }
        cart = await cartServices.addToCart({
            user: (req.user as any)._id,
            ...req.body
        });
        return res.status(201).json({ cart, message: `New Item Is Added To The Cart......` });
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: `Internal Server Error... ${console.error()}`});
    }
};


//  get All Carts
export const getAllCarts = async (req: Request, res: Response) => {
    try {
        let carts = await cartServices.getAllCart(
            { user: (req.user as any)._id, isDelete: false }, // Provide both arguments
            (req.user as any)._id  // Second argument (user) getAllCart in passed To 2 Argument
        );
        res.status(200).json(carts);
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: `Internal Server Error... ${console.error()}`});    
    }
};


//  get Cart
export const getCart = async (req: Request, res: Response) => {
    try {
        let cart = await cartServices.getCartById({
            _id: req.query.cartId,
            isDelete: false
        });   
        if(!cart){
            return res.status(404).json({ message: `No Cart Found with this ID`});
        }
        res.status(200).json(cart);  
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: `Internal Server Error... ${console.error()}`});    
    }
};


//  Update Cart
// export const updateCart = async (req: Request, res: Response) => {
//     try {
//         let cart = await cartServices.getCart({_id: req.query.cartId , isDelete: false});
//         if (!cart) {
//             return res.status(404).json({ message: `No Cart Found with this ID`});
//         }
//         cart = await cartServices.updateCart(cart._id,{ ...req.body});
//         res.status(200).json({ cart, message: `Cart Item Updated SuccessFully.....`});
//     } catch (error) {
//         console.log(error);
//         res.status(401).json({ message: `Internal Server Error... ${console.error()}`});
//     }
// };


// Delete Cart
// export const deleteCart = async (req: Request, res: Response) => {
//     try {
//         let cart = await cartService.getCart({_id: req.query.cartId});
//         if(!cart){
//             return res.status(404).json({ message: `No Cart Found with this ID`});
//         }
//         cart = await cartService.updateCart(cart._id ,req.body ,{isDelete : true});
//         res.status(200).json({message:`Cart Deleted Successfully......`}); 
//     } catch (error) {
//         console.log(error);
//         res.status(401).json({ message: `Internal Server Error... ${console.error()}`});
//     }
// };

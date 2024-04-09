import OrderServices from "../../services/order.service";
import CartServices from "../../services/cart.service";
import { Request, Response } from "express";

const orderService = new OrderServices();
const cartService = new CartServices();

declare global {
    namespace Express {
        interface Request {
            user?: object;
        
        }
    }
}


export const addNewOrder = async (req: any, res: Response) => {
    try {

        let cartItems = await cartService.getAllCart(req.query, req.user);

        if (cartItems.length === 0) {
            return res.status(404).json({ message: `Cart Not Found....`});
        }
              // console.log(cartItems);
        let orderItems = cartItems.map((item: any) => ({
            cartItem: item.cartItem._id,
            quantity: item.quantity,
            price: item.cartItem.price
        }));
            // console.log(orderItems);
        let totalPrice = orderItems.reduce((total: number, item: any) => (total + (item.price * item.quantity)), 0);
        
        let newOrder = await orderService.addToOrder({
            user: req.user!._id,
            items: orderItems,
            totalAmount: totalPrice
        });

        await cartService.updateMany(req.user!._id, { isDelete: true });
        
        return res.status(201).json({ newOrder, message: `Order Place Successfully` });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: `Internal Server Error ${error.message}` });
    }
};

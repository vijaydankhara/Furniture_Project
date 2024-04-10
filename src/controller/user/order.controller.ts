import OrderServices from "../../services/order.service";
import CartServices from "../../services/cart.service";
import { Request, Response } from "express";


const orderService = new OrderServices();
const cartService = new CartServices();

declare global {
    namespace Express {
        interface Request {
            user?: object
        
        }
    }
}


export const addNewOrder = async (req: Request, res: Response) => {
    try {

        let cartItems = await cartService.getAllCart(req.query, req.user);
        // console.log(cartItems);
        if (cartItems.length === 0) {
            return res.status(404).json({ message: `Cart Not Found....`});
        }
            //   console.log(cartItems);
        let orderItems = cartItems.map((item: any) => ({
            product: item.cartItem._id,
            quantity: item.quantity,
            price: item.cartItem.price
        }));
            console.log(orderItems);
        let totalPrice = orderItems.reduce((total: number, item: any) => (total + (item.price * item.quantity)), 0);
        
        let newOrder = await orderService.addToOrder({
            user: req.user,
            items: orderItems,
            totalAmount: totalPrice
        });
        // console.log(newOrder);
        await cartService.updateMany(req.user, { isDelete: true });
        
        return res.status(201).json({ newOrder, message: `Order Place Successfully` });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: `Internal Server Error ${error.message}` });
    }
};

// GET ALL ORDER

export const getAllOrder = async (req: Request, res: Response) => {
    try {
        let orders = await orderService.getAllOrder({ isDelete: false });
        console.log(orders);
        if (!orders) {
            res.status(404).json({ message: `Orders Not Found.....`});
        }
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error ${console.error()}`});
    }
};



export const getOrder = async (req: Request, res: Response) => {
    try {
        let order = await orderService.getOrderById({_id: req.query.orderId, isDelete: false});
        // console.log(order);
        if (!order) {
            res.status(404).json({ message: `Orders Not Found.....`});
        }
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error ${console.error()}`});
    }
};

// Delete Order
export const deleteOrder = async (req: Request,res: Response) => {
    try {
        let order = await orderService.getOrder({_id: req.query.orderId , isDelete:false});
        // console.log(order);
        if (!order) {
            res.status(404).json({ message: `Orders Not Found...`});
        }
        order = await orderService.updateOrder(order._id, {isDelete: true});
        res.status(200).json({order, message: `Order Deleted Successfully...`});
        // console.log(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error ${console.error()}`});
    }
};

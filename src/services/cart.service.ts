import { ObjectId } from 'mongoose';
import Cart from '../../src/model/cart_model';

export default class CartServices {
    static getCart: any;
    static addToCart: any;
    static getAllCart: any;
    // addToCart
    async addToCart(body: any) {
        try {
            return await Cart.create(body);
        } catch (error: any)  {
            console.log(error);
            return error.message;
        }
    };

    // Get Single Cart
    async getCart(body: any) {
        try {
            return await Cart.findOne(body);
        } catch (error: any)  {
            console.log(error);
            return error.message;
        }
    };

    async getCartById(id: string) {
        try {
            return await Cart.findById(id);
        } catch (error: any)  {
            console.log(error);
            return error.message;
        }
    };

    // Update Cart
    async updateCart(id: string, body: any) {
        try {
            return await Cart.findByIdAndUpdate(id, {$set: body}, {new: true});
        } catch (error: any)  {
            console.log(error);
            return error.message;
        }
    };

    async updateMany(user: any, body: any) {
        try {
            return await Cart.updateMany({ user: user}, { $set: body}, { new: true});
        } catch  (error: any)  {
            console.log(error);
            return error.message;
        }
    };

    async getAllCart(query: any, user: any) {
        try {
            let userCarts = query.me && query.me === 'true' ? [
                {
                    $match: { user: user._id }
                }
            ] : [];
            let find = [
                { $match: { isDelete: false } },
                ...userCarts,
                {
                    $lookup: {
                        from: "products",
                        localField: 'cartItem',
                        foreignField: '_id',
                        as: 'cartItem'
                    }
                },
                { $set: { "cartItem": { $first: "$cartItem" } } } 
            ];
            let result = await Cart.aggregate(find);
            return result;
        } catch (error: any)  {
            console.log(error);
            return error.message;
        }
    };
}


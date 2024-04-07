import express, { Router } from 'express';
import { userVerifyToken } from '../../helpers/userVerifyToken';

import {
    addToCart,
    // getAllCarts,
    // getCart,
    // updateCart,
    // deleteCart
} from '../../controller/user/cart.controller';

const cartRoutes: Router = Router();

cartRoutes.post('/add-Cart', userVerifyToken, addToCart);
// cartRoutes.get('/get-All-Cart', userVerifyToken, getAllCarts);
// cartRoutes.get('/get-Cart', userVerifyToken, getCart);
// cartRoutes.put('/update-Cart', userVerifyToken, updateCart);
// cartRoutes.delete('/delete-Cart', userVerifyToken, deleteCart);

export default cartRoutes;

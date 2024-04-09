import express, { Router } from 'express';
import { adminVerifyToken } from '../../helpers/adminVerifyToken';


import {
    getAllCart
} from '../../controller/admin/cart.controller';

const cartRoutes: Router = Router();

cartRoutes.get('/get-All-Carts', adminVerifyToken, getAllCart);

export default cartRoutes;

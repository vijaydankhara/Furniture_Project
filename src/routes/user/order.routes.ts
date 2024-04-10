import express, { Router } from 'express';
import { userVerifyToken } from "../../helpers/userVerifyToken";

const orderRoute = express.Router();

import {
    addNewOrder,
    getAllOrder,  
    getOrder,
    deleteOrder
} from "../../controller/user/order.controller";

// ADD NEW ORDER
orderRoute.post('/add-New-Order', userVerifyToken, addNewOrder);

// GET ALL ORDER
orderRoute.get('/get-All-Order', userVerifyToken, getAllOrder );

// GET SPECIFIC ORDER
orderRoute.get('/get-Order', userVerifyToken, getOrder);

// DELETE ORDER
orderRoute.delete('/delete-Order', userVerifyToken, deleteOrder);

export default orderRoute;
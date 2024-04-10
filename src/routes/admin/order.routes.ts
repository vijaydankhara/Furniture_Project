import express, { Router } from 'express';
import { adminVerifyToken } from '../../helpers/adminVerifyToken';


const orderRoute = express.Router();

import {
    getAllOrder,  
} from "../../controller/admin/order.controller";

// GET ALL ORDER
orderRoute.get('/get-All-Order', adminVerifyToken, getAllOrder );



export default orderRoute;
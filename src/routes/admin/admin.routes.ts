import express  from "express";

import {
    registerAdmin   
} from "../../controller/admin/admin.controller";

const adminRoute = express.Router();

adminRoute.post('/register-Admin',registerAdmin);


export default adminRoute



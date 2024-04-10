import express  from "express";
import { adminVerifyToken } from "../../helpers/adminVerifyToken";


import {
  registerAdmin, 
  loginAdmin,
  getAllAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  updatePassword
} from "../../controller/admin/admin.controller";

const adminRoute = express.Router();

// REGISTER ADMIN
adminRoute.post('/register-Admin',registerAdmin);

// LOGIN ADMIN
adminRoute.post('/login-Admin',loginAdmin);

// GET ALL ADMIN
adminRoute.get('/get-All-Admin',adminVerifyToken, getAllAdmin);

// GET ALL ADMIN
adminRoute.get('/get-Admin',adminVerifyToken, getAdmin);

// UPDATE ADMIN
adminRoute.put('/update-Admin',adminVerifyToken, updateAdmin);

// DELETE ADMIN
adminRoute.delete('/delete-Admin',adminVerifyToken, deleteAdmin);

// UPDATE ADMIN PASSWORD
adminRoute.put('/update-Password',adminVerifyToken, updatePassword);


export default adminRoute



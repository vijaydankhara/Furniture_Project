import express  from "express";
import { userVerifyToken } from "../../helpers/userVerifyToken";


import {
    registerUser,
    loginUser,
    getAllUser,
    getUser,
    updateUser,
    deleteUser,
    updatePassword
} from "../../controller/user/user.controller";


const userRoutes = express.Router();

// REGISTER User
userRoutes.post('/register-User',registerUser);

// LOGIN USER
userRoutes.post('/login-User',loginUser);

// GET ALL USER
userRoutes.get('/get-All-User',userVerifyToken, getAllUser);

// GET ALL USER
userRoutes.get('/get-User',userVerifyToken, getUser);

// UPDATE USER
userRoutes.put('/update-User',userVerifyToken, updateUser);

// DELETE USER
userRoutes.delete('/delete-User',userVerifyToken, deleteUser);

// UPDATE USER PASSWORD
userRoutes.put('/update-Password',userVerifyToken, updatePassword);


export default userRoutes



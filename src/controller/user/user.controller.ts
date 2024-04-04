import UserService from "../../services/user.service";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userService = new UserService();

declare global {
  namespace Express {
    interface Request {
      admin?: object;
    }
  }
}

// REGISTER USER
export const registerUser = async (req: Request, res: Response) => {
  try {
    let user: object | null = await userService.getUser({
      email: req.body.email,isDelete: false});
    // console.log(user);
    if (user) {
      return res.status(400).json({ message: `User is Already Registerd...` });
    }
    let hashPassword : string = await bcrypt.hash(req.body.password, 10);
    // console.log(hashPassword);
    user  = await userService.addNewUser({
      ...req.body,
      password: hashPassword,
      isAdmin: true,
    });
    res
      .status(201)
      .json({ admin: user, message: `New User Is Added SuccesFully...` });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Internal Server Error..${console.error()}` });
  }
};

// LOGIN USER
exports.loginUser = async(req: Request,res: Response) => {
    try {
        let user :object | null = await userService.getUser({email: req.body.email, isDelete: false});
        console.log(user);
        if (!user) {
            return res.status(404).json({message:`Email Not Found..Please Check Your Email Address.`});
        }
        let checkPassword = await bcrypt.compare(req.body.password, user.password);
        if (!checkPassword) {
            return res.status(401).json({message: `Password is Not Match Please Enter Correct Password...`});
        }
        let token : string = jwt.sign({ userId: user._id}, 'User');
        console.log(token);
        res.status(200).json({ token, message: `Login SuccesFully...`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${console.error()}`});
    }
  };
    // GET ALL USERS
export const getAllUser = async(req: Request,res: Response) => {
  try {
      let users = await userService.getAllUser({isDelete: false});
      // console.log(users);
      if(!users){
          return res.status(404).json({ message: `Users Data Not Found...!`});
      }
      res.status(200).json(users);
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error..${console.error()}`});
  }
};

// GET SPECIFIC USER
export const getUser = async(req: Request,res: Response) => {
  try {
      let user = await userService.getUserById(req.query.userId);
      // console.log(user);
      if (!user) {
          return res.status(404).json({ message: "user not found..." });
      }
    //   console.log(user);
      res.status(200).json(user);
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error..${console.error()}`});
  }
};

// UPDATE ADMIN
export const updateUser = async(req: Request,res: Response) => {
  try {
      let user = await userService.getUserById(req.query.userId);
      if(!user){
          return res.status(404).json({ message: `User Not Found...` });
      }
      user = await userService.updateUser(user._id, { ...req.body});
      res.status(201).json({user, message: `User Updated Successfully...`})
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error..${console.error()}`});
  }
};

// DELETE USER
export const deleteUser = async(req: Request,res: Response) => {
  try {
      let user = await userService.getUserById(req.query.userId);
      if (!user) {
          return res.status(404).json({message:"User not found..."});
      }
      user = await userService.updateUser(user._id, {isDelete: true});
      res.status(200).json({message: `User Deleted Succesfully...`});
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error..${console.error()}`});
  }
};

// Update User Password
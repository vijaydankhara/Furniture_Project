import UserService from "../../services/user.service";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userService = new UserService();

declare global {
  namespace Express {
    interface Request {
      user?: object;
    }
  }
}

// REGISTER USER
export const registerUser = async (req: Request, res: Response) => {
  try {
    let user = await userService.getUser({
      email: req.body.email,
      isDelete: false,
    });
    // console.log(user);
    if (user) {
      return res.status(400).json({ message: `User Is Already Registerd...` });
    }
    let hashPassword: string = await bcrypt.hash(req.body.password, 10);
    // console.log(hashPassword);
    user = await userService.addNewUser({
      ...req.body,
      password: hashPassword,
    
    });
    res
      .status(201)
      .json({ user: user, message: `New User Is Added SuccesFully...` });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Internal Server Error..${console.error()}` });
  }
};

// // LOGIN user
export const loginUser = async (req: Request, res: Response) => {
  try {
    let user = await userService.getUser({
      email: req.body.email,
      isDelete: false,
    });
    console.log(user);
    if (!user) {
      return res
        .status(404)
        .json({ message: `Email Not Found..Please Check Your Email Address.` });
    }
    let checkPassword = await bcrypt.compare(req.body.password, user.password);
    if (!checkPassword) {
      return res
        .status(401)
        .json({
          message: `Password is Not Match Please Enter Correct Password...`,
        });
    }
    let token: string = jwt.sign({ userId: user._id }, "User");
    console.log(token);
    res.status(200).json({ token, message: `Login SuccesFully...` });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Internal Server Error..${console.error()}` });
  }
};

//     // GET ALL users
export const getAllUser = async (req: Request, res: Response) => {
  try {
    let users = await userService.getAllUser({
      isAdmin: false,
      isDelete: false,
    });
    // console.log(users);
    if (!users) {
      return res.status(404).json({ message: `Users Data Not Found...!` });
    }
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Internal Server Error..${console.error()}` });
  }
};

// GET SPECIFIC User
export const getUser = async (req: Request, res: Response) => {
  try {
    let user = await userService.getUserById(req.query.userId);
    // console.log(user);
    if (!user) {
      return res.status(404).json({ message: "user not found..." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Internal Server Error..${console.error()}` });
  }
};

// UPDATE USER
export const updateUser = async (req: Request, res: Response) => {
  try {
    let user = await userService.getUserById(req.query.userId);
    if (!user) {
      return res.status(404).json({ message: `User Not Found...` });
    }
    user = await userService.updateUser(user._id, { ...req.body });
    res.status(201).json({ user: user, message: `User Updated Successfully...` });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Internal Server Error..${console.error()}` });
  }
};

// DELETE USER
export const deleteUser = async (req: Request, res: Response) => {
  try {
    let user = await userService.getUserById(req.query.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found..." });
    }
    user = await userService.updateUser(user._id, { isDelete: true });
    res.status(200).json({ user: user, message: `user Deleted Succesfully...` });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Internal Server Error..${console.error()}` });
  }
};



// UPDATE PASSWORD

export const updatePassword = async (req: Request, res: Response) => {
  try {
      let user = await userService.getUserById(req.query.userId);
      if (!user) {
          return res.json({ message: `User Not Found....Please try again..` });
      }
      let comparePassword = await bcrypt.compare(req.body.oldPassword, (req.user as any).password);

      let oldPassword = req.body.oldPassword;
      if (!oldPassword) {
          return res.json({ message: `Old Password 🔑 is not Found.. Please Try Again.` });
      }
      if (!comparePassword) {
          return res.json({ message: `Old Password 🔑 is not match.. Please Try Again.` });
      }
      let newPassword: any = req.body.newPassword;
      if (!newPassword) {
          return res.json({ message: `New Password 🔑 is Not Found.` });
      }
      if (newPassword === oldPassword) {
          return res.json({ message: `Old 🔑 Password and New Password Are Same Please Enter Diffrent Password.` });
      }
      let confirmPassword = req.body.confirmPassword;
      if (!confirmPassword) {
          return res.json({ message: `Confirm Password 🔑 is Not Found.` });
      }
      if (newPassword !== confirmPassword) {
          return res.json({ message: `New Password 🔑 and Confirm  Password are not same.` });
      }
      let hashPassword = await bcrypt.hash(newPassword, 10);
      user = await userService.updateUser(user._id, { password: hashPassword });
      res.status(200).json({ message: 'Password 🔑 changed successfully🔑🔑🔑🔑' });
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error..${console.error()}` });
  }
}


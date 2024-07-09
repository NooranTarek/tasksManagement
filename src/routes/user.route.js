import express from "express";
import * as userController from '../controllers/user.controller.js'


const userRouter=express.Router();

userRouter.post('/signup',userController.signUp);
userRouter.post('/signin',userController.signin);
userRouter.get("/confirmationOfEmail/:token",userController.confirmationOfEmail);

export default userRouter;
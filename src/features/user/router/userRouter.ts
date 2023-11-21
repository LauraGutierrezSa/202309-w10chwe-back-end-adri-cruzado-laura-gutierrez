import { Router } from "express";
import UserController from "../controller/UserController.js";
import UsersMongooseRepository from "../repository/usersMongooseRepository.js";

export const userRouter = Router();

const userRepository = new UsersMongooseRepository();
const userController = new UserController(userRepository);

userRouter.post("/login", userController.loginUser);

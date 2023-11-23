import "dotenv/config.js";
import { type JwtPayload } from "jsonwebtoken";
import { type LoginUserRequest, type UserDataStructure } from "../types";
import bcrypt from "bcrypt";
import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import type UsersMongooseRepository from "../repository/usersMongooseRepository";
import { generalError } from "../../../server/middlewares/errors/generalError";
import CustomError from "../../../CustomError/CustomError";
class UserController {
  constructor(private readonly usersRepository: UsersMongooseRepository) {}

  registerUser = async (
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      UserDataStructure
    >,
    res: Response,
    next: NextFunction,
  ) => {
    const userData = req.body;

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    userData.password = hashedPassword;

    try {
      const newUser = await this.usersRepository.createUser(userData);

      res.status(200).json({ user: newUser });
    } catch {
      const userError = new CustomError(
        "It was not possible to create this user.",
        500,
      );
      next(userError);
    }
  };

  loginUser = async (
    req: LoginUserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { username, password } = req.body;
      const currentUser = await this.usersRepository.getUser(
        username,
        password,
      );

      const userData: JwtPayload = {
        sub: currentUser._id,
        name: currentUser.name,
      };

      const token = jwt.sign(userData, process.env.JWT_SECRET_KEY!);

      res.status(200).json(token);
    } catch (error) {
      const userError = new CustomError("Wrong credentials", 404);
      next(userError);
    }
  };
}

export default UserController;

import "dotenv/config.js";
import { type JwtPayload } from "jsonwebtoken";
import { type LoginUserRequest, type UserDataStructure } from "../types";
import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import type UsersMongooseRepository from "../repository/usersMongooseRepository";
import { generalError } from "../../../server/middlewares/errors/generalError";
class UserController {
  constructor(private readonly usersRepository: UsersMongooseRepository) {}

  registerUser = async (
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      UserDataStructure
    >,
    res: Response,
  ) => {
    const userData = req.body;

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    userData.password = hashedPassword;

    try {
      const newUser = await this.usersRepository.createUser(userData);

      res.status(200).json({ user: newUser });
    } catch {
      res.status(500).json({ generalError });
    }
  };

  loginUser = async (req: LoginUserRequest, res: Response): Promise<void> => {
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
      res.status(401).json({ generalError });
    }
  };
}

export default UserController;

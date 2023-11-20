import { type JwtPayload } from "jsonwebtoken";
import { type UsersRepository } from "../repository/types";
import { type LoginRequestData, type UserDataStructure } from "../types";
import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

class UserController {
  constructor(private readonly usersRepository: UsersRepository) {}

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

    const newUser = await this.usersRepository.createUser(userData);

    delete newUser.password;

    res.status(201).json({ user: newUser });
  };

  loginUser = async (
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      LoginRequestData
    >,
    res: Response,
  ) => {
    const userCredentials = req.body;

    try {
      const currentUser = await this.usersRepository.loginUser(
        userCredentials.username,
        userCredentials.password,
      );

      const userData: JwtPayload = {
        sub: currentUser._id,
        name: currentUser.username,
      };

      const token = jwt.sign(userData, "PATATES");

      res.status(201).json(token);
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  };
}

export default UserController;

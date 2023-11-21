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

    try {
      const newUser = await this.usersRepository.createUser(userData);

      res.status(200).json({ user: newUser });
    } catch {
      res
        .status(500)
        .json({ error: "It was not possible to create this user." });
    }
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

      res.status(200).json(token);
    } catch (error) {
      res.status(401).json((error as Error).message);
    }
  };
}

export default UserController;

import { User } from "../model/User";
import {
  type UserDataStructure,
  type UserWithoutPasswordStructure,
} from "../types";
import { type UsersRepository } from "./types";
import bcrypt from "bcrypt";

class UsersMongooseRepository implements UsersRepository {
  async createUser(
    userData: UserDataStructure,
  ): Promise<UserWithoutPasswordStructure> {
    const newUser = await User.create(userData);
    const { password, ...newUserWithoutPassword } = newUser.toJSON();

    return newUserWithoutPassword;
  }

  async loginUser(
    userName: string,
    password: string,
  ): Promise<UserWithoutPasswordStructure> {
    const currentUser = await User.findOne({ userName });

    if (!currentUser) {
      throw new Error("Username not valid.");
    }

    if (!(await bcrypt.compare(password, currentUser.password))) {
      throw new Error("Password not valid.");
    }

    return currentUser;
  }
}

export default UsersMongooseRepository;

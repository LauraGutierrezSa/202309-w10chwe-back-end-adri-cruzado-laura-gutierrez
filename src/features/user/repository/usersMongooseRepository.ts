import { User } from "../model/User.js";
import {
  type UserDataStructure,
  type UserWithoutPasswordStructure,
} from "../types";
import bcrypt from "bcrypt";

class UsersMongooseRepository {
  public async getUser(
    username: string,
    password: string,
  ): Promise<UserWithoutPasswordStructure> {
    const newUser = await User.findOne({ username });

    if (!newUser) {
      throw new Error("Username not found");
    }

    const newPasword = await User.findOne({ password });

    if (!newPasword) {
      throw new Error("Invalid password");
    }

    return newUser;
  }

  async createUser(
    userData: UserDataStructure,
  ): Promise<UserWithoutPasswordStructure> {
    const newUser = await User.create(userData);
    const { password, ...newUserWithoutPassword } = newUser.toJSON();

    return newUserWithoutPassword;
  }

  async loginUser(
    username: string,
    password: string,
  ): Promise<UserWithoutPasswordStructure> {
    const currentUser = await User.findOne({ username });

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

import {
  type UserDataStructure,
  type UserWithoutPasswordStructure,
} from "../types";

export interface UsersRepository {
  createUser: (
    userData: UserDataStructure,
  ) => Promise<UserWithoutPasswordStructure>;
  loginUser: (
    userName: string,
    password: string,
  ) => Promise<UserWithoutPasswordStructure>;
}

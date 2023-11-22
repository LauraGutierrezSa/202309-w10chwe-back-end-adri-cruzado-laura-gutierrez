import {
  type UserStructure,
  type UserDataStructure,
  type UserWithoutPasswordStructure,
} from "../types";

export interface UsersRepository {
  createUser: (
    userData: UserDataStructure,
  ) => Promise<UserWithoutPasswordStructure>;
  loginUser: (
    username: string,
    password: string,
  ) => Promise<UserWithoutPasswordStructure>;
}

export interface UserMongooseRepositoryStructure {
  getUser: (username: string, password: string) => Promise<UserStructure>;
}

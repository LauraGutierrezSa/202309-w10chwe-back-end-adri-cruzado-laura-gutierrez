import { type Request } from "express";

export interface UserStructure {
  _id: string;
  name: string;
  username: string;
  password: string;
}

export type UserDataStructure = Omit<UserStructure, "_id">;

export type UserWithoutPasswordStructure = Omit<UserStructure, "password">;

export type LoginRequestData = Omit<UserStructure, "_id" | "name">;

export type LoginUserRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  LoginRequestData
>;

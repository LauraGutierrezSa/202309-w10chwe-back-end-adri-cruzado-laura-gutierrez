import "dotenv/config";
import { type Response } from "express";
import jwt from "jsonwebtoken";
import {
  type LoginUserRequest,
  type UserWithoutPasswordStructure,
} from "../../types";
import type UsersMongooseRepository from "../../repository/usersMongooseRepository";
import UserController from "../UserController";
import { userMock } from "../../mocks/userMock";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a UsersController's loginUser method", () => {
  const req: Pick<LoginUserRequest, "body"> = {
    body: {
      username: "laurags",
      password: "laurags",
    },
  };

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  const token = "Ledv3NEWESNAZPÑFONWp304u123fbciwvb2";
  jwt.sign = jest.fn().mockReturnValue({ token });

  describe("When it receives a request with a validated password and a username", () => {
    const expectedStatusCode = 200;
    const userData: UserWithoutPasswordStructure = {
      _id: "",
      name: "",
      username: "laurags",
    };
    const userRepository: Pick<UsersMongooseRepository, "getUser"> = {
      getUser: jest.fn().mockResolvedValue(userMock),
    };

    test("Then it should call the status method of the response with status code 200", async () => {
      const usersController = new UserController(
        userRepository as UsersMongooseRepository,
      );
      await usersController.loginUser(req as LoginUserRequest, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the JSON method of the response with the token 'Ledv3NEWESNAZPÑFONWp304u123fbciwvb2'", async () => {
      const usersController = new UserController(
        userRepository as UsersMongooseRepository,
      );

      await usersController.loginUser(req as LoginUserRequest, res as Response);

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When it receives a request with an invalidated password and username", () => {
    const expectedWrongStatusCode = 401;

    const userRepository: Pick<UsersMongooseRepository, "loginUser"> = {
      loginUser: jest.fn().mockRejectedValue("error"),
    };
    const usersController = new UserController(
      userRepository as UsersMongooseRepository,
    );

    test("Then it should call the status method of the response with status code 401", async () => {
      await usersController.loginUser(req as LoginUserRequest, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedWrongStatusCode);
    });

    test("Then it should call the json method of the response with an error message", async () => {
      const expectedErrorMessage = { error: "User not found" };

      const res: Pick<Response, "status" | "json"> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnValue(expectedErrorMessage),
      };

      await usersController.loginUser(req as LoginUserRequest, res as Response);

      expect(res.json).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });
});

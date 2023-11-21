import { type Response } from "express";
import type { UsersRepository } from "../../repository/types";
import UserController from "../UserController.js";
import { type LoginUserRequest } from "../../types";
import { userMock } from "../../mocks/userMock.js";

describe("Given a UserController's method loginUser", () => {
  const req: Pick<LoginUserRequest, "body"> = {
    body: {
      password: "laurags",
      username: "laurags",
    },
  };

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  describe("When it receives a response and a verified username and password", () => {
    const usersRepository: UsersRepository = {
      loginUser: jest.fn().mockResolvedValue(userMock),
      createUser: jest.fn(),
    };

    const userController = new UserController(usersRepository);

    test("Then it should call the method status with a 200", async () => {
      const expectedStatusCode = 200;

      await userController.loginUser(req as LoginUserRequest, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });
});

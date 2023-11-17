import PingController from "./PingController";
import { type Request, type Response } from "express";

describe("Given a PingController's getPong method", () => {
  describe("When it recieves a response", () => {
    const pingController = new PingController();
    const mockStatus = jest.fn().mockReturnValue({ json: jest.fn() });

    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: mockStatus,
      json: jest.fn(),
    };

    test("Then it should call its method status with 200", () => {
      const expectedStatusCode = 200;

      pingController.getPong(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method status with 200", () => {
      const expectedMessage = { message: "🏓" };

      pingController.getPong(req as Request, res as Response);

      expect(res.status(200).json).toHaveBeenCalledWith(expectedMessage);
    });
  });
});

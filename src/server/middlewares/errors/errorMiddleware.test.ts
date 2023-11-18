import { type Request, type Response } from "express";
import notFound from "./errorMiddleware";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a notFound middleware", () => {
  describe("When it receives a response", () => {
    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    test("Then it should call its method status with 404", () => {
      const expectedStatusCode = 404;

      notFound(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method json with the error message 'Endpoint not found'", () => {
      const expectedErrorMessage = { error: "Endpoint not found" };

      notFound(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });
});

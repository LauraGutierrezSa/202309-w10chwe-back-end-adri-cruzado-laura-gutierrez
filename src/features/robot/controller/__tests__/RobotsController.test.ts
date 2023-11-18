import { robotsMock } from "../../mocks/robotsMock";
import { type RobotsRepository } from "../../types";
import RobotsController from "../RobotsController";
import { type Request, type Response } from "express";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a RobotsController's getRobots method", () => {
  const robotsRepository: RobotsRepository = {
    getRobots: jest.fn().mockReturnValue(robotsMock),
  };

  const req = {};
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnValue(robotsMock),
  };

  describe("When it receives a response", () => {
    test("Then it should call its status method with a 200", async () => {
      const expectedStatus = 200;

      const robotsController = new RobotsController(robotsRepository);
      await robotsController.getRobots(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
});

import "../../../../server/index";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import { connectToDatabase } from "../../../../database/index.js";
import mongoose from "mongoose";
import { type RobotStructure } from "../../types";
import app from "../../../../server/app";
import Robot from "../../model/Robot.js";
import { robotsMock } from "../../mocks/robotsMock";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const mongoDbUrl = server.getUri();

  await connectToDatabase(mongoDbUrl);
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given a GET /robots endpoint", () => {
  describe("When it recieves a request", () => {
    test("Then it should respond with a status of 200 and a list of robots 'Optimus Prime' and 'Mazinger Z'", async () => {
      const path = "/robots";
      const expectedStatusCode = 200;

      await Robot.create(robotsMock[0]);
      await Robot.create(robotsMock[1]);

      const response = await request(app).get(path).expect(expectedStatusCode);

      const responseBody = response.body as { robots: RobotStructure[] };

      responseBody.robots.forEach((robot, robotPosition) => {
        expect(robot).toHaveProperty("name", robotsMock[robotPosition].name);
      });
    });
  });
});

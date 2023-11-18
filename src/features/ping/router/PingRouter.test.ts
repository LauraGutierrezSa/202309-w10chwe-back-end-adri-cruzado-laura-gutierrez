import request from "supertest";
import "../../../server/index";
import app from "../../../server/app";

describe("Given a GET / endpoint", () => {
  describe("When it recieves a Request", () => {
    test("Then it should respond with a message '🏓'", async () => {
      const path = "/";
      const expectedStatusCode = 200;
      const expectedMessage = "🏓";

      const response = await request(app).get(path).expect(expectedStatusCode);

      expect(response.body).toHaveProperty("message", expectedMessage);
    });
  });
});

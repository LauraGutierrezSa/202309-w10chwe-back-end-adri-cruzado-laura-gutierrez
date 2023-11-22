import "dotenv/config";
import "./server/index";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connectToDatabase } from "./database";
import mongoose from "mongoose";

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

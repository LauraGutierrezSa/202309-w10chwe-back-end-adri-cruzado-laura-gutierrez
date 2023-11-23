import chalk from "chalk";
import { startServer } from "./server/app.js";
import { connectToDatabase } from "./database/index.js";
import "./server/index.js";
import debugCreator from "debug";

const debug = debugCreator(":robots:src:index");

const port = process.env.PORT ?? 4000;
if (!process.env.MONGODB_URL) {
  debug(chalk.red("Missing MongoDB connection string"));
  process.exit();
}

const mongoUrl = process.env.MONGODB_URL;

await connectToDatabase(mongoUrl);

startServer(+port);

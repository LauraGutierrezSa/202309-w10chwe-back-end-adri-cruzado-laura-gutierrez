import "dotenv/config.js";
import debugCreator from "debug";
import chalk from "chalk";
import mongoose from "mongoose";

const debug = debugCreator(":robots:src:index");

export const connectToDatabase = async (mongoUrl: string) => {
  try {
    await mongoose.connect(mongoUrl);
    mongoose.set("debug", true);
    debug(chalk.green("Connected to database."));
  } catch (error) {
    debug(chalk.red("Impossible to connect to database."));
  }
};

import { Schema, model } from "mongoose";
import { type RobotStructure } from "../types";

const robotSchema = new Schema<RobotStructure>({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
  },
  endurance: {
    type: Number,
    required: true,
  },
});

const Robot = model("Robot", robotSchema, "robots");

export default Robot;

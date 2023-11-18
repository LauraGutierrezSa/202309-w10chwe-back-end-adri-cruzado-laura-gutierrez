import type { RobotsRepository, RobotStructure } from "../types";
import Robot from "../model/Robot";

class RobotsMongooseRepository implements RobotsRepository {
  public async getRobots(): Promise<RobotStructure[]> {
    const robots = await Robot.find();

    return robots;
  }
}

export default RobotsMongooseRepository;

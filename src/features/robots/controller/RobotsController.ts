import { type Request, type Response } from "express";
import type RobotsMongooseRepository from "../repository/RobotsMongooseRepository";

class RobotsController {
  constructor(private readonly robotsRepository: RobotsMongooseRepository) {}

  public getRobots = async (_req: Request, res: Response): Promise<void> => {
    const robots = await this.robotsRepository.getRobots();

    res.status(200).json({ robots });
  };
}

export default RobotsController;

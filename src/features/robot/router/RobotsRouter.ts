import { Router } from "express";
import RobotsController from "../controller/RobotsController.js";
import RobotsMongooseRepository from "../repository/RobotsMongooseRepository.js";
import { type RobotsRepository } from "../types";

const robotsRouter = Router();

const robotsRepository: RobotsRepository = new RobotsMongooseRepository();

const robotsController = new RobotsController(robotsRepository);

robotsRouter.get("/", robotsController.getRobots);

export default robotsRouter;

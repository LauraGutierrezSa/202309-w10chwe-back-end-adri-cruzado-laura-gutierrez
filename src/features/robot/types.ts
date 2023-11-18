export interface RobotStructure {
  id: string;
  name: string;
  imageUrl: string;
  speed: number;
  endurance: number;
}

export interface RobotsRepository {
  getRobots: () => Promise<RobotStructure[]>;
}

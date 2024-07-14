import { Obstacles } from "../type";

export class ObstacleManager {
  constructor() {}

  getObstacleName(obstacle: Obstacles): string {
    return Obstacles[obstacle].replace(/([A-Z])/g, " $1").trim();
  }

  getObstacleNumber(obstacleName: string): Obstacles | undefined {
    const formattedName = obstacleName.replace(/\s+/g, "");
    return Obstacles[formattedName as keyof typeof Obstacles];
  }
}

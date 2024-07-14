export class SurvivorManager {
  calculateLevel(xp: number) {
    return Math.max(Math.floor(Math.sqrt(xp)), 1);
  }
}

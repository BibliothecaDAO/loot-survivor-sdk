import { UINT_128_MAX, hash } from "starknet";
import { BeastEncounter, Item } from "../type";
import { BeastManager } from "./beasts";
import { Survivor } from "./survivor";
// import { LootManager } from "./loot";

export class PredictionManager {
  private beasts: BeastManager = new BeastManager();
  private survivor: Survivor = new Survivor();
  // private lootManager: LootManager = new LootManager();

  constructor() {}

  getRandomness(
    xp: number,
    adventurerEntropy: bigint
  ): { rnd1: bigint; rnd2: bigint } {
    const params = [BigInt(xp), adventurerEntropy];
    const poseidon = hash.computePoseidonHashOnElements(params);

    return {
      rnd1: BigInt(poseidon) % UINT_128_MAX,
      rnd2: BigInt(poseidon) / UINT_128_MAX,
    };
  }

  beastEncounters(xpList: number[], adventurerEntropy: bigint): any[] {
    return xpList.map((xp) => {
      const level = BigInt(Math.floor(Math.sqrt(xp)));
      const { rnd2 } = this.getRandomness(xp, adventurerEntropy);

      return {
        ...this.beastEncounter(adventurerEntropy, level, xp, rnd2),
        adventurerLevel: Math.floor(Math.sqrt(xp)),
        xp: xp,
      };
    });
  }

  getBeastHealth(level: bigint, seed: bigint): bigint {
    const baseHealth = BigInt(1) + (seed % (level * BigInt(20)));
    const levelBonus = this.getLevelBonus(level);
    const totalHealth = baseHealth + levelBonus;

    return totalHealth > 511 ? BigInt(511) : totalHealth;
  }

  private getLevelBonus(level: bigint): bigint {
    if (level >= 50) return BigInt(500);
    if (level >= 40) return BigInt(400);
    if (level >= 30) return BigInt(200);
    if (level >= 20) return BigInt(100);
    return BigInt(10);
  }

  getObstacleLevel(level: bigint, entropy: bigint): bigint {
    let obstacleLevel = BigInt(1) + (entropy % (level * BigInt(3)));

    if (level >= 50) {
      obstacleLevel += BigInt(80);
    } else if (level >= 40) {
      obstacleLevel += BigInt(40);
    } else if (level >= 30) {
      obstacleLevel += BigInt(20);
    } else if (level >= 20) {
      obstacleLevel += BigInt(10);
    }

    return obstacleLevel;
  }

  getAttackLocation(entropy: bigint): string {
    const locations = ["Chest", "Head", "Waist", "Foot", "Hand"];
    const index = Number(entropy % BigInt(locations.length));
    return locations[index];
  }

  getXpReward(level: bigint, tier: bigint): bigint {
    let xp = ((BigInt(6) - tier) * level) / BigInt(2);

    if (xp < 4) {
      return BigInt(4);
    }

    return xp;
  }

  abilityBasedAvoidThreat(level: bigint, entropy: bigint): bigint {
    return entropy % level;
  }

  criticalMultiplier(luck: number, entropy: bigint): number {
    if (luck > Number(entropy % BigInt(100))) {
      return Number(entropy % BigInt(5)) + 1;
    }

    return 0;
  }

  criticalHitBonus(
    base_damage: number,
    luck: number,
    ring: Item | undefined,
    entropy: bigint
  ): number {
    let total = 0;

    if (luck > Number(entropy % BigInt(100))) {
      let damage_boost_base = Math.floor(base_damage / 5);
      let damage_multiplier = Number(entropy % BigInt(5)) + 1;
      total = damage_boost_base * damage_multiplier;

      if (ring?.item === "Titanium Ring" && total > 0) {
        total += Math.floor(
          (total * 3 * Math.floor(Math.sqrt(ring.xp!))) / 100
        );
      }
    }

    return total;
  }

  calculateEncounterDamage(
    type: string | undefined,
    tier: number,
    level: number,
    adventurerArmor: Item | undefined,
    entropy: bigint,
    minimumDmg: number
  ) {
    if (!type) return minimumDmg;

    let base_attack = level * (6 - tier!);

    let base_armor = 0;
    let elemental_damage = 0;

    if (adventurerArmor) {
      base_armor =
        this.survivor.calculateLevel() * (6 - adventurerArmor?.tier!);
      elemental_damage = this.beasts.elementalAdjustedDamage(
        base_attack,
        type,
        adventurerArmor?.type!
      );
    } else {
      elemental_damage = base_attack * 1.5;
    }

    let crit_bonus = this.criticalHitBonus(
      elemental_damage,
      10,
      undefined,
      entropy
    );

    let total_attack = elemental_damage + crit_bonus;
    let total_damage = Math.floor(total_attack - base_armor);

    return Math.max(minimumDmg, total_damage);
  }

  beastEncounter(
    adventurerEntropy: bigint,
    level: bigint,
    xp: number,
    rnd2: bigint,
    items?: Item[]
  ): BeastEncounter {
    const seed = this.getRandomness(xp, adventurerEntropy).rnd1;

    const beast_id = (Number(seed) % this.beasts.maxBeastId()) + 1;

    const beast_health = this.getBeastHealth(level, seed);

    const beast_tier = this.beasts.getBeastTier(Number(beast_id));

    const beast_type = this.beasts.getAttackType(
      this.beasts.getBeastType(Number(beast_id))
    );

    const beast_level = this.getObstacleLevel(level, seed);

    const ambush_location = this.getAttackLocation(rnd2);
    const roll = this.abilityBasedAvoidThreat(level, seed);
    const xp_reward = this.getXpReward(beast_level, BigInt(beast_tier.tier));
    // const specialName = this.lootManager.getSpecialName(seed);
    const criticalMultiplier = this.criticalMultiplier(10, rnd2);

    const adventurerArmor = items?.find(
      (item) => item.slot === ambush_location
    );

    const damage = this.calculateEncounterDamage(
      beast_type,
      Number(beast_tier),
      Number(beast_level),
      adventurerArmor,
      rnd2,
      2
    );

    return {
      encounter: "Beast",
      id: BigInt(beast_id),
      type: beast_type,
      tier: Number(beast_tier),
      level: Number(beast_level),
      health: Number(beast_health),
      location: ambush_location,
      dodgeRoll: Number(roll) + 1,
      nextXp: xp + Number(xp_reward),
      specialName: "",
      criticalMultiplier,
      damage,
    };
  }
}

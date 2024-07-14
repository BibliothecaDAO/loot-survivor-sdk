import { describe, it, expect, beforeEach } from "vitest";
import { BeastManager } from "../objects/beasts";
import { Beasts, BeastType, AttackType, ArmorType } from "../type";
import { S3_BUCKET } from "../constants";

describe("BeastManager", () => {
  let beastManager: BeastManager;

  beforeEach(() => {
    beastManager = new BeastManager();
  });

  describe("getBeastName", () => {
    it("should return the correct beast name for a given beast number", () => {
      expect(beastManager.getBeastName(Beasts.Bear)).toBe("Bear");
      expect(beastManager.getBeastName(Beasts.Wolf)).toBe("Wolf");
    });
  });

  describe("getBeastNumber", () => {
    it("should return the correct beast number for a given beast name", () => {
      expect(beastManager.getBeastNumber("Bear")).toBe(Beasts.Bear);
      expect(beastManager.getBeastNumber("Wolf")).toBe(Beasts.Wolf);
    });

    it("should return undefined for an invalid beast name", () => {
      expect(beastManager.getBeastNumber("InvalidBeast")).toBeUndefined();
    });
  });

  describe("getBeastTier", () => {
    it("should return the correct type and tier for a given beast", () => {
      const bearTier = beastManager.getBeastTier(Beasts.Bear);
      expect(bearTier).toEqual({ type: BeastType.Hunter, tier: 5 });
    });
  });
  describe("getAttackType", () => {
    it("should return the correct attack type for a given beast type", () => {
      expect(beastManager.getAttackType(BeastType.Magical)).toBe(
        AttackType.Magic
      );
      expect(beastManager.getAttackType(BeastType.Hunter)).toBe(
        AttackType.Blade
      );
      expect(beastManager.getAttackType(BeastType.Brute)).toBe(
        AttackType.Bludgeon
      );
    });
  });

  describe("getArmorType", () => {
    it("should return the correct armor type for a given beast type", () => {
      expect(beastManager.getArmorType(BeastType.Magical)).toBe(
        ArmorType.Cloth
      );
      expect(beastManager.getArmorType(BeastType.Hunter)).toBe(ArmorType.Hide);
      expect(beastManager.getArmorType(BeastType.Brute)).toBe(ArmorType.Metal);
    });
  });

  describe("getBeastType", () => {
    it("should return the correct beast type for a given beast", () => {
      expect(beastManager.getBeastType(Beasts.Bear)).toBe(BeastType.Hunter);
    });
  });

  describe("maxBeastId", () => {
    it("should return the highest beast id", () => {
      const maxId = beastManager.maxBeastId();
      expect(maxId).toBeGreaterThan(0);
      expect(typeof maxId).toBe("number");
    });
  });

  describe("getBeastImage", () => {
    it("should return the correct image URL for a given beast", () => {
      const imageUrl = beastManager.getBeastImage(Beasts.Bear);
      expect(imageUrl).toContain(S3_BUCKET);
      expect(imageUrl).toContain("/monsters/bear.png");
    });
  });

  describe("elementalAdjustedDamage", () => {
    it("should increase damage for effective weapon-armor pairs", () => {
      const baseDamage = 100;
      const adjustedDamage = beastManager.elementalAdjustedDamage(
        baseDamage,
        "Magic",
        "Metal"
      );
      expect(adjustedDamage).toBe(150);
    });

    it("should decrease damage for ineffective weapon-armor pairs", () => {
      const baseDamage = 100;
      const adjustedDamage = beastManager.elementalAdjustedDamage(
        baseDamage,
        "Magic",
        "Hide"
      );
      expect(adjustedDamage).toBe(50);
    });

    it("should not change damage for neutral weapon-armor pairs", () => {
      const baseDamage = 100;
      const adjustedDamage = beastManager.elementalAdjustedDamage(
        baseDamage,
        "Magic",
        "Cloth"
      );
      expect(adjustedDamage).toBe(100);
    });
  });
});

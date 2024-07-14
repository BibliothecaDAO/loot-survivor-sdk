import { describe, it, expect } from "vitest";
import { LootManager } from "./loot";
import {
  Loot,
  ItemNamePrefix,
  ItemNameSuffix,
  ItemSuffix,
  ItemType,
  ItemSlot,
  StatBoost,
  StatType,
} from "../type";

describe("LootManager", () => {
  const lootManager = new LootManager();

  it("should return the correct item name", () => {
    expect(lootManager.getItemName(Loot.Pendant)).toBe("Pendant");
  });

  it("should return the correct item number", () => {
    expect(lootManager.getItemNumber("Pendant")).toBe(Loot.Pendant);
  });

  it("should return the correct item type", () => {
    expect(lootManager.getItemType(Loot.Pendant)).toBe(ItemType.Necklace);
  });

  it("should return the correct item slot", () => {
    expect(lootManager.getItemSlot(Loot.Pendant)).toBe(ItemSlot.Neck);
  });

  it("should return the correct item name prefix", () => {
    expect(lootManager.getItemNamePrefix(ItemNamePrefix.Dire)).toBe("Dire");
  });

  it("should return the correct item name prefix number", () => {
    expect(lootManager.getItemNamePrefixNumber("Agony")).toBe(
      ItemNamePrefix.Agony
    );
  });

  it("should return the correct item name suffix", () => {
    expect(lootManager.getItemNameSuffix(ItemNameSuffix.Bane)).toBe("Bane");
  });

  it("should return the correct item name suffix number", () => {
    expect(lootManager.getItemNameSuffixNumber("Bane")).toBe(
      ItemNameSuffix.Bane
    );
  });

  it("should return the correct item suffix", () => {
    expect(lootManager.getItemSuffix(ItemSuffix.OfAnger)).toBe("Of Anger");
  });

  it("should return the correct item suffix number", () => {
    expect(lootManager.getItemSuffixNumber("Of Anger")).toBe(
      ItemSuffix.OfAnger
    );
  });

  it("should return the correct item suffix boost string", () => {
    const expectedBoostString = "Strength +2 Dexterity +1";
    expect(lootManager.getItemSuffixBoostString(ItemSuffix.OfAnger)).toBe(
      expectedBoostString
    );
  });

  it("should return the correct item suffix boost string", () => {
    const expectedBoostString = "Strength +2 Dexterity +1";
    expect(lootManager.getItemSuffixBoostString(ItemSuffix.OfAnger)).toBe(
      expectedBoostString
    );
  });

  it("should return the correct item slot number", () => {
    expect(lootManager.getItemSlotNumber(ItemSlot.Neck)).toBe(7);
  });

  it("should return the correct item slot from number", () => {
    expect(lootManager.getItemSlotFromNumber(1)).toBe(ItemSlot.Weapon);
  });

  it("should return the correct special name", () => {
    const seed = BigInt(123456789);
    const specialName = lootManager.getSpecialName(seed);
    expect(specialName).toBe("Victory Bane");
  });
});
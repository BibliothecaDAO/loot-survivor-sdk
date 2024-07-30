import { Survivor } from "./survivor";
import { SELECTORS } from "../type";

import { beforeEach, describe, expect, it } from "vitest";

import {
  mockStartGameEvent,
  mockAdventurerUpgradedEvent,
  mockDiscoveredHealthEvent,
  mockDiscoveredGoldEvent,
  mockDiscoveredXPEvent,
  mockEquipmentChangedEvent,
} from "../state/mock";

describe("Survivor", () => {
  let survivor: Survivor;

  beforeEach(() => {
    survivor = new Survivor();
  });

  describe("updateFromEvent", () => {
    it("should handle StartGame event", () => {
      survivor.updateFromEvent({
        name: SELECTORS.StartGame,
        event: mockStartGameEvent,
      });

      expect(survivor.id).toBe(1);
      expect(survivor.name).toBe(mockStartGameEvent.adventurerMeta.name);
      expect(survivor.owner).toBe(mockStartGameEvent.adventurerState.owner);
      expect(survivor.health).toBe(100);
      expect(survivor.maxHealth).toBe(100);
      expect(survivor.xp).toBe(0);
      expect(survivor.level).toBe(1);
      expect(survivor.gold).toBe(0);
      expect(survivor.stats).toEqual(
        mockStartGameEvent.adventurerMeta.startingStats
      );
      expect(survivor.startEntropy).toBe(
        mockStartGameEvent.adventurerMeta.startEntropy
      );
      expect(survivor.startingStats).toEqual(
        mockStartGameEvent.adventurerMeta.startingStats
      );
      expect(survivor.interfaceCamel).toBe(
        mockStartGameEvent.adventurerMeta.interfaceCamel
      );
      expect(survivor.revealBlock).toBe(mockStartGameEvent.revealBlock);
    });
  });

  it("should handle AdventurerUpgraded event", () => {
    survivor.updateFromEvent({
      name: SELECTORS.AdventurerUpgraded,
      event: mockAdventurerUpgradedEvent,
    });

    expect(survivor.id).toBe(
      mockAdventurerUpgradedEvent.adventurerStateWithBag.adventurerState
        .adventurerId
    );
    expect(survivor.stats).toEqual(
      mockAdventurerUpgradedEvent.adventurerStateWithBag.adventurerState
        .adventurer.stats
    );
    expect(survivor.bag).toEqual(
      mockAdventurerUpgradedEvent.adventurerStateWithBag.bag
    );
  });

  it("should handle DiscoveredHealth event", () => {
    survivor.updateFromEvent({
      name: SELECTORS.DiscoveredHealth,
      event: mockDiscoveredHealthEvent,
    });

    expect(survivor.health).toBe(
      mockDiscoveredHealthEvent.adventurerState.adventurer.health
    );
  });

  it("should handle DiscoveredGold event", () => {
    survivor.updateFromEvent({
      name: SELECTORS.DiscoveredGold,
      event: mockDiscoveredGoldEvent,
    });

    expect(survivor.gold).toBe(
      mockDiscoveredGoldEvent.adventurerState.adventurer.gold
    );
  });

  it("should handle DiscoveredXP event", () => {
    survivor.updateFromEvent({
      name: SELECTORS.DiscoveredXP,
      event: mockDiscoveredXPEvent,
    });

    expect(survivor.xp).toBe(
      mockDiscoveredXPEvent.adventurerState.adventurer.xp
    );
  });

  it("should handle EquipmentChanged event", () => {
    survivor.updateFromEvent({
      name: SELECTORS.EquipmentChanged,
      event: mockEquipmentChangedEvent,
    });

    expect(survivor.items).toEqual({
      weapon: { slot: "weapon", xp: 0 },
      chest: { slot: "chest", xp: 0 },
      head: { slot: "head", xp: 0 },
      waist: { slot: "waist", xp: 0 },
      foot: { slot: "foot", xp: 0 },
      hand: { slot: "hand", xp: 0 },
      neck: { slot: "neck", xp: 0 },
      ring: { slot: "ring", xp: 0 },
    });
    expect(survivor.bag).toEqual(
      mockEquipmentChangedEvent.adventurerStateWithBag.bag
    );
  });

  it("should set optimistic state", () => {
    const newState = {
      health: 80,
      gold: 100,
      xp: 50,
    };

    survivor.setOptimisticState(newState);

    expect(survivor.health).toBe(80);
    expect(survivor.gold).toBe(100);
    expect(survivor.xp).toBe(50);
    expect(survivor.level).toBe(Math.floor(Math.sqrt(50))); // Check if level is updated
  });

  it("should revert optimistic state", () => {
    const initialHealth = survivor.health;
    const initialGold = survivor.gold;
    const initialXp = survivor.xp;

    survivor.setOptimisticState({
      health: 80,
      gold: 100,
      xp: 50,
    });

    survivor.revertOptimisticState();

    expect(survivor.health).toBe(initialHealth);
    expect(survivor.gold).toBe(initialGold);
    expect(survivor.xp).toBe(initialXp);
  });

  it("should confirm optimistic state", () => {
    const newState = {
      health: 80,
      gold: 100,
      xp: 50,
    };

    survivor.setOptimisticState(newState);
    survivor.confirmOptimisticState();

    // Set a new optimistic state
    survivor.setOptimisticState({
      health: 70,
      gold: 150,
      xp: 75,
    });

    // Revert the new state
    survivor.revertOptimisticState();

    // Check if it reverts to the confirmed state, not the initial state
    expect(survivor.health).toBe(80);
    expect(survivor.gold).toBe(100);
    expect(survivor.xp).toBe(50);
  });

  it("should update derived properties when setting optimistic state", () => {
    const newState = {
      stats: {
        ...survivor.stats,
        vitality: survivor.stats.vitality + 10,
      },
      xp: 400,
    };

    survivor.setOptimisticState(newState);

    expect(survivor.maxHealth).toBe(survivor.stats.vitality * 10);
    expect(survivor.level).toBe(Math.floor(Math.sqrt(400)));
  });

  it("should not revert state if no optimistic update was made", () => {
    const initialHealth = survivor.health;
    const initialGold = survivor.gold;

    survivor.revertOptimisticState();

    expect(survivor.health).toBe(initialHealth);
    expect(survivor.gold).toBe(initialGold);
  });
});

import { Survivor } from "./survivor";
import { SELECTORS } from "../type";

import { beforeEach, describe, expect, it } from "vitest";

import { mockStartGameEvent } from "../state/mock";

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

  // Add tests for other methods in the Survivor class
});

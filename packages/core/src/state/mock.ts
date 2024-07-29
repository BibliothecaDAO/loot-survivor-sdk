import { shortString } from "starknet";
import * as EventTypes from "../type/events";

const encodeEventData = (event: any): string[] => {
  return Object.values(event).flatMap((value) => {
    if (typeof value === "object" && value !== null) {
      return encodeEventData(value);
    }
    if (typeof value === "number") {
      return ["0x" + value.toString(16)];
    }
    if (typeof value === "boolean") {
      return [value ? "0x1" : "0x0"];
    }
    if (typeof value === "string" && value.startsWith("0x")) {
      return [value];
    }
    return [shortString.encodeShortString((value as any).toString())];
  });
};

const createBagState = (itemIds: number[]): EventTypes.Bag => {
  const bag: EventTypes.Bag = {
    item1: { id: 0, xp: 0 },
    item2: { id: 0, xp: 0 },
    item3: { id: 0, xp: 0 },
    item4: { id: 0, xp: 0 },
    item5: { id: 0, xp: 0 },
    item6: { id: 0, xp: 0 },
    item7: { id: 0, xp: 0 },
    item8: { id: 0, xp: 0 },
    item9: { id: 0, xp: 0 },
    item10: { id: 0, xp: 0 },
    item11: { id: 0, xp: 0 },
    item12: { id: 0, xp: 0 },
    item13: { id: 0, xp: 0 },
    item14: { id: 0, xp: 0 },
    item15: { id: 0, xp: 0 },
    mutated: false,
  };

  itemIds.forEach((id, index) => {
    if (index < 15) {
      const key = `item${index + 1}` as keyof EventTypes.Bag;
      (bag[key] as any) = { id, xp: 0 };
    }
  });
  return bag;
};

// Helper function to create a basic AdventurerState
const createBasicAdventurerState = (
  id: number
): EventTypes.AdventurerState => ({
  owner: "0x1234567890123456789012345678901234567890",
  adventurerId: id,
  adventurerEntropy: "someEntropyString",
  adventurer: {
    health: 100,
    xp: 0,
    gold: 0,
    beastHealth: 0,
    statUpgradesAvailable: 0,
    stats: {
      strength: 10,
      dexterity: 10,
      vitality: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
      luck: 10,
    },
    equipment: {
      weapon: { id: 1, xp: 0 },
      chest: { id: 2, xp: 0 },
      head: { id: 3, xp: 0 },
      waist: { id: 4, xp: 0 },
      foot: { id: 5, xp: 0 },
      hand: { id: 6, xp: 0 },
      neck: { id: 7, xp: 0 },
      ring: { id: 8, xp: 0 },
    },
    mutated: false,
  },
});

// Create mock events for all event types
export const mockStartGameEvent: EventTypes.StartGameEvent = {
  adventurerState: createBasicAdventurerState(1),
  adventurerMeta: {
    startEntropy: "startEntropyString",
    startingStats: {
      strength: 10,
      dexterity: 10,
      vitality: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
      luck: 10,
    },
    interfaceCamel: true,
    name: 123456789,
  },
  revealBlock: 1000000,
};

export const mockDiscoveredHealthEvent: EventTypes.DiscoveredHealthEvent = {
  adventurerState: {
    ...createBasicAdventurerState(1),
    adventurer: {
      ...createBasicAdventurerState(1).adventurer,
      health: createBasicAdventurerState(1).adventurer.health + 20,
    },
  },
  healthAmount: 20,
};

export const mockDiscoveredGoldEvent: EventTypes.DiscoveredGoldEvent = {
  adventurerState: {
    ...createBasicAdventurerState(1),
    adventurer: {
      ...createBasicAdventurerState(1).adventurer,
      gold: createBasicAdventurerState(1).adventurer.gold + 50,
    },
  },
  goldAmount: 50,
};

export const mockDiscoveredXPEvent: EventTypes.DiscoveredXPEvent = {
  adventurerState: {
    ...createBasicAdventurerState(1),
    adventurer: {
      ...createBasicAdventurerState(1).adventurer,
      xp: createBasicAdventurerState(1).adventurer.xp + 100,
    },
  },
  xpAmount: 100,
};

export const mockDiscoveredLootEvent: EventTypes.DiscoveredLootEvent = {
  adventurerState: createBasicAdventurerState(1),
  itemId: 5,
};

export const mockEquipmentChangedEvent: EventTypes.EquipmentChangedEvent = {
  adventurerStateWithBag: {
    adventurerState: {
      ...createBasicAdventurerState(1),
      adventurer: {
        ...createBasicAdventurerState(1).adventurer,
        equipment: {
          ...createBasicAdventurerState(1).adventurer.equipment,
          weapon: { id: 1, xp: 0 },
          chest: { id: 2, xp: 0 },
          head: { id: 3, xp: 0 },
        },
      },
    },
    bag: {
      ...createBagState([1, 2, 3, 4]),
      item1: { id: 4, xp: 0 },
      item2: { id: 5, xp: 0 },
    },
  },
  equippedItems: [1, 2, 3],
  baggedItems: [4, 5],
  droppedItems: [6, 7],
};

export const mockDodgedObstacleEvent: EventTypes.DodgedObstacleEvent = {
  adventurerState: createBasicAdventurerState(1),
  id: 3,
  level: 2,
  damageTaken: 5,
  damageLocation: 1,
  xpEarnedAdventurer: 10,
  xpEarnedItems: 5,
};

export const mockHitByObstacleEvent: EventTypes.HitByObstacleEvent = {
  adventurerState: createBasicAdventurerState(1),
  id: 4,
  level: 3,
  damageTaken: 15,
  damageLocation: 2,
  xpEarnedAdventurer: 20,
  xpEarnedItems: 10,
};

export const mockAmbushedByBeastEvent: EventTypes.AmbushedByBeastEvent = {
  adventurerState: createBasicAdventurerState(1),
  seed: 987654321,
  id: 5,
  beastSpecs: {
    tier: EventTypes.Tier.T2,
    itemType: EventTypes.Type.Blade_or_Hide,
    level: 3,
    specials: { special1: 1, special2: 2, special3: 3 },
  },
  damage: 15,
  criticalHit: false,
  location: 2,
};

export const mockDiscoveredBeastEvent: EventTypes.DiscoveredBeastEvent = {
  adventurerState: createBasicAdventurerState(1),
  seed: 123456789,
  id: 6,
  beastSpecs: {
    tier: EventTypes.Tier.T3,
    itemType: EventTypes.Type.Magic_or_Cloth,
    level: 4,
    specials: { special1: 2, special2: 3, special3: 4 },
  },
};

export const mockAttackedBeastEvent: EventTypes.AttackedBeastEvent = {
  adventurerState: createBasicAdventurerState(1),
  seed: 246813579,
  id: 7,
  beastSpecs: {
    tier: EventTypes.Tier.T4,
    itemType: EventTypes.Type.Bludgeon_or_Metal,
    level: 5,
    specials: { special1: 3, special2: 4, special3: 5 },
  },
  damage: 25,
  criticalHit: true,
  location: 3,
};

export const mockAttackedByBeastEvent: EventTypes.AttackedByBeastEvent = {
  adventurerState: createBasicAdventurerState(1),
  seed: 135792468,
  id: 8,
  beastSpecs: {
    tier: EventTypes.Tier.T5,
    itemType: EventTypes.Type.Necklace,
    level: 6,
    specials: { special1: 4, special2: 5, special3: 6 },
  },
  damage: 30,
  criticalHit: false,
  location: 4,
};

export const mockSlayedBeastEvent: EventTypes.SlayedBeastEvent = {
  adventurerState: createBasicAdventurerState(1),
  seed: 369258147,
  id: 9,
  beastSpecs: {
    tier: EventTypes.Tier.T5,
    itemType: EventTypes.Type.Ring,
    level: 7,
    specials: { special1: 5, special2: 6, special3: 7 },
  },
  damageDealt: 50,
  criticalHit: true,
  xpEarnedAdventurer: 200,
  xpEarnedItems: 100,
  goldEarned: 75,
};

export const mockFleeFailedEvent: EventTypes.FleeFailedEvent = {
  adventurerState: createBasicAdventurerState(1),
  seed: 951753852,
  id: 10,
  beastSpecs: {
    tier: EventTypes.Tier.T3,
    itemType: EventTypes.Type.Blade_or_Hide,
    level: 4,
    specials: { special1: 2, special2: 3, special3: 4 },
  },
};

export const mockFleeSucceededEvent: EventTypes.FleeSucceededEvent = {
  adventurerState: createBasicAdventurerState(1),
  seed: 753951852,
  id: 11,
  beastSpecs: {
    tier: EventTypes.Tier.T4,
    itemType: EventTypes.Type.Magic_or_Cloth,
    level: 5,
    specials: { special1: 3, special2: 4, special3: 5 },
  },
};

export const mockPurchasedItemsEvent: EventTypes.PurchasedItemsEvent = {
  adventurerStateWithBag: {
    adventurerState: createBasicAdventurerState(1),
    bag: createBagState([1, 2]), // Add a proper bag structure if needed
  },
  purchases: [
    {
      item: {
        id: 1,
        tier: EventTypes.Tier.T1,
        itemType: EventTypes.Type.Blade_or_Hide,
        slot: EventTypes.Slot.Weapon,
      },
      price: 100,
    },
    {
      item: {
        id: 2,
        tier: EventTypes.Tier.T2,
        itemType: EventTypes.Type.Magic_or_Cloth,
        slot: EventTypes.Slot.Chest,
      },
      price: 150,
    },
  ],
};

export const mockPurchasedPotionsEvent: EventTypes.PurchasedPotionsEvent = {
  adventurerState: createBasicAdventurerState(1),
  quantity: 3,
  cost: 75,
  health: 50,
};

export const mockEquippedItemsEvent: EventTypes.EquippedItemsEvent = {
  adventurerStateWithBag: {
    adventurerState: createBasicAdventurerState(1),
    bag: createBagState([1, 2, 3]), // Add a proper bag structure if needed
  },
  equippedItems: [1, 2, 3],
  unequippedItems: [4, 5],
};

export const mockDroppedItemsEvent: EventTypes.DroppedItemsEvent = {
  adventurerStateWithBag: {
    adventurerState: createBasicAdventurerState(1),
    bag: createBagState([1, 2, 3]), // Add a proper bag structure if needed
  },
  itemIds: [6, 7, 8],
};

export const mockGreatnessIncreasedEvent: EventTypes.GreatnessIncreasedEvent = {
  adventurerState: createBasicAdventurerState(1),
  itemId: 3,
  previousLevel: 2,
  newLevel: 3,
};

export const mockItemsLeveledUpEvent: EventTypes.ItemsLeveledUpEvent = {
  adventurerState: createBasicAdventurerState(1),
  items: [
    {
      itemId: 1,
      previousLevel: 1,
      newLevel: 2,
      suffixUnlocked: true,
      prefixesUnlocked: false,
      specials: { special1: 1, special2: 2, special3: 3 },
    },
    {
      itemId: 2,
      previousLevel: 2,
      newLevel: 3,
      suffixUnlocked: false,
      prefixesUnlocked: true,
      specials: { special1: 2, special2: 3, special3: 4 },
    },
  ],
};

export const mockNewHighScoreEvent: EventTypes.NewHighScoreEvent = {
  adventurerState: createBasicAdventurerState(1),
  rank: 5,
};

export const mockAdventurerDiedEvent: EventTypes.AdventurerDiedEvent = {
  adventurerState: createBasicAdventurerState(1),
  killedByBeast: 7,
  killedByObstacle: 0,
  callerAddress: "0x9876543210987654321098765432109876543210",
};

export const mockAdventurerLeveledUpEvent: EventTypes.AdventurerLeveledUpEvent =
  {
    adventurerState: createBasicAdventurerState(1),
    previousLevel: 1,
    newLevel: 2,
  };

export const mockUpgradesAvailableEvent: EventTypes.UpgradesAvailableEvent = {
  adventurerState: createBasicAdventurerState(1),
  items: [1, 2, 3],
};

export const mockAdventurerUpgradedEvent: EventTypes.AdventurerUpgradedEvent = {
  adventurerStateWithBag: {
    adventurerState: createBasicAdventurerState(1),
    bag: createBagState([1, 2, 3]), // Add a proper bag structure if needed
  },
  strengthIncrease: 1,
  dexterityIncrease: 1,
  vitalityIncrease: 1,
  intelligenceIncrease: 1,
  wisdomIncrease: 1,
  charismaIncrease: 1,
};

export const mockERC721TransferEvent: EventTypes.ERC721TransferEvent = {
  from: "0x1111111111111111111111111111111111111111",
  to: "0x2222222222222222222222222222222222222222",
  tokenId: { low: 123, high: 0 },
};

export const encodedMockStartGameEvent = encodeEventData(mockStartGameEvent);
export const encodedMockDiscoveredHealthEvent = encodeEventData(
  mockDiscoveredHealthEvent
);
export const encodedMockDiscoveredGoldEvent = encodeEventData(
  mockDiscoveredGoldEvent
);
export const encodedMockDiscoveredXPEvent = encodeEventData(
  mockDiscoveredXPEvent
);
export const encodedMockDiscoveredLootEvent = encodeEventData(
  mockDiscoveredLootEvent
);
export const encodedMockEquipmentChangedEvent = encodeEventData(
  mockEquipmentChangedEvent
);
export const encodedMockDodgedObstacleEvent = encodeEventData(
  mockDodgedObstacleEvent
);
export const encodedMockHitByObstacleEvent = encodeEventData(
  mockHitByObstacleEvent
);
export const encodedMockAmbushedByBeastEvent = encodeEventData(
  mockAmbushedByBeastEvent
);
export const encodedMockDiscoveredBeastEvent = encodeEventData(
  mockDiscoveredBeastEvent
);
export const encodedMockAttackedBeastEvent = encodeEventData(
  mockAttackedBeastEvent
);
export const encodedMockAttackedByBeastEvent = encodeEventData(
  mockAttackedByBeastEvent
);
export const encodedMockSlayedBeastEvent =
  encodeEventData(mockSlayedBeastEvent);
export const encodedMockFleeFailedEvent = encodeEventData(mockFleeFailedEvent);
export const encodedMockFleeSucceededEvent = encodeEventData(
  mockFleeSucceededEvent
);
export const encodedMockPurchasedItemsEvent = encodeEventData(
  mockPurchasedItemsEvent
);
export const encodedMockPurchasedPotionsEvent = encodeEventData(
  mockPurchasedPotionsEvent
);
export const encodedMockEquippedItemsEvent = encodeEventData(
  mockEquippedItemsEvent
);
export const encodedMockDroppedItemsEvent = encodeEventData(
  mockDroppedItemsEvent
);
export const encodedMockGreatnessIncreasedEvent = encodeEventData(
  mockGreatnessIncreasedEvent
);
export const encodedMockItemsLeveledUpEvent = encodeEventData(
  mockItemsLeveledUpEvent
);
export const encodedMockNewHighScoreEvent = encodeEventData(
  mockNewHighScoreEvent
);
export const encodedMockAdventurerDiedEvent = encodeEventData(
  mockAdventurerDiedEvent
);
export const encodedMockAdventurerLeveledUpEvent = encodeEventData(
  mockAdventurerLeveledUpEvent
);
export const encodedMockUpgradesAvailableEvent = encodeEventData(
  mockUpgradesAvailableEvent
);
export const encodedMockAdventurerUpgradedEvent = encodeEventData(
  mockAdventurerUpgradedEvent
);
export const encodedMockERC721TransferEvent = encodeEventData(
  mockERC721TransferEvent
);

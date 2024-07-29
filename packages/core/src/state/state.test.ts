import { describe, it, expect, beforeEach, vi } from "vitest";

import {
  formatBeastData,
  parseAdventurerMeta,
  parseAdventurerState,
  parseBag,
  parseStartGameEvent,
} from "./format";

import * as mockEvents from "./mock";
import { useSurvivorStore } from ".";
import { Survivor } from "../objects/survivor";

describe("updateState with events", () => {
  beforeEach(() => {
    useSurvivorStore.setState({ survivor: new Survivor() });
  });

  it("should update state with StartGameEvent", () => {
    const { survivor } = useSurvivorStore.getState();

    survivor?.updateFromEvent(
      parseStartGameEvent(mockEvents.encodedMockStartGameEvent)
    );

    const updatedState = useSurvivorStore.getState().survivor;

    expect(updatedState?.name).toEqual(
      parseStartGameEvent(mockEvents.encodedMockStartGameEvent).event
        .adventurerMeta.name
    );

    expect(updatedState?.gold).toEqual(
      parseStartGameEvent(mockEvents.encodedMockStartGameEvent).event
        .adventurerState.adventurer.gold
    );
  });
  //   it("should update health with DiscoveredHealthEvent", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockDiscoveredHealthEvent
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //   });
  //   it("should update gold with DiscoveredGoldEvent", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockDiscoveredGoldEvent
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer?.gold).toEqual(
  //       adventurerState.adventurer.gold
  //     );
  //   });
  //   it("should update XP with DiscoveredXPEvent", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockDiscoveredXPEvent
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer?.xp).toEqual(adventurerState.adventurer.xp);
  //   });
  //   it("should update adventurer state after discovering loot", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockDiscoveredLootEvent
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //   });
  //   it("should update adventurer state after equipment change", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockEquipmentChangedEvent
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //   });
  //   it("should update adventurer state after dodging obstacle", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockDodgedObstacleEvent
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //   });
  //   it("should update adventurer state after being hit by obstacle", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockHitByObstacleEvent
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //   });
  //   it("should update adventurer state after being ambushed by beast", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockAmbushedByBeastEvent
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //   });
  //   it("should update adventurer state after discovering a beast", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockDiscoveredBeastEvent
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //   });
  //   it("should update adventurer state after attacking a beast", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockAttackedBeastEvent
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //   });
  //   it("should update adventurer state after being attacked by a beast", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockAttackedByBeastEvent
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //   });
  //   it("should update adventurer state after slaying a beast", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockSlayedBeastEvent
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //   });
  //   it("should update adventurer state after failing to flee", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockFleeFailedEvent
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //   });
  //   it("should update adventurer state after successfully fleeing", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockFleeSucceededEvent
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //   });
  //   it("should update adventurer state after purchasing items", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockPurchasedItemsEvent
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //   });
  //   it("should update adventurer state after purchasing potions", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockPurchasedPotionsEvent
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //   });
  //   it("should update adventurer state after equipping items", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockEquippedItemsEvent
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //   });
  //   it("should update adventurer state after dropping items", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockDroppedItemsEvent
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //   });
  //   it("should update adventurer state after greatness increase", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockGreatnessIncreasedEvent
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //   });
  //   it("should update adventurer state after items level up", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockItemsLeveledUpEvent
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //   });
  //   it("should update adventurer state after achieving new high score", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockNewHighScoreEvent
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //   });
  //   it("should update adventurer state after adventurer dies", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockAdventurerDiedEvent
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //   });
  //   it("should update adventurer state after leveling up", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockAdventurerLeveledUpEvent
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //   });
  //   it("should update adventurer state when upgrades are available", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockUpgradesAvailableEvent
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //   });
  //   it("should update adventurer state after upgrading", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockAdventurerUpgradedEvent
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //   });
  //   it("should update adventurer state and bag after equipment change", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockEquipmentChangedEvent.slice(0, 31)
  //     );
  //     const bag = parseBag(
  //       mockEvents.encodedMockEquipmentChangedEvent.slice(31, 62)
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //       bag,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //     expect(updatedState.bag).toEqual(bag);
  //   });
  //   it("should update adventurer state and bag after purchasing items", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockPurchasedItemsEvent.slice(0, 31)
  //     );
  //     const bag = parseBag(
  //       mockEvents.encodedMockPurchasedItemsEvent.slice(31, 62)
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //       bag,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //     expect(updatedState.bag).toEqual(bag);
  //   });
  //   it("should update adventurer state and bag after equipping items", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockEquippedItemsEvent.slice(0, 31)
  //     );
  //     const bag = parseBag(
  //       mockEvents.encodedMockEquippedItemsEvent.slice(31, 62)
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //       bag,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //     expect(updatedState.bag).toEqual(bag);
  //   });
  //   it("should update adventurer state and bag after dropping items", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockDroppedItemsEvent.slice(0, 31)
  //     );
  //     const bag = parseBag(mockEvents.encodedMockDroppedItemsEvent.slice(31, 62));
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //       bag,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //     expect(updatedState.bag).toEqual(bag);
  //   });
  //   it("should update adventurer state and bag after upgrading", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockAdventurerUpgradedEvent.slice(0, 31)
  //     );
  //     const bag = parseBag(
  //       mockEvents.encodedMockAdventurerUpgradedEvent.slice(31, 62)
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //       bag,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //     expect(updatedState.bag).toEqual(bag);
  //   });
  //   it("should update beast state when discovering a beast", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockDiscoveredBeastEvent
  //     );
  //     const formattedBeast = formatBeastData(mockEvents.mockDiscoveredBeastEvent);
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //       beast: formattedBeast,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //     expect(updatedState.beast).toEqual(formattedBeast);
  //   });
  //   it("should update beast state when ambushed by a beast", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockAmbushedByBeastEvent
  //     );
  //     const formattedBeast = formatBeastData(mockEvents.mockAmbushedByBeastEvent);
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //       beast: formattedBeast,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //     expect(updatedState.beast).toEqual(formattedBeast);
  //   });
  //   it("should update beast state when attacking a beast", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockAttackedBeastEvent
  //     );
  //     const formattedBeast = formatBeastData(mockEvents.mockAttackedBeastEvent);
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //       beast: formattedBeast,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //     expect(updatedState.beast).toEqual(formattedBeast);
  //   });
  //   it("should clear beast state when slaying a beast", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockSlayedBeastEvent
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //       beast: undefined,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //     expect(updatedState.beast).toBeUndefined();
  //   });
  //   it("should clear beast state when successfully fleeing", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const adventurerState = parseAdventurerState(
  //       mockEvents.encodedMockFleeSucceededEvent
  //     );
  //     updateGameState({
  //       adventurer: adventurerState.adventurer,
  //       beast: undefined,
  //     });
  //     const updatedState = useGameStateStore.getState().gameState;
  //     expect(updatedState.adventurer).toEqual(adventurerState.adventurer);
  //     expect(updatedState.beast).toBeUndefined();
  //   });
  // });
  // describe("updateState with multiple sequential events", () => {
  //   beforeEach(() => {
  //     useGameStateStore.setState({ gameState: {} });
  //   });
  //   it("should correctly update state after a sequence of events", () => {
  //     const { updateGameState } = useGameStateStore.getState();
  //     const getState = () => useGameStateStore.getState().gameState;
  //     // Start game
  //     const initialAdventurer =
  //       mockEvents.mockStartGameEvent.adventurerState.adventurer;
  //     updateGameState({ adventurer: initialAdventurer });
  //     expect(getState().adventurer).toEqual(initialAdventurer);
  //     // Discover gold
  //     const goldEvent = mockEvents.mockDiscoveredGoldEvent;
  //     updateGameState({
  //       adventurer: {
  //         ...getState().adventurer!,
  //         gold: (getState().adventurer?.gold || 0) + goldEvent.goldAmount,
  //       },
  //     });
  //     expect(getState().adventurer?.gold).toEqual(
  //       initialAdventurer.gold + goldEvent.goldAmount
  //     );
  //     // Discover XP
  //     const xpEvent = mockEvents.mockDiscoveredXPEvent;
  //     updateGameState({
  //       adventurer: {
  //         ...getState().adventurer!,
  //         xp: (getState().adventurer?.xp || 0) + xpEvent.xpAmount,
  //       },
  //     });
  //     expect(getState().adventurer?.xp).toEqual(
  //       initialAdventurer.xp + xpEvent.xpAmount
  //     );
  //     // Encounter a beast
  //     const beastEvent = mockEvents.mockDiscoveredBeastEvent;
  //     const beast = formatBeastData(beastEvent);
  //     updateGameState({ beast });
  //     expect(getState().beast).toEqual(beast);
  //     // Attack the beast
  //     const attackEvent = mockEvents.mockAttackedBeastEvent;
  //     updateGameState({
  //       adventurer: {
  //         ...getState().adventurer!,
  //         beastHealth: beast.health - attackEvent.damage,
  //       },
  //       beast: {
  //         ...getState().beast!,
  //         health: beast.health - attackEvent.damage,
  //       },
  //     });
  //     expect(getState().adventurer?.beastHealth).toEqual(
  //       beast.health - attackEvent.damage
  //     );
  //     expect(getState().beast?.health).toEqual(beast.health - attackEvent.damage);
  //     // Slay the beast
  //     const slayEvent = mockEvents.mockSlayedBeastEvent;
  //     updateGameState({
  //       adventurer: {
  //         ...getState().adventurer!,
  //         gold: (getState().adventurer?.gold || 0) + slayEvent.goldEarned,
  //         xp: (getState().adventurer?.xp || 0) + slayEvent.xpEarnedAdventurer,
  //         beastHealth: 0,
  //       },
  //       beast: undefined,
  //     });
  //     expect(getState().adventurer?.gold).toEqual(
  //       initialAdventurer.gold + goldEvent.goldAmount + slayEvent.goldEarned
  //     );
  //     expect(getState().adventurer?.xp).toEqual(
  //       initialAdventurer.xp + xpEvent.xpAmount + slayEvent.xpEarnedAdventurer
  //     );
  //     expect(getState().adventurer?.beastHealth).toEqual(0);
  //     expect(getState().beast).toBeUndefined();
  //     // Level up
  //     const levelUpEvent = mockEvents.mockAdventurerUpgradedEvent;
  //     updateGameState({
  //       adventurer:
  //         levelUpEvent.adventurerStateWithBag.adventurerState.adventurer,
  //     });
  //     const finalState = getState().adventurer;
  //     expect(finalState?.stats).toEqual(
  //       levelUpEvent.adventurerStateWithBag.adventurerState.adventurer.stats
  //     );
  //     expect(finalState?.statUpgradesAvailable).toEqual(
  //       levelUpEvent.adventurerStateWithBag.adventurerState.adventurer
  //         .statUpgradesAvailable
  //     );
  //     // TODO: e2e test. We need to increment the mock data to include the next event
  //     // // Final state check
  //     // expect(finalState).toMatchObject({
  //     //   gold:
  //     //     initialAdventurer.gold + goldEvent.goldAmount + slayEvent.goldEarned,
  //     //   xp:
  //     //     initialAdventurer.xp + xpEvent.xpAmount + slayEvent.xpEarnedAdventurer,
  //     //   beastHealth: 0,
  //     //   stats:
  //     //     levelUpEvent.adventurerStateWithBag.adventurerState.adventurer.stats,
  //     //   statUpgradesAvailable:
  //     //     levelUpEvent.adventurerStateWithBag.adventurerState.adventurer
  //     //       .statUpgradesAvailable,
  //     // });
  //   });
});

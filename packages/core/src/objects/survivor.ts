import { useSurvivorStore } from "../state";
import {
  Stats,
  Item,
  ItemSlot,
  StatType,
  Bag,
  Beast,
  Battle,
  Discovery,
  SELECTORS,
} from "../type";

import * as EventTypes from "../type/events";

export class Survivor {
  id: number | null = null;
  name: number | null = null;
  owner: string | null = null;
  stats: Stats = {
    strength: 0,
    dexterity: 0,
    vitality: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
    luck: 0,
  };
  health: number = 0;
  maxHealth: number = 0;
  xp: number = 0;
  level: number = 1;
  gold: number = 0;
  items: Record<ItemSlot, Item> = {
    [ItemSlot.Weapon]: { slot: ItemSlot.Weapon, xp: 0 },
    [ItemSlot.Chest]: { slot: ItemSlot.Chest, xp: 0 },
    [ItemSlot.Head]: { slot: ItemSlot.Head, xp: 0 },
    [ItemSlot.Waist]: { slot: ItemSlot.Waist, xp: 0 },
    [ItemSlot.Foot]: { slot: ItemSlot.Foot, xp: 0 },
    [ItemSlot.Hand]: { slot: ItemSlot.Hand, xp: 0 },
    [ItemSlot.Neck]: { slot: ItemSlot.Neck, xp: 0 },
    [ItemSlot.Ring]: { slot: ItemSlot.Ring, xp: 0 },
  };
  bag: Bag | null = null;

  beast: Beast | null = null;

  startEntropy: string | null = null;
  adventurerEntropy: string | null = null;
  startingStats: Stats | null = null;
  interfaceCamel: boolean = false;

  battle: Battle | null = null;

  discovery: Discovery | null = null;

  revealBlock: number | null = null;

  constructor() {}

  updateFromEvents(events: { name: string; event: any }[]): void {
    for (const event of events) {
      this.updateFromEvent(event);
    }
  }

  updateFromEvent(event: { name: string; event: any }): void {
    switch (event.name) {
      case SELECTORS.StartGame:
        this.handleStartGameEvent(event.event as EventTypes.StartGameEvent);
        break;
      case SELECTORS.AdventurerUpgraded:
        this.handleAdventurerUpgradedEvent(
          event.event as EventTypes.AdventurerUpgradedEvent
        );
        break;
      case SELECTORS.DiscoveredHealth:
        this.handleDiscoveredHealthEvent(
          event.event as EventTypes.DiscoveredHealthEvent
        );
        break;
      case SELECTORS.DiscoveredGold:
        this.handleDiscoveredGoldEvent(
          event.event as EventTypes.DiscoveredGoldEvent
        );
        break;
      case SELECTORS.DiscoveredXP:
        this.handleDiscoveredXPEvent(
          event.event as EventTypes.DiscoveredXPEvent
        );
        break;
      case SELECTORS.DiscoveredLoot:
        this.handleDiscoveredLootEvent(
          event.event as EventTypes.DiscoveredLootEvent
        );
        break;
      case SELECTORS.EquipmentChanged:
        this.handleEquipmentChangedEvent(
          event.event as EventTypes.EquipmentChangedEvent
        );
        break;
      case SELECTORS.DodgedObstacle:
        this.handleDodgedObstacleEvent(
          event.event as EventTypes.DodgedObstacleEvent
        );
        break;
      case SELECTORS.HitByObstacle:
        this.handleHitByObstacleEvent(
          event.event as EventTypes.HitByObstacleEvent
        );
        break;
      // case "DiscoveredBeastEvent":
      //   this.handleDiscoveredBeastEvent(
      //     event as EventTypes.DiscoveredBeastEvent
      //   );
      //   break;
      // case "AmbushedByBeastEvent":
      //   this.handleAmbushedByBeastEvent(
      //     event as EventTypes.AmbushedByBeastEvent
      //   );
      //   break;
      case SELECTORS.AttackedBeast:
        this.handleAttackedBeastEvent(
          event.event as EventTypes.AttackedBeastEvent
        );
        break;
      case SELECTORS.AttackedByBeast:
        this.handleAttackedByBeastEvent(
          event.event as EventTypes.AttackedByBeastEvent
        );
        break;
      case SELECTORS.SlayedBeast:
        this.handleSlayedBeastEvent(event.event as EventTypes.SlayedBeastEvent);
        break;
      case SELECTORS.FleeFailed:
        this.handleFleeFailedEvent(event.event as EventTypes.FleeFailedEvent);
        break;
      case SELECTORS.FleeSucceeded:
        this.handleFleeSucceededEvent(
          event.event as EventTypes.FleeSucceededEvent
        );
        break;
      case SELECTORS.PurchasedItems:
        this.handlePurchasedItemsEvent(
          event.event as EventTypes.PurchasedItemsEvent
        );
        break;
      case SELECTORS.PurchasedPotions:
        this.handlePurchasedPotionsEvent(
          event.event as EventTypes.PurchasedPotionsEvent
        );
        break;
      case SELECTORS.EquippedItems:
        this.handleEquippedItemsEvent(
          event.event as EventTypes.EquippedItemsEvent
        );
        break;
      case SELECTORS.DroppedItems:
        this.handleDroppedItemsEvent(
          event.event as EventTypes.DroppedItemsEvent
        );
        break;
      case SELECTORS.GreatnessIncreased:
        this.handleGreatnessIncreasedEvent(
          event.event as EventTypes.GreatnessIncreasedEvent
        );
        break;
      case SELECTORS.ItemsLeveledUp:
        this.handleItemsLeveledUpEvent(
          event.event as EventTypes.ItemsLeveledUpEvent
        );
        break;
      case SELECTORS.NewHighScore:
        this.handleNewHighScoreEvent(
          event.event as EventTypes.NewHighScoreEvent
        );
        break;
      case SELECTORS.AdventurerDied:
        this.handleAdventurerDiedEvent(
          event.event as EventTypes.AdventurerDiedEvent
        );
        break;
      case SELECTORS.AdventurerLeveledUp:
        this.handleAdventurerLeveledUpEvent(
          event.event as EventTypes.AdventurerLeveledUpEvent
        );
        break;
      case SELECTORS.UpgradesAvailable:
        this.handleUpgradesAvailableEvent(
          event.event as EventTypes.UpgradesAvailableEvent
        );
        break;
      default:
        console.warn(`Unhandled event type: ${event.name}`);
    }
    this.updateStore();
  }

  private updateStore(): void {
    useSurvivorStore.getState().updateSurvivor(this);
  }

  private handleStartGameEvent(event: EventTypes.StartGameEvent): void {
    const { adventurerState, adventurerMeta, revealBlock } = event;
    this.updateFromAdventurerState(adventurerState);
    this.startEntropy = adventurerMeta.startEntropy;
    this.startingStats = adventurerMeta.startingStats;
    this.interfaceCamel = adventurerMeta.interfaceCamel;
    this.name = adventurerMeta.name;
    this.revealBlock = revealBlock;
  }

  private handleAdventurerUpgradedEvent(
    event: EventTypes.AdventurerUpgradedEvent
  ): void {
    const { adventurerStateWithBag } = event;
    this.updateFromAdventurerState(adventurerStateWithBag.adventurerState);
    this.bag = adventurerStateWithBag.bag;

    // You might want to store or use the stat increases
  }

  private handleDiscoveredHealthEvent(
    event: EventTypes.DiscoveredHealthEvent
  ): void {
    this.updateFromAdventurerState(event.adventurerState);
  }

  private handleDiscoveredGoldEvent(
    event: EventTypes.DiscoveredGoldEvent
  ): void {
    this.updateFromAdventurerState(event.adventurerState);
  }

  private handleDiscoveredXPEvent(event: EventTypes.DiscoveredXPEvent): void {
    this.updateFromAdventurerState(event.adventurerState);
  }

  private handleDiscoveredLootEvent(
    event: EventTypes.DiscoveredLootEvent
  ): void {
    this.updateFromAdventurerState(event.adventurerState);
    // Handle the discovered item (you might want to add it to the bag or equipment)
  }

  private handleEquipmentChangedEvent(
    event: EventTypes.EquipmentChangedEvent
  ): void {
    this.updateFromAdventurerState(
      event.adventurerStateWithBag.adventurerState
    );
    this.bag = event.adventurerStateWithBag.bag;
    // Update equipment based on equippedItems, baggedItems, and droppedItems
  }

  private handleDodgedObstacleEvent(
    event: EventTypes.DodgedObstacleEvent
  ): void {
    this.updateFromAdventurerState(event.adventurerState);
    this.addXp(event.xpEarnedAdventurer);
    // Handle xpEarnedItems if needed
  }

  private handleHitByObstacleEvent(event: EventTypes.HitByObstacleEvent): void {
    this.updateFromAdventurerState(event.adventurerState);
    this.takeDamage(event.damageTaken);
    this.addXp(event.xpEarnedAdventurer);
    // Handle xpEarnedItems if needed
  }

  // private handleDiscoveredBeastEvent(
  //   event: EventTypes.DiscoveredBeastEvent
  // ): void {
  //   this.updateFromAdventurerState(event.adventurerState);
  //   this.beast = {
  //     id: event.id,
  //     seed: event.seed,
  //     specs: event.beastSpecs,
  //   };
  // }

  // private handleAmbushedByBeastEvent(
  //   event: EventTypes.AmbushedByBeastEvent
  // ): void {
  //   this.updateFromAdventurerState(event.adventurerState);
  //   this.takeDamage(event.damage);
  //   this.beast = {
  //     beast: event.id.toString(),
  //     seed: event.seed.toString(),
  //     specs: event.beastSpecs,
  //   };
  // }

  private handleAttackedBeastEvent(event: EventTypes.AttackedBeastEvent): void {
    this.updateFromAdventurerState(event.adventurerState);
    // Update beast health or state if needed
  }

  private handleAttackedByBeastEvent(
    event: EventTypes.AttackedByBeastEvent
  ): void {
    this.updateFromAdventurerState(event.adventurerState);
  }

  private handleSlayedBeastEvent(event: EventTypes.SlayedBeastEvent): void {
    this.updateFromAdventurerState(event.adventurerState);
    this.beast = null;
    // Handle xpEarnedItems if needed
  }

  private handleFleeFailedEvent(event: EventTypes.FleeFailedEvent): void {
    this.updateFromAdventurerState(event.adventurerState);
    // The beast remains, possibly update its state
  }

  private handleFleeSucceededEvent(event: EventTypes.FleeSucceededEvent): void {
    this.updateFromAdventurerState(event.adventurerState);
    this.beast = null;
  }

  private handlePurchasedItemsEvent(
    event: EventTypes.PurchasedItemsEvent
  ): void {
    this.updateFromAdventurerState(
      event.adventurerStateWithBag.adventurerState
    );
    this.bag = event.adventurerStateWithBag.bag;
    // Handle purchased items (add to bag or equipment)
  }

  private handlePurchasedPotionsEvent(
    event: EventTypes.PurchasedPotionsEvent
  ): void {
    this.updateFromAdventurerState(event.adventurerState);
    this.gold -= event.cost;
    this.heal(event.health);
  }

  private handleEquippedItemsEvent(event: EventTypes.EquippedItemsEvent): void {
    this.updateFromAdventurerState(
      event.adventurerStateWithBag.adventurerState
    );
    this.bag = event.adventurerStateWithBag.bag;
  }

  private handleDroppedItemsEvent(event: EventTypes.DroppedItemsEvent): void {
    this.updateFromAdventurerState(
      event.adventurerStateWithBag.adventurerState
    );
    this.bag = event.adventurerStateWithBag.bag;
  }

  private handleGreatnessIncreasedEvent(
    event: EventTypes.GreatnessIncreasedEvent
  ): void {
    this.updateFromAdventurerState(event.adventurerState);
  }

  private handleItemsLeveledUpEvent(
    event: EventTypes.ItemsLeveledUpEvent
  ): void {
    this.updateFromAdventurerState(event.adventurerState);
  }

  private handleNewHighScoreEvent(event: EventTypes.NewHighScoreEvent): void {
    this.updateFromAdventurerState(event.adventurerState);
  }

  private handleAdventurerDiedEvent(
    event: EventTypes.AdventurerDiedEvent
  ): void {
    this.updateFromAdventurerState(event.adventurerState);
  }

  private handleAdventurerLeveledUpEvent(
    event: EventTypes.AdventurerLeveledUpEvent
  ): void {
    this.updateFromAdventurerState(event.adventurerState);
    this.level = event.newLevel;
  }

  private handleUpgradesAvailableEvent(
    event: EventTypes.UpgradesAvailableEvent
  ): void {
    this.updateFromAdventurerState(event.adventurerState);
  }

  private updateFromAdventurerState(state: EventTypes.AdventurerState): void {
    this.id = state.adventurerId;
    this.owner = state.owner;
    this.health = state.adventurer.health;
    this.xp = state.adventurer.xp;
    this.gold = state.adventurer.gold;
    this.stats = state.adventurer.stats;
    this.items = this.convertEquipmentToItems(state.adventurer.equipment);
    this.maxHealth = this.calculateMaxHealth();
    this.level = this.calculateLevel();
    this.adventurerEntropy = state.adventurerEntropy;
  }

  private convertEquipmentToItems(
    equipment: Record<string, EventTypes.LootStatistics>
  ): Record<ItemSlot, Item> {
    const items: Record<ItemSlot, Item> = {} as Record<ItemSlot, Item>;
    for (const [slot, equip] of Object.entries(equipment)) {
      items[slot as ItemSlot] = {
        slot: slot as ItemSlot,
        xp: equip.xp,
      };
    }
    return items;
  }

  calculateMaxHealth(): number {
    return this.stats.vitality * 10;
  }

  calculateLevel(): number {
    return Math.max(Math.floor(Math.sqrt(this.xp)), 1);
  }

  getStat(stat: StatType): number {
    return this.stats[StatType[stat].toLowerCase() as keyof Stats];
  }

  updateStat(stat: StatType, value: number): void {
    const statKey = StatType[stat].toLowerCase() as keyof Stats;
    this.stats[statKey] = value;
    if (stat === StatType.Vitality) {
      this.maxHealth = this.calculateMaxHealth();
    }
  }

  unequipItem(slot: ItemSlot): void {
    this.items[slot] = { slot };
  }

  addXp(amount: number): void {
    this.xp += amount;
    this.level = this.calculateLevel();
  }

  addGold(amount: number): void {
    this.gold += amount;
  }

  takeDamage(amount: number): void {
    this.health = Math.max(0, this.health - amount);
  }

  heal(amount: number): void {
    this.health = Math.min(this.maxHealth, this.health + amount);
  }
}

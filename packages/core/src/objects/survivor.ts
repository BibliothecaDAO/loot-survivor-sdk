import {
  ITEM_BASE_PRICE,
  ITEM_CHARISMA_DISCOUNT,
  ITEM_MINIMUM_PRICE,
  POTION_BASE_PRICE,
} from "../constants";
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
  // Loot,
} from "../type";

import * as EventTypes from "../type/events";
import { BeastManager } from "./beasts";
import { LootManager } from "./loot";

export class Survivor {
  private beasts: BeastManager = new BeastManager();
  private previousState: Partial<Survivor> | null = null;

  id: number | null = null;
  name: number | null = null;
  owner: string | null = null;
  statUpgradesAvailable: number = 0;
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

  getItemsWithBoosts(): Record<ItemSlot, LootManager> {
    return {
      [ItemSlot.Weapon]: new LootManager(
        parseInt(this.items[ItemSlot.Weapon]?.item!) ?? null,
        this.items[ItemSlot.Weapon]?.xp ?? 0,
        BigInt(this.adventurerEntropy ?? "0")
      ),
      [ItemSlot.Chest]: new LootManager(
        parseInt(this.items[ItemSlot.Chest]?.item!) ?? null,
        this.items[ItemSlot.Chest]?.xp ?? 0,
        BigInt(this.adventurerEntropy ?? "0")
      ),
      [ItemSlot.Head]: new LootManager(
        parseInt(this.items[ItemSlot.Head]?.item!) ?? null,
        this.items[ItemSlot.Head]?.xp ?? 0,
        BigInt(this.adventurerEntropy ?? "0")
      ),
      [ItemSlot.Waist]: new LootManager(
        parseInt(this.items[ItemSlot.Waist]?.item!) ?? null,
        this.items[ItemSlot.Waist]?.xp ?? 0,
        BigInt(this.adventurerEntropy ?? "0")
      ),
      [ItemSlot.Foot]: new LootManager(
        parseInt(this.items[ItemSlot.Foot]?.item!) ?? null,
        this.items[ItemSlot.Foot]?.xp ?? 0,
        BigInt(this.adventurerEntropy ?? "0")
      ),
      [ItemSlot.Hand]: new LootManager(
        parseInt(this.items[ItemSlot.Hand]?.item!) ?? null,
        this.items[ItemSlot.Hand]?.xp ?? 0,
        BigInt(this.adventurerEntropy ?? "0")
      ),
      [ItemSlot.Neck]: new LootManager(
        parseInt(this.items[ItemSlot.Neck]?.item!) ?? null,
        this.items[ItemSlot.Neck]?.xp ?? 0,
        BigInt(this.adventurerEntropy ?? "0")
      ),
      [ItemSlot.Ring]: new LootManager(
        parseInt(this.items[ItemSlot.Ring]?.item!) ?? null,
        this.items[ItemSlot.Ring]?.xp ?? 0,
        BigInt(this.adventurerEntropy ?? "0")
      ),
    };
  }

  setOptimisticState(newState: Partial<Survivor>): void {
    // Store the current state
    this.previousState = {
      health: this.health,
      maxHealth: this.maxHealth,
      xp: this.xp,
      level: this.level,
      gold: this.gold,
      stats: { ...this.stats },
      items: { ...this.items },
      bag: this.bag,
      beast: this.beast,
      battle: this.battle,
    };

    // Apply the new state
    Object.assign(this, newState);

    // Update derived properties
    this.maxHealth = this.calculateMaxHealth();
    this.level = this.calculateLevel();

    // Update the store
    this.updateStore();
  }

  revertOptimisticState(): void {
    if (this.previousState) {
      Object.assign(this, this.previousState);
      this.previousState = null;
      this.updateStore();
    }
  }

  confirmOptimisticState(): void {
    // Clear the previous state
    this.previousState = null;
  }

  updateFromEvents(events: { name: string; event: any }[]): void {
    for (const event of events) {
      this.updateFromEvent(event);
    }
  }

  getItemPrice(tier: number) {
    const price =
      (6 - tier) * ITEM_BASE_PRICE -
      ITEM_CHARISMA_DISCOUNT * this.stats.charisma;
    if (price < ITEM_MINIMUM_PRICE) {
      return ITEM_MINIMUM_PRICE;
    } else {
      return price;
    }
  }

  getPotionPrice() {
    return Math.max(
      this.calculateLevel() - POTION_BASE_PRICE * this.stats.charisma,
      1
    );
  }

  checkAvailableSlots(): boolean {
    const equippedItemsCount = Object.values(this.items).filter(
      (item) => item.xp !== undefined
    ).length;
    const bagItemsCount = this.bag
      ? Object.keys(this.bag).filter((key) => key !== "mutated").length
      : 0;
    const totalItemsCount = equippedItemsCount + bagItemsCount;

    const maxItemSlots = 20; // Assuming the maximum is still 20

    return totalItemsCount < maxItemSlots;
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
      case SELECTORS.DiscoveredBeast:
        this.handleDiscoveredBeastEvent(
          event.event as EventTypes.DiscoveredBeastEvent
        );
        break;
      case SELECTORS.AmbushedByBeast:
        this.handleAmbushedByBeastEvent(
          event.event as EventTypes.AmbushedByBeastEvent
        );
        break;
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
  }

  private handleEquipmentChangedEvent(
    event: EventTypes.EquipmentChangedEvent
  ): void {
    this.updateFromAdventurerState(
      event.adventurerStateWithBag.adventurerState
    );
    this.bag = event.adventurerStateWithBag.bag;
  }

  private handleDodgedObstacleEvent(
    event: EventTypes.DodgedObstacleEvent
  ): void {
    this.updateFromAdventurerState(event.adventurerState);
  }

  private handleHitByObstacleEvent(event: EventTypes.HitByObstacleEvent): void {
    this.updateFromAdventurerState(event.adventurerState);
  }

  private handleDiscoveredBeastEvent(
    event: EventTypes.DiscoveredBeastEvent
  ): void {
    this.updateFromAdventurerState(event.adventurerState);

    this.beast = this.createBeastObject(event);
    this.battle = this.createBattleObject(event, "adventurer");
  }

  private handleAmbushedByBeastEvent(
    event: EventTypes.AmbushedByBeastEvent
  ): void {
    this.updateFromAdventurerState(event.adventurerState);
    this.takeDamage(event.damage);

    this.beast = this.createBeastObject(event);
    this.battle = this.createBattleObject(event, "beast");
  }

  private handleAttackedBeastEvent(event: EventTypes.AttackedBeastEvent): void {
    this.updateFromAdventurerState(event.adventurerState);

    this.beast = this.createBeastObject(event);
    this.battle = this.createBattleObject(event, "adventurer");
  }

  private handleAttackedByBeastEvent(
    event: EventTypes.AttackedByBeastEvent
  ): void {
    this.updateFromAdventurerState(event.adventurerState);

    this.beast = this.createBeastObject(event);
    this.battle = this.createBattleObject(event, "beast");
  }

  private handleSlayedBeastEvent(event: EventTypes.SlayedBeastEvent): void {
    this.updateFromAdventurerState(event.adventurerState);
    this.beast = null;
    this.battle = null;
  }

  private handleFleeFailedEvent(event: EventTypes.FleeFailedEvent): void {
    this.updateFromAdventurerState(event.adventurerState);
  }

  private handleFleeSucceededEvent(event: EventTypes.FleeSucceededEvent): void {
    this.updateFromAdventurerState(event.adventurerState);
    this.beast = null;
    this.battle = null;
  }

  private handlePurchasedItemsEvent(
    event: EventTypes.PurchasedItemsEvent
  ): void {
    this.updateFromAdventurerState(
      event.adventurerStateWithBag.adventurerState
    );
    this.bag = event.adventurerStateWithBag.bag;
  }

  private handlePurchasedPotionsEvent(
    event: EventTypes.PurchasedPotionsEvent
  ): void {
    this.updateFromAdventurerState(event.adventurerState);
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
    this.statUpgradesAvailable = state.adventurer.statUpgradesAvailable;
  }

  private createBeastObject(event: any): Beast {
    return {
      beast: this.beasts.getBeastName(event.id),
      createdTime: new Date().getTime().toString(),
      seed: event.seed.toString(),
      level: event.beastSpecs.level,
      slainOnTime: null,
      special1: event.beastSpecs.specials.special1,
      special2: event.beastSpecs.specials.special2,
      special3: event.beastSpecs.specials.special3,
      adventurerId: this.id as number,
      lastUpdatedTime: new Date().getTime().toString(),
      health: event.adventurerState.adventurer.beastHealth,
      timestamp: new Date().getTime().toString(),
    };
  }

  private createBattleObject(
    event: any,
    attacker: "adventurer" | "beast"
  ): Battle {
    return {
      attacker,
      adventurerId: this.id as number,
      beast: this.beasts.getBeastName(event.id),
      beastHealth: event.adventurerState.adventurer.beastHealth,
      beastLevel: event.beastSpecs.level,
      blockTime: new Date().toISOString(),
      criticalHit: event.criticalHit,
      damageDealt: attacker === "adventurer" ? event.damage : 0,
      damageLocation: event.location.toString(),
      damageTaken: attacker === "beast" ? event.damage : 0,
      discoveryTime: new Date().toISOString(),
      fled: false,
      goldEarned: 0,
      seed: event.seed.toString(),
      special1: event.beastSpecs.specials.special1,
      special2: event.beastSpecs.specials.special2,
      special3: event.beastSpecs.specials.special3,
      timestamp: new Date().getTime().toString(),
      txHash: "",
      xpEarnedAdventurer: 0,
      xpEarnedItems: 0,
    };
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

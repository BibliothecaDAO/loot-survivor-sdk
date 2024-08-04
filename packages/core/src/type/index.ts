import { hash } from "starknet";
import { Adventurer, AdventurerMetadata, Bag } from "./events";

export * from "./events";

export interface Stats {
    strength: number;
    dexterity: number;
    vitality: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    luck: number;
}

export interface ItemPurchase {
    item_id: number;
    equip: boolean;
}

export type MulticallEntry =
    | {
          entrypoint: "new_game";
          calldata: [string, number, string, bigint, bigint];
      }
    | { entrypoint: "explore"; calldata: [string, number] }
    | { entrypoint: "attack"; calldata: [string, number] }
    | { entrypoint: "flee"; calldata: [string, number] }
    | { entrypoint: "equip"; calldata: [string, ...number[]] }
    | { entrypoint: "drop"; calldata: [string, ...number[]] }
    | {
          entrypoint: "upgrade";
          calldata: [string, number, ...number[]];
      }
    | { entrypoint: "update_cost_to_play"; calldata: [] };

export interface Beast {
    adventurerId: number;
    beast: string;
    createdTime: string;
    health: number;
    lastUpdatedTime: string;
    level: number;
    seed: string;
    slainOnTime: string | null;
    special1: number;
    special2: number;
    special3: number;
    timestamp: string;
}

export interface BeastEncounter {
    encounter: string;
    id: bigint;
    type: string;
    tier: number;
    level: number;
    health: number;
    location: string;
    dodgeRoll: number;
    nextXp: number;
    specialName: string;
    criticalMultiplier: number;
    damage: number;
}

export interface Item {
    slot: string;
    item?: string;
    type?: string;
    xp?: number;
    level?: number;
    tier?: number;
    cost?: number;
    purchaseTime?: string;
    equipped?: string;
    special1?: string;
    special2?: string;
    special3?: string;
}

export interface Encounter {
    encounter: string;
    id?: bigint;
    type: string;
    tier: string | number;
    level?: number;
    health?: number;
    location?: string;
    dodgeRoll?: number;
    nextXp: number;
    specialName?: string;
    criticalMultiplier?: number;
    damage?: number;
}

export interface CombatResult {
    totalDamage: number;
    isCriticalHit: boolean;
}

export interface BattleEvent {
    type: string;
    totalDamage: number;
    isCriticalHit: boolean;
    beastDamageType?: string;
    location?: string;
}

export interface AdventurerComplete {
    id: number;
    beastHealth: number;
    charisma: number;
    chest: string;
    createdTime: string;
    dexterity: number;
    entropy: string;
    foot: string;
    gold: number;
    hand: string;
    head: string;
    health: number;
    intelligence: number;
    lastUpdatedTime: string;
    luck: number;
    name: string;
    neck: string;
    owner: string;
    revealBlock: number;
    ring: string;
    startEntropy: string;
    statUpgrades: number;
    strength: number;
    timestamp: string;
    vitality: number;
    waist: string;
    weapon: string;
    wisdom: number;
    xp: number;
}

export interface Battle {
    attacker: string;
    adventurerId: number;
    beast: string;
    beastHealth: number;
    beastLevel: number;
    blockTime: string;
    criticalHit: boolean;
    damageDealt: number;
    damageLocation: string;
    damageTaken: number;
    discoveryTime: string;
    fled: boolean;
    goldEarned: number;
    seed: string;
    special1: number;
    special2: number;
    special3: number;
    timestamp: string;
    txHash: string;
    xpEarnedAdventurer: number;
    xpEarnedItems: number;
}

export interface Discovery {
    adventurerHealth: number;
    adventurerId: number;
    ambushed: boolean;
    damageLocation: string;
    damageTaken: number;
    discoveryTime: string;
    discoveryType: string;
    dodgedObstacle: boolean;
    entity: string;
    entityHealth: number;
    entityLevel: number;
    obstacle: string;
    obstacleLevel: number;
    outputAmount: number;
    seed: string;
    special1: number;
    special2: number;
    special3: number;
    subDiscoveryType: string;
    timestamp: string;
    txHash: string;
    xpEarnedAdventurer: number;
    xpEarnedItems: number;
}

export interface Score {
    adventurerId: number;
    timestamp: string;
    totalPayout: number;
}

export interface GameState {
    beast: Beast;
    adventurer: Adventurer;
    adventurerMetadata: AdventurerMetadata;
    currentBattle: Battle;
    lastDiscovery: Discovery;
    bag: Bag;
    revealBlock: number;
}

export enum Beasts {
    Warlock = 1,
    Typhon = 2,
    Jiangshi = 3,
    Anansi = 4,
    Basilisk = 5,
    Gorgon = 6,
    Kitsune = 7,
    Lich = 8,
    Chimera = 9,
    Wendigo = 10,
    Rakshasa = 11,
    Werewolf = 12,
    Banshee = 13,
    Draugr = 14,
    Vampire = 15,
    Goblin = 16,
    Ghoul = 17,
    Wraith = 18,
    Sprite = 19,
    Kappa = 20,
    Fairy = 21,
    Leprechaun = 22,
    Kelpie = 23,
    Pixie = 24,
    Gnome = 25,
    Griffin = 26,
    Manticore = 27,
    Phoenix = 28,
    Dragon = 29,
    Minotaur = 30,
    Qilin = 31,
    Ammit = 32,
    Nue = 33,
    Skinwalker = 34,
    Chupacabra = 35,
    Weretiger = 36,
    Wyvern = 37,
    Roc = 38,
    Harpy = 39,
    Pegasus = 40,
    Hippogriff = 41,
    Fenrir = 42,
    Jaguar = 43,
    Satori = 44,
    DireWolf = 45,
    Bear = 46,
    Wolf = 47,
    Mantis = 48,
    Spider = 49,
    Rat = 50,
    Kraken = 51,
    Colossus = 52,
    Balrog = 53,
    Leviathan = 54,
    Tarrasque = 55,
    Titan = 56,
    Nephilim = 57,
    Behemoth = 58,
    Hydra = 59,
    Juggernaut = 60,
    Oni = 61,
    Jotunn = 62,
    Ettin = 63,
    Cyclops = 64,
    Giant = 65,
    NemeanLion = 66,
    Berserker = 67,
    Yeti = 68,
    Golem = 69,
    Ent = 70,
    Troll = 71,
    Bigfoot = 72,
    Ogre = 73,
    Orc = 74,
    Skeleton = 75,
}

export enum BeastType {
    Magical = "Magical",
    Hunter = "Hunter",
    Brute = "Brute",
}

export enum AttackType {
    Magic = "Magic",
    Blade = "Blade",
    Bludgeon = "Bludgeon",
}

export enum ArmorType {
    Cloth = "Cloth",
    Hide = "Hide",
    Metal = "Metal",
}

export enum Loot {
    Pendant = 1,
    Necklace = 2,
    Amulet = 3,
    SilverRing = 4,
    BronzeRing = 5,
    PlatinumRing = 6,
    TitaniumRing = 7,
    GoldRing = 8,
    GhostWand = 9,
    GraveWand = 10,
    BoneWand = 11,
    Wand = 12,
    Grimoire = 13,
    Chronicle = 14,
    Tome = 15,
    Book = 16,
    DivineRobe = 17,
    SilkRobe = 18,
    LinenRobe = 19,
    Robe = 20,
    Shirt = 21,
    Crown = 22,
    DivineHood = 23,
    SilkHood = 24,
    LinenHood = 25,
    Hood = 26,
    BrightsilkSash = 27,
    SilkSash = 28,
    WoolSash = 29,
    LinenSash = 30,
    Sash = 31,
    DivineSlippers = 32,
    SilkSlippers = 33,
    WoolShoes = 34,
    LinenShoes = 35,
    Shoes = 36,
    DivineGloves = 37,
    SilkGloves = 38,
    WoolGloves = 39,
    LinenGloves = 40,
    Gloves = 41,
    Katana = 42,
    Falchion = 43,
    Scimitar = 44,
    LongSword = 45,
    ShortSword = 46,
    DemonHusk = 47,
    DragonskinArmor = 48,
    StuddedLeatherArmor = 49,
    HardLeatherArmor = 50,
    LeatherArmor = 51,
    DemonCrown = 52,
    DragonsCrown = 53,
    WarCap = 54,
    LeatherCap = 55,
    Cap = 56,
    DemonhideBelt = 57,
    DragonskinBelt = 58,
    StuddedLeatherBelt = 59,
    HardLeatherBelt = 60,
    LeatherBelt = 61,
    DemonhideBoots = 62,
    DragonskinBoots = 63,
    StuddedLeatherBoots = 64,
    HardLeatherBoots = 65,
    LeatherBoots = 66,
    DemonsHands = 67,
    DragonskinGloves = 68,
    StuddedLeatherGloves = 69,
    HardLeatherGloves = 70,
    LeatherGloves = 71,
    Warhammer = 72,
    Quarterstaff = 73,
    Maul = 74,
    Mace = 75,
    Club = 76,
    HolyChestplate = 77,
    OrnateChestplate = 78,
    PlateMail = 79,
    ChainMail = 80,
    RingMail = 81,
    AncientHelm = 82,
    OrnateHelm = 83,
    GreatHelm = 84,
    FullHelm = 85,
    Helm = 86,
    OrnateBelt = 87,
    WarBelt = 88,
    PlatedBelt = 89,
    MeshBelt = 90,
    HeavyBelt = 91,
    HolyGreaves = 92,
    OrnateGreaves = 93,
    Greaves = 94,
    ChainBoots = 95,
    HeavyBoots = 96,
    HolyGauntlets = 97,
    OrnateGauntlets = 98,
    Gauntlets = 99,
    ChainGloves = 100,
    HeavyGloves = 101,
}

export enum ItemType {
    Necklace = "Necklace",
    Ring = "Ring",
    Magic = "Magic",
    Cloth = "Cloth",
    Blade = "Blade",
    Hide = "Hide",
    Bludgeon = "Bludgeon",
    Metal = "Metal",
}

export enum ItemSlot {
    Neck = "Neck",
    Ring = "Ring",
    Weapon = "Weapon",
    Chest = "Chest",
    Head = "Head",
    Waist = "Waist",
    Foot = "Foot",
    Hand = "Hand",
}

export const ITEM_SLOT_TO_NUMBER: Record<ItemSlot, number> = {
    [ItemSlot.Weapon]: 1,
    [ItemSlot.Chest]: 2,
    [ItemSlot.Head]: 3,
    [ItemSlot.Waist]: 4,
    [ItemSlot.Foot]: 5,
    [ItemSlot.Hand]: 6,
    [ItemSlot.Neck]: 7,
    [ItemSlot.Ring]: 8,
};

export const NUMBER_TO_ITEM_SLOT: Record<number, ItemSlot> = {
    1: ItemSlot.Weapon,
    2: ItemSlot.Chest,
    3: ItemSlot.Head,
    4: ItemSlot.Waist,
    5: ItemSlot.Foot,
    6: ItemSlot.Hand,
    7: ItemSlot.Neck,
    8: ItemSlot.Ring,
};

export enum StatType {
    Strength = 0,
    Dexterity = 1,
    Vitality = 2,
    Intelligence = 3,
    Wisdom = 4,
    Charisma = 5,
    Luck = 6,
}

export const STATS_ABBREVIATIONS: Record<StatType, string> = {
    [StatType.Strength]: "STR",
    [StatType.Dexterity]: "DEX",
    [StatType.Vitality]: "VIT",
    [StatType.Intelligence]: "INT",
    [StatType.Wisdom]: "WIS",
    [StatType.Charisma]: "CHA",
    [StatType.Luck]: "LUCK",
};

export enum Obstacles {
    // Magical Obstacles
    DemonicAlter = 1,
    VortexOfDespair = 2,
    EldritchBarrier = 3,
    SoulTrap = 4,
    PhantomVortex = 5,
    EctoplasmicWeb = 6,
    SpectralChains = 7,
    InfernalPact = 8,
    ArcaneExplosion = 9,
    HypnoticEssence = 10,
    MischievousSprites = 11,
    SoulDrainingStatue = 12,
    PetrifyingGaze = 13,
    SummoningCircle = 14,
    EtherealVoid = 15,
    MagicLock = 16,
    BewitchingFog = 17,
    IllusionaryMaze = 18,
    SpellboundMirror = 19,
    EnsnaringShadow = 20,
    DarkMist = 21,
    Curse = 22,
    HauntingEcho = 23,
    Hex = 24,
    GhostlyWhispers = 25,

    // Sharp Obstacles
    PendulumBlades = 26,
    IcyRazorWinds = 27,
    AcidicThorns = 28,
    DragonsBreath = 29,
    PendulumScythe = 30,
    FlameJet = 31,
    PiercingIceDarts = 32,
    GlassSandStorm = 33,
    PoisonedDartWall = 34,
    SpinningBladeWheel = 35,
    PoisonDart = 36,
    SpikedTumbleweed = 37,
    Thunderbolt = 38,
    GiantBearTrap = 39,
    SteelNeedleRain = 40,
    SpikedPit = 41,
    DiamondDustStorm = 42,
    TrapdoorScorpionPit = 43,
    BladedFan = 44,
    BearTrap = 45,
    PorcupineQuill = 46,
    HiddenArrow = 47,
    GlassShard = 48,
    ThornBush = 49,
    JaggedRocks = 50,

    // Crushing Obstacles
    SubterraneanTremor = 51,
    Rockslide = 52,
    FlashFlood = 53,
    ClingingRoots = 54,
    CollapsingCavern = 55,
    CrushingWalls = 56,
    SmashingPillars = 57,
    RumblingCatacomb = 58,
    WhirlingCyclone = 59,
    EruptingEarth = 60,
    SubterraneanTremor2 = 61,
    FallingChandelier = 62,
    CollapsingBridge = 63,
    RagingSandstorm = 64,
    AvalanchingRocks = 65,
    TumblingBoulders = 66,
    SlammingIronGate = 67,
    ShiftingSandtrap = 68,
    EruptingMudGeyser = 69,
    CrumblingStaircase = 70,
    SwingingLogs = 71,
    UnstableCliff = 72,
    TopplingStatue = 73,
    TumblingBarrels = 74,
    RollingBoulder = 75,
}

export enum DiscoveryType {
    Beast = 1,
    Obstacle = 2,
    Item = 3,
}

export enum ItemDiscoveryType {
    Health = 1,
    Gold = 2,
    XP = 3,
}

export enum ItemNamePrefix {
    Agony = 1,
    Apocalypse = 2,
    Armageddon = 3,
    Beast = 4,
    Behemoth = 5,
    Blight = 6,
    Blood = 7,
    Bramble = 8,
    Brimstone = 9,
    Brood = 10,
    Carrion = 11,
    Cataclysm = 12,
    Chimeric = 13,
    Corpse = 14,
    Corruption = 15,
    Damnation = 16,
    Death = 17,
    Demon = 18,
    Dire = 19,
    Dragon = 20,
    Dread = 21,
    Doom = 22,
    Dusk = 23,
    Eagle = 24,
    Empyrean = 25,
    Fate = 26,
    Foe = 27,
    Gale = 28,
    Ghoul = 29,
    Gloom = 30,
    Glyph = 31,
    Golem = 32,
    Grim = 33,
    Hate = 34,
    Havoc = 35,
    Honour = 36,
    Horror = 37,
    Hypnotic = 38,
    Kraken = 39,
    Loath = 40,
    Maelstrom = 41,
    Mind = 42,
    Miracle = 43,
    Morbid = 44,
    Oblivion = 45,
    Onslaught = 46,
    Pain = 47,
    Pandemonium = 48,
    Phoenix = 49,
    Plague = 50,
    Rage = 51,
    Rapture = 52,
    Rune = 53,
    Skull = 54,
    Sol = 55,
    Soul = 56,
    Sorrow = 57,
    Spirit = 58,
    Storm = 59,
    Tempest = 60,
    Torment = 61,
    Vengeance = 62,
    Victory = 63,
    Viper = 64,
    Vortex = 65,
    Woe = 66,
    Wrath = 67,
    Lights = 68,
    Shimmering = 69,
}

export enum ItemNameSuffix {
    Bane = 1,
    Root = 2,
    Bite = 3,
    Song = 4,
    Roar = 5,
    Grasp = 6,
    Instrument = 7,
    Glow = 8,
    Bender = 9,
    Shadow = 10,
    Whisper = 11,
    Shout = 12,
    Growl = 13,
    Tear = 14,
    Peak = 15,
    Form = 16,
    Sun = 17,
    Moon = 18,
}

export enum ItemSuffix {
    OfPower = 1,
    OfGiant = 2,
    OfTitans = 3,
    OfSkill = 4,
    OfPerfection = 5,
    OfBrilliance = 6,
    OfEnlightenment = 7,
    OfProtection = 8,
    OfAnger = 9,
    OfRage = 10,
    OfFury = 11,
    OfVitriol = 12,
    OfTheFox = 13,
    OfDetection = 14,
    OfReflection = 15,
    OfTheTwins = 16,
}

export interface StatBoost {
    [StatType.Strength]?: number;
    [StatType.Dexterity]?: number;
    [StatType.Vitality]?: number;
    [StatType.Intelligence]?: number;
    [StatType.Wisdom]?: number;
    [StatType.Charisma]?: number;
}

export const ITEM_SUFFIX_BOOST: Record<ItemSuffix, StatBoost> = {
    [ItemSuffix.OfPower]: { [StatType.Strength]: 3 },
    [ItemSuffix.OfGiant]: { [StatType.Vitality]: 3 },
    [ItemSuffix.OfTitans]: { [StatType.Strength]: 2, [StatType.Charisma]: 1 },
    [ItemSuffix.OfSkill]: { [StatType.Dexterity]: 3 },
    [ItemSuffix.OfPerfection]: {
        [StatType.Strength]: 1,
        [StatType.Dexterity]: 1,
        [StatType.Vitality]: 1,
    },
    [ItemSuffix.OfBrilliance]: { [StatType.Intelligence]: 3 },
    [ItemSuffix.OfEnlightenment]: { [StatType.Wisdom]: 3 },
    [ItemSuffix.OfProtection]: {
        [StatType.Vitality]: 2,
        [StatType.Dexterity]: 1,
    },
    [ItemSuffix.OfAnger]: { [StatType.Strength]: 2, [StatType.Dexterity]: 1 },
    [ItemSuffix.OfRage]: {
        [StatType.Wisdom]: 1,
        [StatType.Strength]: 1,
        [StatType.Charisma]: 1,
    },
    [ItemSuffix.OfFury]: {
        [StatType.Vitality]: 1,
        [StatType.Charisma]: 1,
        [StatType.Intelligence]: 1,
    },
    [ItemSuffix.OfVitriol]: {
        [StatType.Intelligence]: 2,
        [StatType.Wisdom]: 1,
    },
    [ItemSuffix.OfTheFox]: { [StatType.Dexterity]: 2, [StatType.Charisma]: 1 },
    [ItemSuffix.OfDetection]: { [StatType.Wisdom]: 2, [StatType.Dexterity]: 1 },
    [ItemSuffix.OfReflection]: {
        [StatType.Wisdom]: 2,
        [StatType.Intelligence]: 1,
    },
    [ItemSuffix.OfTheTwins]: { [StatType.Charisma]: 3 },
};

export enum Status {
    Closed = 0,
    Open = 1,
}

export enum SELECTORS {
    StartGame = "StartGame",
    AdventurerUpgraded = "AdventurerUpgraded",
    DiscoveredHealth = "DiscoveredHealth",
    DiscoveredGold = "DiscoveredGold",
    DiscoveredLoot = "DiscoveredLoot",
    DiscoveredXP = "DiscoveredXP",
    EquipmentChanged = "EquipmentChanged",
    DodgedObstacle = "DodgedObstacle",
    HitByObstacle = "HitByObstacle",
    DiscoveredBeast = "DiscoveredBeast",
    AmbushedByBeast = "AmbushedByBeast",
    AttackedBeast = "AttackedBeast",
    AttackedByBeast = "AttackedByBeast",
    SlayedBeast = "SlayedBeast",
    FleeFailed = "FleeFailed",
    FleeSucceeded = "FleeSucceeded",
    PurchasedItems = "PurchasedItems",
    PurchasedPotions = "PurchasedPotions",
    EquippedItems = "EquippedItems",
    DroppedItems = "DroppedItems",
    GreatnessIncreased = "GreatnessIncreased",
    ItemsLeveledUp = "ItemsLeveledUp",
    NewHighScore = "NewHighScore",
    AdventurerDied = "AdventurerDied",
    AdventurerLeveledUp = "AdventurerLeveledUp",
    UpgradesAvailable = "UpgradesAvailable",
    Transfer = "Transfer",
}

export const HASHED_SELECTORS = {
    StartGame: hash.getSelectorFromName(SELECTORS.StartGame),
    AdventurerUpgraded: hash.getSelectorFromName(SELECTORS.AdventurerUpgraded),
    DiscoveredHealth: hash.getSelectorFromName(SELECTORS.DiscoveredHealth),
    DiscoveredGold: hash.getSelectorFromName(SELECTORS.DiscoveredGold),
    DiscoveredLoot: hash.getSelectorFromName(SELECTORS.DiscoveredLoot),
    DiscoveredXP: hash.getSelectorFromName(SELECTORS.DiscoveredXP),
    EquipmentChanged: hash.getSelectorFromName(SELECTORS.EquipmentChanged),
    DodgedObstacle: hash.getSelectorFromName(SELECTORS.DodgedObstacle),
    HitByObstacle: hash.getSelectorFromName(SELECTORS.HitByObstacle),
    DiscoveredBeast: hash.getSelectorFromName(SELECTORS.DiscoveredBeast),
    AmbushedByBeast: hash.getSelectorFromName(SELECTORS.AmbushedByBeast),
    AttackedBeast: hash.getSelectorFromName(SELECTORS.AttackedBeast),
    AttackedByBeast: hash.getSelectorFromName(SELECTORS.AttackedByBeast),
    SlayedBeast: hash.getSelectorFromName(SELECTORS.SlayedBeast),
    FleeFailed: hash.getSelectorFromName(SELECTORS.FleeFailed),
    FleeSucceeded: hash.getSelectorFromName(SELECTORS.FleeSucceeded),
    PurchasedItems: hash.getSelectorFromName(SELECTORS.PurchasedItems),
    PurchasedPotions: hash.getSelectorFromName(SELECTORS.PurchasedPotions),
    EquippedItems: hash.getSelectorFromName(SELECTORS.EquippedItems),
    DroppedItems: hash.getSelectorFromName(SELECTORS.DroppedItems),
    GreatnessIncreased: hash.getSelectorFromName(SELECTORS.GreatnessIncreased),
    ItemsLeveledUp: hash.getSelectorFromName(SELECTORS.ItemsLeveledUp),
    NewHighScore: hash.getSelectorFromName(SELECTORS.NewHighScore),
    AdventurerDied: hash.getSelectorFromName(SELECTORS.AdventurerDied),
    AdventurerLeveledUp: hash.getSelectorFromName(
        SELECTORS.AdventurerLeveledUp
    ),
    UpgradesAvailable: hash.getSelectorFromName(SELECTORS.UpgradesAvailable),
    Transfer: hash.getSelectorFromName(SELECTORS.Transfer),
};

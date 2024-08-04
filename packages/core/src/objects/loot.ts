import {
    ITEM_SLOT_TO_NUMBER,
    ITEM_SUFFIX_BOOST,
    ItemNamePrefix,
    ItemNameSuffix,
    ItemSlot,
    ItemSuffix,
    ItemType,
    Loot,
    NUMBER_TO_ITEM_SLOT,
    StatBoost,
    StatType,
} from "../type";

export class LootManager {
    private static TWO_POW_64 = BigInt("0x10000000000000000");
    private static NUM_ITEMS = 101;

    private static SUFFIX_UNLOCK_GREATNESS = 15;
    private static PREFIXES_UNLOCK_GREATNESS = 19;

    private item: Loot;
    private xp: number;
    private seed: bigint;

    constructor(item: Loot, xp: number, seed: bigint) {
        this.item = item;
        this.xp = xp;
        this.seed = seed;
    }

    getFullItemName(): string {
        const itemName = this.getItemName();
        const specials = this.getSpecials(
            this.item,
            this.calculateGreatness(this.xp),
            this.seed
        );

        let name = itemName;

        if (specials.special1 !== 0) {
            const suffix = this.getItemSuffixName(specials.special1);
            const boostString = this.getItemSuffixBoostString(
                specials.special1
            );
            name += ` ${suffix} (${boostString})`;
        }

        if (specials.special2 !== 0) {
            const prefix1 = this.getItemNamePrefix(specials.special2);
            name = `${prefix1} ${name}`;
        }

        if (specials.special3 !== 0) {
            const prefix2 = this.getItemNameSuffix(specials.special3);
            name = `${prefix2} ${name}`;
        }

        return name.trim();
    }

    private getSpecials(
        item: Loot,
        greatness: number,
        seed: bigint
    ): { special1: number; special2: number; special3: number } {
        if (greatness < LootManager.SUFFIX_UNLOCK_GREATNESS) {
            return { special1: 0, special2: 0, special3: 0 };
        } else if (greatness < LootManager.PREFIXES_UNLOCK_GREATNESS) {
            return {
                special1: this.getItemSuffix(item, seed),
                special2: 0,
                special3: 0,
            };
        } else {
            return {
                special1: this.getItemSuffix(item, seed),
                special2: this.getPrefix1(item, seed),
                special3: this.getPrefix2(item, seed),
            };
        }
    }

    getItemName(): string {
        return Loot[this.item];
    }

    getItemNumber(itemName: string): Loot | undefined {
        return Loot[itemName as keyof typeof Loot];
    }

    getItemType(): ItemType {
        return ITEM_TYPES[this.item];
    }

    getItemSlot(): ItemSlot {
        return ITEM_SLOTS[this.item];
    }

    getItemNamePrefix(prefix: ItemNamePrefix): string {
        return ItemNamePrefix[prefix];
    }

    getItemNamePrefixNumber(prefixName: string): ItemNamePrefix | undefined {
        return ItemNamePrefix[prefixName as keyof typeof ItemNamePrefix];
    }

    getItemNameSuffix(suffix: ItemNameSuffix): string {
        return ItemNameSuffix[suffix];
    }

    getItemNameSuffixNumber(suffixName: string): ItemNameSuffix | undefined {
        return ItemNameSuffix[suffixName as keyof typeof ItemNameSuffix];
    }

    getItemSuffix(itemId: number, seed: bigint): ItemSuffix {
        const namingSeed = this.generateNamingSeed(itemId, seed);
        const suffixIndex = Number(
            (namingSeed % BigInt(Object.keys(ItemSuffix).length / 2)) +
                BigInt(1)
        );
        return suffixIndex as ItemSuffix;
    }

    private generateNamingSeed(itemId: number, seed: bigint): bigint {
        const nameSeedU64 = seed % LootManager.TWO_POW_64;

        let itemEntropy: bigint;
        const sum = nameSeedU64 + BigInt(itemId);
        if (sum < LootManager.TWO_POW_64) {
            itemEntropy = sum;
        } else {
            itemEntropy = nameSeedU64 - BigInt(itemId);
        }

        const rnd = itemEntropy % BigInt(LootManager.NUM_ITEMS);
        return (
            rnd * BigInt(this.getSlotLength(this.getSlot(itemId))) +
            BigInt(itemId)
        );
    }

    getItemSuffixName(suffix: ItemSuffix): string {
        return ItemSuffix[suffix].replace(/([A-Z])/g, " $1").trim();
    }

    private getSlot(itemId: number): ItemSlot {
        return ITEM_SLOTS[itemId as Loot];
    }

    private getSlotLength(slot: ItemSlot): number {
        return Object.values(ITEM_SLOTS).filter((s) => s === slot).length;
    }

    getItemSuffixNumber(suffixName: string): ItemSuffix | undefined {
        const formattedName = suffixName.replace(/\s+/g, "");
        return ItemSuffix[formattedName as keyof typeof ItemSuffix];
    }

    calculateGreatness(xp: number) {
        return Math.max(Math.floor(Math.sqrt(xp)), 1);
    }

    getItemSuffixBoost(suffix: ItemSuffix): StatBoost {
        return ITEM_SUFFIX_BOOST[suffix];
    }

    getItemSuffixBoostString(suffix: ItemSuffix): string {
        const boost = ITEM_SUFFIX_BOOST[suffix];
        return Object.entries(boost)
            .map(
                ([stat, value]) =>
                    `${StatType[stat as unknown as StatType]} +${value}`
            )
            .join(" ");
    }

    getItemSlotNumber(slot: ItemSlot): number {
        return ITEM_SLOT_TO_NUMBER[slot];
    }

    getItemSlotFromNumber(number: number): ItemSlot | undefined {
        return NUMBER_TO_ITEM_SLOT[number];
    }

    getPrefix1(itemId: number, seed: bigint): ItemNamePrefix {
        const namingSeed = this.generateNamingSeed(itemId, seed);
        const prefixIndex = Number(
            (namingSeed % BigInt(Object.keys(ItemNamePrefix).length / 2)) +
                BigInt(1)
        );
        return prefixIndex as ItemNamePrefix;
    }

    getPrefix2(itemId: number, seed: bigint): ItemNameSuffix {
        const namingSeed = this.generateNamingSeed(itemId, seed);
        const suffixIndex = Number(
            (namingSeed % BigInt(Object.keys(ItemNameSuffix).length / 2)) +
                BigInt(1)
        );
        return suffixIndex as ItemNameSuffix;
    }
}

export const ITEM_TYPES: Record<Loot, ItemType> = {
    [Loot.Pendant]: ItemType.Necklace,
    [Loot.Necklace]: ItemType.Necklace,
    [Loot.Amulet]: ItemType.Necklace,
    [Loot.SilverRing]: ItemType.Ring,
    [Loot.BronzeRing]: ItemType.Ring,
    [Loot.PlatinumRing]: ItemType.Ring,
    [Loot.TitaniumRing]: ItemType.Ring,
    [Loot.GoldRing]: ItemType.Ring,
    [Loot.GhostWand]: ItemType.Magic,
    [Loot.GraveWand]: ItemType.Magic,
    [Loot.BoneWand]: ItemType.Magic,
    [Loot.Wand]: ItemType.Magic,
    [Loot.Grimoire]: ItemType.Magic,
    [Loot.Chronicle]: ItemType.Magic,
    [Loot.Tome]: ItemType.Magic,
    [Loot.Book]: ItemType.Magic,
    [Loot.DivineRobe]: ItemType.Cloth,
    [Loot.SilkRobe]: ItemType.Cloth,
    [Loot.LinenRobe]: ItemType.Cloth,
    [Loot.Robe]: ItemType.Cloth,
    [Loot.Shirt]: ItemType.Cloth,
    [Loot.Crown]: ItemType.Cloth,
    [Loot.DivineHood]: ItemType.Cloth,
    [Loot.SilkHood]: ItemType.Cloth,
    [Loot.LinenHood]: ItemType.Cloth,
    [Loot.Hood]: ItemType.Cloth,
    [Loot.BrightsilkSash]: ItemType.Cloth,
    [Loot.SilkSash]: ItemType.Cloth,
    [Loot.WoolSash]: ItemType.Cloth,
    [Loot.LinenSash]: ItemType.Cloth,
    [Loot.Sash]: ItemType.Cloth,
    [Loot.DivineSlippers]: ItemType.Cloth,
    [Loot.SilkSlippers]: ItemType.Cloth,
    [Loot.WoolShoes]: ItemType.Cloth,
    [Loot.LinenShoes]: ItemType.Cloth,
    [Loot.Shoes]: ItemType.Cloth,
    [Loot.DivineGloves]: ItemType.Cloth,
    [Loot.SilkGloves]: ItemType.Cloth,
    [Loot.WoolGloves]: ItemType.Cloth,
    [Loot.LinenGloves]: ItemType.Cloth,
    [Loot.Gloves]: ItemType.Cloth,
    [Loot.Katana]: ItemType.Blade,
    [Loot.Falchion]: ItemType.Blade,
    [Loot.Scimitar]: ItemType.Blade,
    [Loot.LongSword]: ItemType.Blade,
    [Loot.ShortSword]: ItemType.Blade,
    [Loot.DemonHusk]: ItemType.Hide,
    [Loot.DragonskinArmor]: ItemType.Hide,
    [Loot.StuddedLeatherArmor]: ItemType.Hide,
    [Loot.HardLeatherArmor]: ItemType.Hide,
    [Loot.LeatherArmor]: ItemType.Hide,
    [Loot.DemonCrown]: ItemType.Hide,
    [Loot.DragonsCrown]: ItemType.Hide,
    [Loot.WarCap]: ItemType.Hide,
    [Loot.LeatherCap]: ItemType.Hide,
    [Loot.Cap]: ItemType.Hide,
    [Loot.DemonhideBelt]: ItemType.Hide,
    [Loot.DragonskinBelt]: ItemType.Hide,
    [Loot.StuddedLeatherBelt]: ItemType.Hide,
    [Loot.HardLeatherBelt]: ItemType.Hide,
    [Loot.LeatherBelt]: ItemType.Hide,
    [Loot.DemonhideBoots]: ItemType.Hide,
    [Loot.DragonskinBoots]: ItemType.Hide,
    [Loot.StuddedLeatherBoots]: ItemType.Hide,
    [Loot.HardLeatherBoots]: ItemType.Hide,
    [Loot.LeatherBoots]: ItemType.Hide,
    [Loot.DemonsHands]: ItemType.Hide,
    [Loot.DragonskinGloves]: ItemType.Hide,
    [Loot.StuddedLeatherGloves]: ItemType.Hide,
    [Loot.HardLeatherGloves]: ItemType.Hide,
    [Loot.LeatherGloves]: ItemType.Hide,
    [Loot.Warhammer]: ItemType.Bludgeon,
    [Loot.Quarterstaff]: ItemType.Bludgeon,
    [Loot.Maul]: ItemType.Bludgeon,
    [Loot.Mace]: ItemType.Bludgeon,
    [Loot.Club]: ItemType.Bludgeon,
    [Loot.HolyChestplate]: ItemType.Metal,
    [Loot.OrnateChestplate]: ItemType.Metal,
    [Loot.PlateMail]: ItemType.Metal,
    [Loot.ChainMail]: ItemType.Metal,
    [Loot.RingMail]: ItemType.Metal,
    [Loot.AncientHelm]: ItemType.Metal,
    [Loot.OrnateHelm]: ItemType.Metal,
    [Loot.GreatHelm]: ItemType.Metal,
    [Loot.FullHelm]: ItemType.Metal,
    [Loot.Helm]: ItemType.Metal,
    [Loot.OrnateBelt]: ItemType.Metal,
    [Loot.WarBelt]: ItemType.Metal,
    [Loot.PlatedBelt]: ItemType.Metal,
    [Loot.MeshBelt]: ItemType.Metal,
    [Loot.HeavyBelt]: ItemType.Metal,
    [Loot.HolyGreaves]: ItemType.Metal,
    [Loot.OrnateGreaves]: ItemType.Metal,
    [Loot.Greaves]: ItemType.Metal,
    [Loot.ChainBoots]: ItemType.Metal,
    [Loot.HeavyBoots]: ItemType.Metal,
    [Loot.HolyGauntlets]: ItemType.Metal,
    [Loot.OrnateGauntlets]: ItemType.Metal,
    [Loot.Gauntlets]: ItemType.Metal,
    [Loot.ChainGloves]: ItemType.Metal,
    [Loot.HeavyGloves]: ItemType.Metal,
};

export const ITEM_TIERS: Record<Loot, number> = {
    [Loot.Pendant]: 1,
    [Loot.Necklace]: 1,
    [Loot.Amulet]: 1,
    [Loot.SilverRing]: 2,
    [Loot.BronzeRing]: 3,
    [Loot.PlatinumRing]: 1,
    [Loot.TitaniumRing]: 1,
    [Loot.GoldRing]: 1,
    [Loot.GhostWand]: 1,
    [Loot.GraveWand]: 2,
    [Loot.BoneWand]: 3,
    [Loot.Wand]: 5,
    [Loot.Grimoire]: 1,
    [Loot.Chronicle]: 2,
    [Loot.Tome]: 3,
    [Loot.Book]: 5,
    [Loot.DivineRobe]: 1,
    [Loot.SilkRobe]: 2,
    [Loot.LinenRobe]: 3,
    [Loot.Robe]: 4,
    [Loot.Shirt]: 5,
    [Loot.Crown]: 1,
    [Loot.DivineHood]: 2,
    [Loot.SilkHood]: 3,
    [Loot.LinenHood]: 4,
    [Loot.Hood]: 5,
    [Loot.BrightsilkSash]: 1,
    [Loot.SilkSash]: 2,
    [Loot.WoolSash]: 3,
    [Loot.LinenSash]: 4,
    [Loot.Sash]: 5,
    [Loot.DivineSlippers]: 1,
    [Loot.SilkSlippers]: 2,
    [Loot.WoolShoes]: 3,
    [Loot.LinenShoes]: 4,
    [Loot.Shoes]: 5,
    [Loot.DivineGloves]: 1,
    [Loot.SilkGloves]: 2,
    [Loot.WoolGloves]: 3,
    [Loot.LinenGloves]: 4,
    [Loot.Gloves]: 5,
    [Loot.Katana]: 1,
    [Loot.Falchion]: 2,
    [Loot.Scimitar]: 3,
    [Loot.LongSword]: 4,
    [Loot.ShortSword]: 5,
    [Loot.DemonHusk]: 1,
    [Loot.DragonskinArmor]: 2,
    [Loot.StuddedLeatherArmor]: 3,
    [Loot.HardLeatherArmor]: 4,
    [Loot.LeatherArmor]: 5,
    [Loot.DemonCrown]: 1,
    [Loot.DragonsCrown]: 2,
    [Loot.WarCap]: 3,
    [Loot.LeatherCap]: 4,
    [Loot.Cap]: 5,
    [Loot.DemonhideBelt]: 1,
    [Loot.DragonskinBelt]: 2,
    [Loot.StuddedLeatherBelt]: 3,
    [Loot.HardLeatherBelt]: 4,
    [Loot.LeatherBelt]: 5,
    [Loot.DemonhideBoots]: 1,
    [Loot.DragonskinBoots]: 2,
    [Loot.StuddedLeatherBoots]: 3,
    [Loot.HardLeatherBoots]: 4,
    [Loot.LeatherBoots]: 5,
    [Loot.DemonsHands]: 1,
    [Loot.DragonskinGloves]: 2,
    [Loot.StuddedLeatherGloves]: 3,
    [Loot.HardLeatherGloves]: 4,
    [Loot.LeatherGloves]: 5,
    [Loot.Warhammer]: 1,
    [Loot.Quarterstaff]: 2,
    [Loot.Maul]: 3,
    [Loot.Mace]: 4,
    [Loot.Club]: 5,
    [Loot.HolyChestplate]: 1,
    [Loot.OrnateChestplate]: 2,
    [Loot.PlateMail]: 3,
    [Loot.ChainMail]: 4,
    [Loot.RingMail]: 5,
    [Loot.AncientHelm]: 1,
    [Loot.OrnateHelm]: 2,
    [Loot.GreatHelm]: 3,
    [Loot.FullHelm]: 4,
    [Loot.Helm]: 5,
    [Loot.OrnateBelt]: 1,
    [Loot.WarBelt]: 2,
    [Loot.PlatedBelt]: 3,
    [Loot.MeshBelt]: 4,
    [Loot.HeavyBelt]: 5,
    [Loot.HolyGreaves]: 1,
    [Loot.OrnateGreaves]: 2,
    [Loot.Greaves]: 3,
    [Loot.ChainBoots]: 4,
    [Loot.HeavyBoots]: 5,
    [Loot.HolyGauntlets]: 1,
    [Loot.OrnateGauntlets]: 2,
    [Loot.Gauntlets]: 3,
    [Loot.ChainGloves]: 4,
    [Loot.HeavyGloves]: 5,
};

export const ITEM_SLOTS: Record<Loot, ItemSlot> = {
    [Loot.Pendant]: ItemSlot.Neck,
    [Loot.Necklace]: ItemSlot.Neck,
    [Loot.Amulet]: ItemSlot.Neck,
    [Loot.SilverRing]: ItemSlot.Ring,
    [Loot.BronzeRing]: ItemSlot.Ring,
    [Loot.PlatinumRing]: ItemSlot.Ring,
    [Loot.TitaniumRing]: ItemSlot.Ring,
    [Loot.GoldRing]: ItemSlot.Ring,
    [Loot.GhostWand]: ItemSlot.Weapon,
    [Loot.GraveWand]: ItemSlot.Weapon,
    [Loot.BoneWand]: ItemSlot.Weapon,
    [Loot.Wand]: ItemSlot.Weapon,
    [Loot.Grimoire]: ItemSlot.Weapon,
    [Loot.Chronicle]: ItemSlot.Weapon,
    [Loot.Tome]: ItemSlot.Weapon,
    [Loot.Book]: ItemSlot.Weapon,
    [Loot.DivineRobe]: ItemSlot.Chest,
    [Loot.SilkRobe]: ItemSlot.Chest,
    [Loot.LinenRobe]: ItemSlot.Chest,
    [Loot.Robe]: ItemSlot.Chest,
    [Loot.Shirt]: ItemSlot.Chest,
    [Loot.Crown]: ItemSlot.Head,
    [Loot.DivineHood]: ItemSlot.Head,
    [Loot.SilkHood]: ItemSlot.Head,
    [Loot.LinenHood]: ItemSlot.Head,
    [Loot.Hood]: ItemSlot.Head,
    [Loot.BrightsilkSash]: ItemSlot.Waist,
    [Loot.SilkSash]: ItemSlot.Waist,
    [Loot.WoolSash]: ItemSlot.Waist,
    [Loot.LinenSash]: ItemSlot.Waist,
    [Loot.Sash]: ItemSlot.Waist,
    [Loot.DivineSlippers]: ItemSlot.Foot,
    [Loot.SilkSlippers]: ItemSlot.Foot,
    [Loot.WoolShoes]: ItemSlot.Foot,
    [Loot.LinenShoes]: ItemSlot.Foot,
    [Loot.Shoes]: ItemSlot.Foot,
    [Loot.DivineGloves]: ItemSlot.Hand,
    [Loot.SilkGloves]: ItemSlot.Hand,
    [Loot.WoolGloves]: ItemSlot.Hand,
    [Loot.LinenGloves]: ItemSlot.Hand,
    [Loot.Gloves]: ItemSlot.Hand,
    [Loot.Katana]: ItemSlot.Weapon,
    [Loot.Falchion]: ItemSlot.Weapon,
    [Loot.Scimitar]: ItemSlot.Weapon,
    [Loot.LongSword]: ItemSlot.Weapon,
    [Loot.ShortSword]: ItemSlot.Weapon,
    [Loot.DemonHusk]: ItemSlot.Chest,
    [Loot.DragonskinArmor]: ItemSlot.Chest,
    [Loot.StuddedLeatherArmor]: ItemSlot.Chest,
    [Loot.HardLeatherArmor]: ItemSlot.Chest,
    [Loot.LeatherArmor]: ItemSlot.Chest,
    [Loot.DemonCrown]: ItemSlot.Head,
    [Loot.DragonsCrown]: ItemSlot.Head,
    [Loot.WarCap]: ItemSlot.Head,
    [Loot.LeatherCap]: ItemSlot.Head,
    [Loot.Cap]: ItemSlot.Head,
    [Loot.DemonhideBelt]: ItemSlot.Waist,
    [Loot.DragonskinBelt]: ItemSlot.Waist,
    [Loot.StuddedLeatherBelt]: ItemSlot.Waist,
    [Loot.HardLeatherBelt]: ItemSlot.Waist,
    [Loot.LeatherBelt]: ItemSlot.Waist,
    [Loot.DemonhideBoots]: ItemSlot.Foot,
    [Loot.DragonskinBoots]: ItemSlot.Foot,
    [Loot.StuddedLeatherBoots]: ItemSlot.Foot,
    [Loot.HardLeatherBoots]: ItemSlot.Foot,
    [Loot.LeatherBoots]: ItemSlot.Foot,
    [Loot.DemonsHands]: ItemSlot.Hand,
    [Loot.DragonskinGloves]: ItemSlot.Hand,
    [Loot.StuddedLeatherGloves]: ItemSlot.Hand,
    [Loot.HardLeatherGloves]: ItemSlot.Hand,
    [Loot.LeatherGloves]: ItemSlot.Hand,
    [Loot.Warhammer]: ItemSlot.Weapon,
    [Loot.Quarterstaff]: ItemSlot.Weapon,
    [Loot.Maul]: ItemSlot.Weapon,
    [Loot.Mace]: ItemSlot.Weapon,
    [Loot.Club]: ItemSlot.Weapon,
    [Loot.HolyChestplate]: ItemSlot.Chest,
    [Loot.OrnateChestplate]: ItemSlot.Chest,
    [Loot.PlateMail]: ItemSlot.Chest,
    [Loot.ChainMail]: ItemSlot.Chest,
    [Loot.RingMail]: ItemSlot.Chest,
    [Loot.AncientHelm]: ItemSlot.Head,
    [Loot.OrnateHelm]: ItemSlot.Head,
    [Loot.GreatHelm]: ItemSlot.Head,
    [Loot.FullHelm]: ItemSlot.Head,
    [Loot.Helm]: ItemSlot.Head,
    [Loot.OrnateBelt]: ItemSlot.Waist,
    [Loot.WarBelt]: ItemSlot.Waist,
    [Loot.PlatedBelt]: ItemSlot.Waist,
    [Loot.MeshBelt]: ItemSlot.Waist,
    [Loot.HeavyBelt]: ItemSlot.Waist,
    [Loot.HolyGreaves]: ItemSlot.Foot,
    [Loot.OrnateGreaves]: ItemSlot.Foot,
    [Loot.Greaves]: ItemSlot.Foot,
    [Loot.ChainBoots]: ItemSlot.Foot,
    [Loot.HeavyBoots]: ItemSlot.Foot,
    [Loot.HolyGauntlets]: ItemSlot.Hand,
    [Loot.OrnateGauntlets]: ItemSlot.Hand,
    [Loot.Gauntlets]: ItemSlot.Hand,
    [Loot.ChainGloves]: ItemSlot.Hand,
    [Loot.HeavyGloves]: ItemSlot.Hand,
};

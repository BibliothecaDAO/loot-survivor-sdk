import { InvokeTransactionReceiptResponse, hash } from "starknet";
import { Beast, HASHED_SELECTORS, SELECTORS } from "../type";
import * as EventTypes from "../type/events";

export const formatBeastData = (
    event: EventTypes.DiscoveredBeastEvent
): Beast => {
    const currentTime = new Date().toISOString();
    return {
        adventurerId: event.adventurerState.adventurerId,
        beast: `Beast_${event.id}`, // Placeholder name based on ID
        createdTime: currentTime,
        health: 100, // Placeholder value, should be calculated based on the seed
        lastUpdatedTime: currentTime,
        level: event.beastSpecs.level,
        seed: event.seed.toString(),
        slainOnTime: null,
        special1: event.beastSpecs.specials.special1,
        special2: event.beastSpecs.specials.special2,
        special3: event.beastSpecs.specials.special3,
        timestamp: currentTime,
    };
};

export function parseAdventurerState(data: string[]) {
    return {
        owner: data[0],
        adventurerId: parseInt(data[1]),
        adventurerEntropy: data[2],
        adventurer: {
            health: parseInt(data[3]),
            xp: parseInt(data[4]),
            gold: parseInt(data[5]),
            beastHealth: parseInt(data[6]),
            statUpgradesAvailable: parseInt(data[7]),
            stats: {
                strength: parseInt(data[8]),
                dexterity: parseInt(data[9]),
                vitality: parseInt(data[10]),
                intelligence: parseInt(data[11]),
                wisdom: parseInt(data[12]),
                charisma: parseInt(data[13]),
                luck: parseInt(data[14]),
            },
            equipment: {
                weapon: {
                    id: parseInt(data[15]),
                    xp: parseInt(data[16]),
                },
                chest: {
                    id: parseInt(data[17]),
                    xp: parseInt(data[18]),
                },
                head: {
                    id: parseInt(data[19]),
                    xp: parseInt(data[20]),
                },
                waist: {
                    id: parseInt(data[21]),
                    xp: parseInt(data[22]),
                },
                foot: {
                    id: parseInt(data[23]),
                    xp: parseInt(data[24]),
                },
                hand: {
                    id: parseInt(data[25]),
                    xp: parseInt(data[26]),
                },
                neck: {
                    id: parseInt(data[27]),
                    xp: parseInt(data[28]),
                },
                ring: {
                    id: parseInt(data[29]),
                    xp: parseInt(data[30]),
                },
            },
            mutated: convertToBoolean(parseInt(data[31])),
        },
    };
}

export function convertToBoolean(value: number): boolean {
    return value === 1;
}

export const parseAdventurerMeta = (data: string[]) => {
    return {
        startEntropy: data[1],
        startingStats: {
            strength: parseInt(data[2]),
            dexterity: parseInt(data[3]),
            vitality: parseInt(data[4]),
            intelligence: parseInt(data[5]),
            wisdom: parseInt(data[6]),
            charisma: parseInt(data[7]),
            luck: parseInt(data[8]),
        },
        interfaceCamel: convertToBoolean(parseInt(data[9])),
        name: parseInt(data[10]),
    };
};

export function parseBag(data: string[]) {
    return {
        item1: {
            id: parseInt(data[0]),
            xp: parseInt(data[1]),
        },
        item2: {
            id: parseInt(data[2]),
            xp: parseInt(data[3]),
        },
        item3: {
            id: parseInt(data[4]),
            xp: parseInt(data[5]),
        },
        item4: {
            id: parseInt(data[6]),
            xp: parseInt(data[7]),
        },
        item5: {
            id: parseInt(data[8]),
            xp: parseInt(data[9]),
        },
        item6: {
            id: parseInt(data[10]),
            xp: parseInt(data[11]),
        },
        item7: {
            id: parseInt(data[12]),
            xp: parseInt(data[13]),
        },
        item8: {
            id: parseInt(data[14]),
            xp: parseInt(data[15]),
        },
        item9: {
            id: parseInt(data[16]),
            xp: parseInt(data[17]),
        },
        item10: {
            id: parseInt(data[18]),
            xp: parseInt(data[19]),
        },
        item11: {
            id: parseInt(data[20]),
            xp: parseInt(data[21]),
        },
        item12: {
            id: parseInt(data[22]),
            xp: parseInt(data[23]),
        },
        item13: {
            id: parseInt(data[24]),
            xp: parseInt(data[25]),
        },
        item14: {
            id: parseInt(data[26]),
            xp: parseInt(data[27]),
        },
        item15: {
            id: parseInt(data[28]),
            xp: parseInt(data[29]),
        },
        mutated: convertToBoolean(parseInt(data[30])),
    };
}

export function parseItems(data: string[]) {
    const purchases = [];
    const chunkedArray = chunkArray(data, 5);
    for (let i = 0; i < chunkedArray.length; i++) {
        purchases.push({
            item: {
                id: parseInt(chunkedArray[i][0]),
                tier: parseInt(chunkedArray[i][1]),
                itemType: parseInt(chunkedArray[i][2]),
                slot: parseInt(chunkedArray[i][3]),
            },
            price: parseInt(chunkedArray[i][4]),
        });
    }
    return purchases;
}

export function parseItemLevels(data: string[]) {
    const itemLevels = [];
    const chunkedArray = chunkArray(data, 8);
    for (let i = 0; i < chunkedArray.length; i++) {
        itemLevels.push({
            itemId: parseInt(chunkedArray[i][0]),
            previousLevel: parseInt(chunkedArray[i][1]),
            newLevel: parseInt(chunkedArray[i][2]),
            suffixUnlocked: convertToBoolean(parseInt(chunkedArray[i][3])),
            prefixesUnlocked: convertToBoolean(parseInt(chunkedArray[i][4])),
            specials: {
                special1: parseInt(chunkedArray[i][5]),
                special2: parseInt(chunkedArray[i][6]),
                special3: parseInt(chunkedArray[i][7]),
            },
        });
    }
    return itemLevels;
}

export function parseEquippedItems(data: string[]) {
    const equippedLength = parseInt(data[0]);
    const equippedItems = [];
    const unequippedItems = [];
    for (let i = 1; i <= equippedLength; i++) {
        equippedItems.push(parseInt(data[i]));
    }
    const unequippedLength = parseInt(data[equippedLength + 1]);
    for (let i = 2; i <= unequippedLength + 1; i++) {
        unequippedItems.push(parseInt(data[i + equippedLength]));
    }
    return { equippedItems, unequippedItems };
}

export function parseEquipmentChanged(data: string[]) {
    const equippedLength = parseInt(data[0]);
    const equippedItems = [];
    const baggedItems = [];
    const droppedItems = [];
    for (let i = 1; i <= equippedLength; i++) {
        equippedItems.push(parseInt(data[i]));
    }
    const baggedLength = parseInt(data[equippedLength + 1]);
    for (let i = 2; i <= baggedLength + 1; i++) {
        baggedItems.push(parseInt(data[i + equippedLength]));
    }
    const droppedLength = parseInt(data[baggedLength + 1]);
    for (let i = 2; i <= droppedLength + 1; i++) {
        droppedItems.push(parseInt(data[i + baggedLength]));
    }
    return { equippedItems, baggedItems, droppedItems };
}

export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array?.length; i += chunkSize) {
        const nextChunk = array?.slice(i, i + chunkSize);
        chunks.push(nextChunk);
        if (nextChunk.length < chunkSize) break; // Stop if we've hit the end of the array
    }
    return chunks;
}

export function parseStartGameEvent(data: string[]): {
    name: string;
    event: EventTypes.StartGameEvent;
} {
    return {
        name: SELECTORS.StartGame,
        event: {
            adventurerState: parseAdventurerState(data.slice(0, 31)),
            adventurerMeta: parseAdventurerMeta(data.slice(31, 42)),
            revealBlock: parseInt(data[42]),
        },
    };
}

export function parseAdventurerUpgradedEvent(data: string[]): {
    name: string;
    event: EventTypes.AdventurerUpgradedEvent;
} {
    return {
        name: SELECTORS.AdventurerUpgraded,
        event: {
            adventurerStateWithBag: {
                adventurerState: parseAdventurerState(data.slice(0, 31)),
                bag: parseBag(data.slice(32, 63)),
            },
            strengthIncrease: parseInt(data[64]),
            dexterityIncrease: parseInt(data[65]),
            vitalityIncrease: parseInt(data[66]),
            intelligenceIncrease: parseInt(data[67]),
            wisdomIncrease: parseInt(data[68]),
            charismaIncrease: parseInt(data[69]),
        },
    };
}

export function parseDiscoveredHealthEvent(data: string[]): {
    name: string;
    event: EventTypes.DiscoveredHealthEvent;
} {
    return {
        name: SELECTORS.DiscoveredHealth,
        event: {
            adventurerState: parseAdventurerState(data.slice(0, 31)),
            healthAmount: parseInt(data[32]),
        },
    };
}

export function parseDiscoveredGoldEvent(data: string[]): {
    name: string;
    event: EventTypes.DiscoveredGoldEvent;
} {
    return {
        name: SELECTORS.DiscoveredGold,
        event: {
            adventurerState: parseAdventurerState(data.slice(0, 31)),
            goldAmount: parseInt(data[32]),
        },
    };
}

export function parseDiscoveredXPEvent(data: string[]): {
    name: string;
    event: EventTypes.DiscoveredXPEvent;
} {
    return {
        name: SELECTORS.DiscoveredXP,
        event: {
            adventurerState: parseAdventurerState(data.slice(0, 31)),
            xpAmount: parseInt(data[32]),
        },
    };
}

export function parseDiscoveredLootEvent(data: string[]): {
    name: string;
    event: EventTypes.DiscoveredLootEvent;
} {
    return {
        name: SELECTORS.DiscoveredLoot,
        event: {
            adventurerState: parseAdventurerState(data.slice(0, 31)),
            itemId: parseInt(data[32]),
        },
    };
}

export function parseEquipmentChangedEvent(data: string[]): {
    name: string;
    event: EventTypes.EquipmentChangedEvent;
} {
    const { equippedItems, baggedItems, droppedItems } = parseEquipmentChanged(
        data.slice(63)
    );
    return {
        name: SELECTORS.EquipmentChanged,
        event: {
            adventurerStateWithBag: {
                adventurerState: parseAdventurerState(data.slice(0, 31)),
                bag: parseBag(data.slice(32, 63)),
            },
            equippedItems,
            baggedItems,
            droppedItems,
        },
    };
}

export function parseDodgedObstacleEvent(data: string[]): {
    name: string;
    event: EventTypes.DodgedObstacleEvent;
} {
    return {
        name: SELECTORS.DodgedObstacle,
        event: {
            adventurerState: parseAdventurerState(data.slice(0, 31)),
            id: parseInt(data[32]),
            level: parseInt(data[33]),
            damageTaken: parseInt(data[34]),
            damageLocation: parseInt(data[35]),
            xpEarnedAdventurer: parseInt(data[36]),
            xpEarnedItems: parseInt(data[37]),
        },
    };
}

export function parseHitByObstacleEvent(data: string[]): {
    name: string;
    event: EventTypes.HitByObstacleEvent;
} {
    return {
        name: SELECTORS.HitByObstacle,
        event: {
            adventurerState: parseAdventurerState(data.slice(0, 31)),
            id: parseInt(data[32]),
            level: parseInt(data[33]),
            damageTaken: parseInt(data[34]),
            damageLocation: parseInt(data[35]),
            xpEarnedAdventurer: parseInt(data[36]),
            xpEarnedItems: parseInt(data[37]),
        },
    };
}

export function parseDiscoveredBeastEvent(data: string[]): {
    name: string;
    event: EventTypes.DiscoveredBeastEvent;
} {
    return {
        name: SELECTORS.DiscoveredBeast,
        event: {
            adventurerState: parseAdventurerState(data.slice(0, 31)),
            seed: parseInt(data[32]),
            id: parseInt(data[33]),
            beastSpecs: {
                tier: parseInt(data[34]),
                itemType: parseInt(data[35]),
                level: parseInt(data[36]),
                specials: {
                    special1: parseInt(data[37]),
                    special2: parseInt(data[38]),
                    special3: parseInt(data[39]),
                },
            },
        },
    };
}

export function parseAmbushedByBeastEvent(data: string[]): {
    name: string;
    event: EventTypes.AmbushedByBeastEvent;
} {
    return {
        name: SELECTORS.AmbushedByBeast,
        event: {
            adventurerState: parseAdventurerState(data.slice(0, 31)),
            seed: parseInt(data[32]),
            id: parseInt(data[33]),
            beastSpecs: {
                tier: parseInt(data[34]),
                itemType: parseInt(data[35]),
                level: parseInt(data[36]),
                specials: {
                    special1: parseInt(data[37]),
                    special2: parseInt(data[38]),
                    special3: parseInt(data[39]),
                },
            },
            damage: parseInt(data[40]),
            criticalHit: convertToBoolean(parseInt(data[41])),
            location: parseInt(data[42]),
        },
    };
}

export function parseAttackedBeastEvent(data: string[]): {
    name: string;
    event: EventTypes.AttackedBeastEvent;
} {
    return {
        name: SELECTORS.AttackedBeast,
        event: {
            adventurerState: parseAdventurerState(data.slice(0, 31)),
            seed: parseInt(data[32]),
            id: parseInt(data[33]),
            beastSpecs: {
                tier: parseInt(data[34]),
                itemType: parseInt(data[35]),
                level: parseInt(data[36]),
                specials: {
                    special1: parseInt(data[37]),
                    special2: parseInt(data[38]),
                    special3: parseInt(data[39]),
                },
            },
            damage: parseInt(data[40]),
            criticalHit: convertToBoolean(parseInt(data[41])),
            location: parseInt(data[42]),
        },
    };
}

export function parseAttackedByBeastEvent(data: string[]): {
    name: string;
    event: EventTypes.AttackedByBeastEvent;
} {
    return {
        name: SELECTORS.AttackedByBeast,
        event: {
            adventurerState: parseAdventurerState(data.slice(0, 31)),
            seed: parseInt(data[32]),
            id: parseInt(data[33]),
            beastSpecs: {
                tier: parseInt(data[34]),
                itemType: parseInt(data[35]),
                level: parseInt(data[36]),
                specials: {
                    special1: parseInt(data[37]),
                    special2: parseInt(data[38]),
                    special3: parseInt(data[39]),
                },
            },
            damage: parseInt(data[40]),
            criticalHit: convertToBoolean(parseInt(data[41])),
            location: parseInt(data[42]),
        },
    };
}

export function parseSlayedBeastEvent(data: string[]): {
    name: string;
    event: EventTypes.SlayedBeastEvent;
} {
    return {
        name: SELECTORS.SlayedBeast,
        event: {
            adventurerState: parseAdventurerState(data.slice(0, 31)),
            seed: parseInt(data[32]),
            id: parseInt(data[33]),
            beastSpecs: {
                tier: parseInt(data[34]),
                itemType: parseInt(data[35]),
                level: parseInt(data[36]),
                specials: {
                    special1: parseInt(data[37]),
                    special2: parseInt(data[38]),
                    special3: parseInt(data[39]),
                },
            },
            damageDealt: parseInt(data[40]),
            criticalHit: convertToBoolean(parseInt(data[41])),
            xpEarnedAdventurer: parseInt(data[42]),
            xpEarnedItems: parseInt(data[43]),
            goldEarned: parseInt(data[44]),
        },
    };
}

export function parseFleeFailedEvent(data: string[]): {
    name: string;
    event: EventTypes.FleeFailedEvent;
} {
    return {
        name: SELECTORS.FleeFailed,
        event: {
            adventurerState: parseAdventurerState(data.slice(0, 31)),
            seed: parseInt(data[32]),
            id: parseInt(data[33]),
            beastSpecs: {
                tier: parseInt(data[34]),
                itemType: parseInt(data[35]),
                level: parseInt(data[36]),
                specials: {
                    special1: parseInt(data[37]),
                    special2: parseInt(data[38]),
                    special3: parseInt(data[39]),
                },
            },
        },
    };
}

export function parseFleeSucceededEvent(data: string[]): {
    name: string;
    event: EventTypes.FleeSucceededEvent;
} {
    return {
        name: SELECTORS.FleeSucceeded,
        event: {
            adventurerState: parseAdventurerState(data.slice(0, 31)),
            seed: parseInt(data[32]),
            id: parseInt(data[33]),
            beastSpecs: {
                tier: parseInt(data[34]),
                itemType: parseInt(data[35]),
                level: parseInt(data[36]),
                specials: {
                    special1: parseInt(data[37]),
                    special2: parseInt(data[38]),
                    special3: parseInt(data[39]),
                },
            },
        },
    };
}

export function parsePurchasedItemsEvent(data: string[]): {
    name: string;
    event: EventTypes.PurchasedItemsEvent;
} {
    return {
        name: SELECTORS.PurchasedItems,
        event: {
            adventurerStateWithBag: {
                adventurerState: parseAdventurerState(data.slice(0, 31)),
                bag: parseBag(data.slice(32, 63)),
            },
            purchases: parseItems(data.slice(64)),
        },
    };
}

export function parsePurchasedPotionsEvent(data: string[]): {
    name: string;
    event: EventTypes.PurchasedPotionsEvent;
} {
    return {
        name: SELECTORS.PurchasedPotions,
        event: {
            adventurerState: parseAdventurerState(data.slice(0, 31)),
            quantity: parseInt(data[32]),
            cost: parseInt(data[33]),
            health: parseInt(data[34]),
        },
    };
}

export function parseEquippedItemsEvent(data: string[]): {
    name: string;
    event: EventTypes.EquippedItemsEvent;
} {
    const { equippedItems, unequippedItems } = parseEquippedItems(
        data.slice(63)
    );
    return {
        name: SELECTORS.EquippedItems,
        event: {
            adventurerStateWithBag: {
                adventurerState: parseAdventurerState(data.slice(0, 31)),
                bag: parseBag(data.slice(32, 63)),
            },
            equippedItems,
            unequippedItems,
        },
    };
}

export function parseDroppedItemsEvent(data: string[]): {
    name: string;
    event: EventTypes.DroppedItemsEvent;
} {
    const itemIds = data.slice(64).map((id) => parseInt(id));
    return {
        name: SELECTORS.DroppedItems,
        event: {
            adventurerStateWithBag: {
                adventurerState: parseAdventurerState(data.slice(0, 31)),
                bag: parseBag(data.slice(32, 63)),
            },
            itemIds,
        },
    };
}

export function parseGreatnessIncreasedEvent(data: string[]): {
    name: string;
    event: EventTypes.GreatnessIncreasedEvent;
} {
    return {
        name: SELECTORS.GreatnessIncreased,
        event: {
            adventurerState: parseAdventurerState(data.slice(0, 31)),
            itemId: parseInt(data[32]),
            previousLevel: parseInt(data[33]),
            newLevel: parseInt(data[34]),
        },
    };
}

export function parseItemsLeveledUpEvent(data: string[]): {
    name: string;
    event: EventTypes.ItemsLeveledUpEvent;
} {
    return {
        name: SELECTORS.ItemsLeveledUp,
        event: {
            adventurerState: parseAdventurerState(data.slice(0, 31)),
            items: parseItemLevels(data.slice(33)),
        },
    };
}

export function parseNewHighScoreEvent(data: string[]): {
    name: string;
    event: EventTypes.NewHighScoreEvent;
} {
    return {
        name: SELECTORS.NewHighScore,
        event: {
            adventurerState: parseAdventurerState(data.slice(0, 31)),
            rank: parseInt(data[32]),
        },
    };
}

export function parseAdventurerDiedEvent(data: string[]): {
    name: string;
    event: EventTypes.AdventurerDiedEvent;
} {
    return {
        name: SELECTORS.AdventurerDied,
        event: {
            adventurerState: parseAdventurerState(data.slice(0, 31)),
            killedByBeast: parseInt(data[32]),
            killedByObstacle: parseInt(data[33]),
            callerAddress: data[34],
        },
    };
}

export function parseAdventurerLeveledUpEvent(data: string[]): {
    name: string;
    event: EventTypes.AdventurerLeveledUpEvent;
} {
    return {
        name: SELECTORS.AdventurerLeveledUp,
        event: {
            adventurerState: parseAdventurerState(data.slice(0, 31)),
            previousLevel: parseInt(data[32]),
            newLevel: parseInt(data[33]),
        },
    };
}

export function parseUpgradesAvailableEvent(data: string[]): {
    name: string;
    event: EventTypes.UpgradesAvailableEvent;
} {
    const newItemsIds = data.slice(33).map((id) => parseInt(id));
    return {
        name: SELECTORS.UpgradesAvailable,
        event: {
            adventurerState: parseAdventurerState(data.slice(0, 31)),
            items: newItemsIds,
        },
    };
}

export function getKeyFromValue(
    data: Record<number, string>,
    value: string
): string | null {
    for (const key in data) {
        if (data[key] === value) {
            return key;
        }
    }
    return null;
}

export function parseEvents(
    receipt: InvokeTransactionReceiptResponse
): Array<any> {
    let events: Array<any> = [];
    if (!receipt.events) {
        throw new Error(`No events found`);
    }

    for (let raw of receipt.events) {
        let eventName: string | null = getKeyFromValue(
            HASHED_SELECTORS,
            raw.keys[0]
        );

        if (!eventName) {
            throw new Error(`Event name not found`);
        }

        switch (eventName) {
            case HASHED_SELECTORS.StartGame:
                events.push(parseStartGameEvent(raw.keys));
                break;
            case HASHED_SELECTORS.AdventurerUpgraded:
                events.push(parseAdventurerUpgradedEvent(raw.keys));
                break;
            case HASHED_SELECTORS.DiscoveredHealth:
                events.push(parseDiscoveredHealthEvent(raw.keys));
                break;
            case HASHED_SELECTORS.DiscoveredGold:
                events.push(parseDiscoveredGoldEvent(raw.keys));
                break;
            case HASHED_SELECTORS.DiscoveredLoot:
                events.push(parseDiscoveredLootEvent(raw.keys));
                break;
            case HASHED_SELECTORS.DiscoveredXP:
                events.push(parseDiscoveredXPEvent(raw.keys));
                break;
            case HASHED_SELECTORS.EquipmentChanged:
                events.push(parseEquipmentChangedEvent(raw.keys));
                break;
            case HASHED_SELECTORS.DodgedObstacle:
                events.push(parseDodgedObstacleEvent(raw.keys));
                break;
            case HASHED_SELECTORS.HitByObstacle:
                events.push(parseHitByObstacleEvent(raw.keys));
                break;
            case HASHED_SELECTORS.DiscoveredBeast:
                events.push(parseDiscoveredBeastEvent(raw.keys));
                break;
            case HASHED_SELECTORS.AmbushedByBeast:
                events.push(parseAmbushedByBeastEvent(raw.keys));
                break;
            case HASHED_SELECTORS.AttackedBeast:
                events.push(parseAttackedBeastEvent(raw.keys));
                break;
            case HASHED_SELECTORS.AttackedByBeast:
                events.push(parseAttackedByBeastEvent(raw.keys));
                break;
            case HASHED_SELECTORS.SlayedBeast:
                events.push(parseSlayedBeastEvent(raw.keys));
                break;
            case HASHED_SELECTORS.FleeFailed:
                events.push(parseFleeFailedEvent(raw.keys));
                break;
            case HASHED_SELECTORS.FleeSucceeded:
                events.push(parseFleeSucceededEvent(raw.keys));
                break;
            case HASHED_SELECTORS.PurchasedItems:
                events.push(parsePurchasedItemsEvent(raw.keys));
                break;
            case HASHED_SELECTORS.PurchasedPotions:
                events.push(parsePurchasedPotionsEvent(raw.keys));
                break;
            case HASHED_SELECTORS.EquippedItems:
                events.push(parseEquippedItemsEvent(raw.keys));
                break;
            case HASHED_SELECTORS.DroppedItems:
                events.push(parseDroppedItemsEvent(raw.keys));
                break;
            case HASHED_SELECTORS.GreatnessIncreased:
                events.push(parseGreatnessIncreasedEvent(raw.keys));
                break;
            case HASHED_SELECTORS.ItemsLeveledUp:
                events.push(parseItemsLeveledUpEvent(raw.keys));
                break;
            case HASHED_SELECTORS.NewHighScore:
                events.push(parseNewHighScoreEvent(raw.keys));
                break;
            case HASHED_SELECTORS.AdventurerDied:
                events.push(parseAdventurerDiedEvent(raw.keys));
                break;
            case HASHED_SELECTORS.AdventurerLeveledUp:
                events.push(parseAdventurerLeveledUpEvent(raw.keys));
                break;
            case HASHED_SELECTORS.UpgradesAvailable:
                events.push(parseUpgradesAvailableEvent(raw.keys));
                break;

            //  TODO: Add transfer event
            default:
                throw new Error(`Unknown event name: ${eventName}`);
        }
    }

    return events;
}

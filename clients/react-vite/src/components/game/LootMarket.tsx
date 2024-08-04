import { useState } from "react";
import { Button } from "../ui/button";
import { RoundedContainer } from "./RoundedContainer";

const items = [
    {
        id: 1,
        name: "Sword",
        tier: 1,
        slot: "Weapon",
        type: "Sword",
        cost: 100,
    },
    {
        id: 2,
        name: "Axe",
        tier: 1,
        slot: "Weapon",
        type: "Axe",
        cost: 100,
    },
    {
        id: 3,
        name: "Shield",
        tier: 1,
        slot: "Offhand",
        type: "Shield",
        cost: 100,
    },
    {
        id: 4,
        name: "Helmet",
        tier: 1,
        slot: "Head",
        type: "Helmet",
        cost: 100,
    },
    {
        id: 5,
        name: "Chestplate",
        tier: 1,
        slot: "Chest",
        type: "Chestplate",
        cost: 100,
    },
    {
        id: 6,
        name: "Boots",
        tier: 1,
        slot: "Feet",
        type: "Boots",
        cost: 100,
    },
    {
        id: 7,
        name: "Gloves",
        tier: 1,
        slot: "Hands",
        type: "Gloves",
        cost: 100,
    },
    {
        id: 4,
        name: "Helmet",
        tier: 1,
        slot: "Head",
        type: "Helmet",
        cost: 100,
    },
    {
        id: 5,
        name: "Chestplate",
        tier: 1,
        slot: "Chest",
        type: "Chestplate",
        cost: 100,
    },
    {
        id: 6,
        name: "Boots",
        tier: 1,
        slot: "Feet",
        type: "Boots",
        cost: 100,
    },
    {
        id: 7,
        name: "Gloves",
        tier: 1,
        slot: "Hands",
        type: "Gloves",
        cost: 100,
    },
    {
        id: 5,
        name: "Chestplate",
        tier: 1,
        slot: "Chest",
        type: "Chestplate",
        cost: 100,
    },
    {
        id: 6,
        name: "Boots",
        tier: 1,
        slot: "Feet",
        type: "Boots",
        cost: 100,
    },
    {
        id: 7,
        name: "Gloves",
        tier: 1,
        slot: "Hands",
        type: "Gloves",
        cost: 100,
    },
    {
        id: 5,
        name: "Chestplate",
        tier: 1,
        slot: "Chest",
        type: "Chestplate",
        cost: 100,
    },
    {
        id: 6,
        name: "Boots",
        tier: 1,
        slot: "Feet",
        type: "Boots",
        cost: 100,
    },
    {
        id: 7,
        name: "Gloves",
        tier: 1,
        slot: "Hands",
        type: "Gloves",
        cost: 100,
    },
    {
        id: 5,
        name: "Chestplate",
        tier: 1,
        slot: "Chest",
        type: "Chestplate",
        cost: 100,
    },
    {
        id: 6,
        name: "Boots",
        tier: 1,
        slot: "Feet",
        type: "Boots",
        cost: 100,
    },
    {
        id: 7,
        name: "Gloves",
        tier: 1,
        slot: "Hands",
        type: "Gloves",
        cost: 100,
    },
];

export const LootMarket = () => {
    return (
        <RoundedContainer className="bg-primary/40">
            <div className="text-4xl p-4 text-center ">Loot Market</div>

            <RoundedContainer inner>
                <div className="flex justify-between  px-4 py-2">
                    <div>Purchase cost: 100</div>
                    <div>Potions</div>
                </div>

                <RoundedContainer inner>
                    <div className="flex justify-between gap-2 px-4 uppercase text-sm py-1">
                        <div>item</div>
                        <div>Tier</div>
                        <div>Slot</div>
                        <div>Type</div>
                        <div>Cost</div>
                        <div>Actions</div>
                    </div>

                    <RoundedContainer
                        inner
                        className="flex flex-col max-h-[calc(100vh-300px)]"
                    >
                        <div className="flex-grow overflow-y-auto">
                            {items.map((item) => (
                                <LootMarketItem key={item.id} item={item} />
                            ))}
                        </div>
                        <RoundedContainer className="flex gap-4 p-4 justify-between mt-auto">
                            <Button variant="destructive">back</Button>
                            <Button variant="default">Proceed</Button>
                        </RoundedContainer>
                    </RoundedContainer>
                </RoundedContainer>
            </RoundedContainer>
        </RoundedContainer>
    );
};

interface Item {
    id: number;
    name: string;
    tier: number;
    slot: string;
    type: string;
    cost: number;
}

export const LootMarketItem = ({ item }: { item: Item }) => {
    return (
        <div className="grid grid-cols-6 gap-4 items-center px-2 py-2 hover:bg-primary/40">
            <div>{item.name}</div>
            <div>{item.tier}</div>
            <div>{item.slot}</div>
            <div>{item.type}</div>
            <div>{item.cost}</div>
            <div className="justify-self-end">
                <ConfirmButton primaryText={"buy"} />
            </div>
        </div>
    );
};

export const ConfirmButton = ({ primaryText }: { primaryText: string }) => {
    const [showOptions, setShowOptions] = useState(false);

    const handlePrimaryClick = () => {
        setShowOptions(true);
    };

    const handleOptionClick = () => {
        setShowOptions(false);
    };

    return (
        <div className="flex flex-col items-end">
            {!showOptions ? (
                <Button variant="outline" onClick={handlePrimaryClick}>
                    {primaryText}
                </Button>
            ) : (
                <div className="flex gap-1">
                    <Button variant="destructive" onClick={handleOptionClick}>
                        Equip
                    </Button>
                    <Button variant="default" onClick={handleOptionClick}>
                        Bag
                    </Button>
                </div>
            )}
        </div>
    );
};

import { useState } from "react";
import { Button } from "../ui/button";
import { RoundedContainer } from "./RoundedContainer";
import { Slider } from "@/components/ui/slider";
const stats = [
    {
        stat: "Strength",
        description: "Increases your physical damage",
        currentStatPoints: 2,
        onLevelUp: () => {},
    },

    {
        stat: "Intelligence",
        description: "Increases your spell damage",
        currentStatPoints: 2,
        onLevelUp: () => {},
    },
    {
        stat: "Vitality",
        description: "Increases your health points",
        currentStatPoints: 2,
        onLevelUp: () => {},
    },
    {
        stat: "Dexterity",
        description: "Increases your critical chance",
        currentStatPoints: 2,
        onLevelUp: () => {},
    },
    {
        stat: "Wisdom",
        description: "Wisdom increases chance of avoiding a Beast ambush",
        currentStatPoints: 2,
        onLevelUp: () => {},
    },
    {
        stat: "Charisma",
        description:
            "Charisma provides discounts on the marketplace and potions",
        currentStatPoints: 2,
        onLevelUp: () => {},
    },
];

export const LevelUp = () => {
    const [availableStatPoints, setAvailableStatPoints] = useState(2);
    const [statPoints, setStatPoints] = useState(stats.map(() => 0));

    const handleStatChange = (index: number, value: number) => {
        const oldValue = statPoints[index];
        const newStatPoints = [...statPoints];
        newStatPoints[index] = value;
        setStatPoints(newStatPoints);
        setAvailableStatPoints((prev) => prev - (value - oldValue));
    };
    return (
        <RoundedContainer className="bg-primary/40">
            <div className="text-4xl p-4 text-center ">Level Up</div>

            <RoundedContainer inner>
                <div className="flex px-4 py-2 text-center uppercase justify-center">
                    <div>{availableStatPoints} Stat Points</div>
                </div>

                <RoundedContainer inner>
                    <RoundedContainer
                        inner
                        className="flex flex-col max-h-[calc(100vh-300px)]"
                    >
                        <div className="flex-grow overflow-y-auto">
                            {stats.map((stat, index) => (
                                <LevelUpBar
                                    key={stat.stat}
                                    level={stat}
                                    availableStatPoints={availableStatPoints}
                                    currentValue={statPoints[index]}
                                    onStatChange={(value) =>
                                        handleStatChange(index, value)
                                    }
                                    currentPlayerStat={stat.currentStatPoints}
                                />
                            ))}
                        </div>
                        <RoundedContainer
                            inner
                            className="flex gap-4 p-4 justify-between mt-auto"
                        >
                            <Button variant="destructive">back</Button>
                            <Button variant="default">Proceed</Button>
                        </RoundedContainer>
                    </RoundedContainer>
                </RoundedContainer>
            </RoundedContainer>
        </RoundedContainer>
    );
};

interface LevelUpBarProps {
    currentStatPoints: number;
    stat: string;
    description: string;
    onLevelUp: () => void;
}

export const LevelUpBar = ({
    level,
    availableStatPoints,
    currentValue,
    onStatChange,
    currentPlayerStat,
}: {
    level: LevelUpBarProps;
    availableStatPoints: number;
    currentValue: number;
    onStatChange: (value: number) => void;
    currentPlayerStat: number; // Add this line
}) => {
    return (
        <div className="p-4">
            <div className="text-xl flex gap-12 items-center">
                <span className="w-32">{level.stat}</span>
                <Slider
                    className="w-36"
                    value={[currentValue]}
                    max={currentValue + availableStatPoints}
                    step={1}
                    onValueChange={([value]) => onStatChange(value)}
                />
                <div className="flex gap-1">
                    <span className="w-8 text-center">+{currentValue}</span>
                    <span className="w-8 text-center ">
                        [{currentPlayerStat}]
                    </span>
                </div>
            </div>
            <div className="uppercase opacity-75">{level.description}</div>
        </div>
    );
};

import { useMemo } from "react";
import { RoundedContainer } from "./RoundedContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ItemBarList } from "./ItemBarList";
import { Item } from "./ItemBar";

const items: Item[] = [
    {
        id: 1,
        name: "“bane bender” katana of Power",
        greatness: 10,
        type: "Weapon",
    },
    {
        id: 2,
        name: "“bane bender” katana of Power",
        greatness: 20,
        type: "Weapon",
    },
    {
        id: 3,
        name: "“bane bender” katana of Power",
        greatness: 10,
        type: "Weapon",
    },
    {
        id: 4,
        name: "“bane bender” katana of Power",
        greatness: 30,
        type: "Weapon",
    },
    {
        id: 5,
        name: "“bane bender” katana of Power",
        greatness: 40,
        type: "Weapon",
    },
    {
        id: 6,
        name: "“bane bender” katana of Power",
        greatness: 2,
        type: "Weapon",
    },
    {
        id: 7,
        name: "“bane bender” katana of Power",
        greatness: 69,
        type: "Weapon",
    },
    {
        id: 8,
        name: "“bane bender” katana of Power",
        greatness: 10,
        type: "Weapon",
    },
];

export const PlayerTabs = () => {
    const tabs = useMemo(() => {
        return [
            {
                id: 1,
                name: "Equipped",
                content: <ItemBarList items={items} />,
            },
            {
                id: 2,
                name: "Bag",
                content: "Change your password here.",
            },
            {
                id: 3,
                name: "History",
                content: "Change your password here.",
            },
            {
                id: 4,
                name: "Actions",
                content: "Change your password here.",
            },
            {
                id: 5,
                name: "Future",
                content: "Change your password here.",
            },
        ];
    }, []);

    return (
        <RoundedContainer inner className=" rounded-3xl">
            <Tabs defaultValue="Equipped" className="w-full">
                <TabsList className="w-full justify-between gap-3 px-4">
                    {tabs.map((tab) => (
                        <TabsTrigger
                            className="w-full"
                            key={tab.id}
                            value={tab.name}
                        >
                            {tab.name}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {tabs.map((tab) => (
                    <TabsContent className="p-2" key={tab.id} value={tab.name}>
                        {tab.content}
                    </TabsContent>
                ))}
            </Tabs>
        </RoundedContainer>
    );
};

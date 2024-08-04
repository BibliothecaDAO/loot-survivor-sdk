import { Button } from "../ui/button";
import { PlayerCard } from "./PlayerCard";
import { RoundedContainer } from "./RoundedContainer";
import Ring from "@/components/icons/ring.svg";

export const PlayerPage = () => {
    const menuItems = [
        {
            label: "Profile",
            value: "profile",
            icon: <Ring className="w-4" />,
        },
        {
            label: "Inventory",
            value: "inventory",
            icon: <Ring className="w-4" />,
        },
        {
            label: "Settings",
            value: "settings",
            icon: <Ring className="w-4" />,
        },
    ];
    return (
        <RoundedContainer className="bg-primary/40">
            <div className=" flex flex-row gap-2 p-2">
                {menuItems.map((item) => (
                    <Button size={"icon"} key={item.value} className="">
                        {item.icon}
                    </Button>
                ))}
            </div>

            <PlayerCard />

            <div className=" flex flex-row gap-2 p-2">
                {menuItems.map((item) => (
                    <Button size={"icon"} key={item.value} className="">
                        {item.icon}
                    </Button>
                ))}
            </div>
        </RoundedContainer>
    );
};

import { PlayerProfile } from "./PlayerProfile";
import { PlayerTabs } from "./PlayerTabs";
import { RoundedContainer } from "./RoundedContainer";

export const PlayerCard = () => {
    return (
        <RoundedContainer className="border-primary border rounded-3xl">
            <div className="p-4 ">
                <PlayerProfile
                    player={{
                        name: "John Doe",
                        id: 1,
                        avatar: "/images/avatar.png",
                        gold: 1000,
                        health: 100,
                        maxHealth: 100,
                        level: 1,
                    }}
                />
            </div>

            <PlayerTabs />
        </RoundedContainer>
    );
};

import type { Meta, StoryObj } from "@storybook/react";
import "../index.css";
import { PlayerCard } from "@/components/game/PlayerCard";

const meta = {
    title: "Example/PlayerCard",
    component: PlayerCard,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: "fullscreen",
        backgrounds: {
            default: "dark",
        },
    },

    args: {},
} satisfies Meta<typeof PlayerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
    args: {
        player: {
            name: "John Doe",
            id: 1,
            avatar: "/images/avatar.png",
            gold: 1000,
            health: 100,
            maxHealth: 100,
            level: 1,
        },
    },
};

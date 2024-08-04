import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import "../index.css";
import ItemBar from "@/components/game/ItemBar";
import { BeastCard } from "@/components/game/BeastCard";

const meta = {
    title: "Example/BeastCard",
    component: BeastCard,
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
} satisfies Meta<typeof BeastCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
    args: {
        beast: {
            name: "“death bane” giant",

            image: "/images/giant.png",

            health: 100,
            maxHealth: 500,
            level: 4,
        },
    },
};

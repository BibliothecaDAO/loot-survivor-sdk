import type { Meta, StoryObj } from "@storybook/react";
import "../index.css";
import { PlayerTabs } from "@/components/game/PlayerTabs";

const meta = {
    title: "Example/PlayerTabs",
    component: PlayerTabs,
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
} satisfies Meta<typeof PlayerTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
    args: {
        items: [
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
        ],
    },
};

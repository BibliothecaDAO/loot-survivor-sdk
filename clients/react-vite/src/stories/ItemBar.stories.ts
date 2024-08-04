import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import "../index.css";
import ItemBar from "@/components/game/ItemBar";

const meta = {
    title: "Example/ItemBar",
    component: ItemBar,
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
} satisfies Meta<typeof ItemBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
    args: {
        item: {
            id: 1,
            name: "“bane bender” katana of Power",
            greatness: 10,
            type: "Weapon",
        },
    },
};

import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import "../index.css";
import ItemBar from "@/components/game/ItemBar";
import { LootMarket } from "@/components/game/LootMarket";
import { LevelUp } from "@/components/game/LevelUp";

const meta = {
  title: "Example/LevelUp",
  component: LevelUp,
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
} satisfies Meta<typeof LevelUp>;

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

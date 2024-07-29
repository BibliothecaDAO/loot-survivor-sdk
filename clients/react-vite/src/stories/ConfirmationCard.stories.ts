import type { Meta, StoryObj } from "@storybook/react";
import "../index.css";
import { Confirmation } from "@/components/game/Confirming";

const meta = {
  title: "Example/ConfirmationCard",
  component: Confirmation,
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
} satisfies Meta<typeof Confirmation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {},
};

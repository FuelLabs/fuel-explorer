import type { Meta, StoryObj } from "@storybook/react";

import { HStack } from "../Box";

import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Usage: Story = {
  render: () => (
    <HStack>
      <Avatar
        fallback="S"
        src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
      />
      <Avatar fallback="S" />
    </HStack>
  ),
};

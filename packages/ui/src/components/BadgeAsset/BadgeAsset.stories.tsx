import type { Meta, StoryObj } from '@storybook/react';
import { BadgeAsset } from './BadgeAsset';

const meta: Meta<typeof BadgeAsset> = {
  title: 'UI/BadgeAsset',
  component: BadgeAsset,
  argTypes: {
    variant: {
      options: ['solid', 'transparent'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BadgeAsset>;

export const Usage: Story = {
  args: {
    children: 'FUEL V1',
    variant: 'solid',
  },
};

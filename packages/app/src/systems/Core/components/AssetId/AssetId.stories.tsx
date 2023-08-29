import type { Meta, StoryObj } from '@storybook/react';

import { AssetId } from './AssetId';

const meta: Meta<typeof AssetId> = {
  title: 'Core/AssetId',
  component: AssetId,
};

export default meta;
type Story = StoryObj<typeof AssetId>;

export const Default: Story = {
  args: {
    id: '0x0000000000000000000000000000000000000000000000000000000000000000',
  },
};

import type { Meta, StoryObj } from '@storybook/react';

import { FuelLogo } from './FuelLogo';

const meta: Meta<typeof FuelLogo> = {
  title: 'UI/FuelLogo',
  component: FuelLogo,
};

export default meta;
type Story = StoryObj<typeof FuelLogo>;

export const Usage: Story = {
  args: {
    showLettering: true,
    showSymbol: true,
    size: 40,
  },
};

export const NoLettering: Story = {
  args: {
    showLettering: false,
    size: 40,
  },
};

export const NoSymbol: Story = {
  args: {
    showLettering: true,
    showSymbol: false,
    size: 40,
  },
};

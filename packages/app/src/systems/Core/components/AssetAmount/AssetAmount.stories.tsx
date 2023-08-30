import { Box } from '@fuel-ui/react';
import type { Meta, StoryObj } from '@storybook/react';
import { bn } from 'fuels';

import type { AssetAmountProps } from './AssetAmount';
import { AssetAmount } from './AssetAmount';

const meta: Meta<typeof AssetAmount> = {
  title: 'Core/AssetAmount',
  component: AssetAmount,
};

export default meta;
type Story = StoryObj<typeof AssetAmount>;

export const Default: Story = {
  args: {
    symbol: 'ETH',
    amount: bn(1.23456789),
  },
};

export const Icons: Story = {
  render: () => (
    <Box.Flex gap="$4">
      <AssetAmount {...(Default.args as AssetAmountProps)} />
      <AssetAmount {...(Default.args as AssetAmountProps)} negative />
    </Box.Flex>
  ),
};

export const Full: Story = {
  args: {
    symbol: 'ETH',
    amount: bn(1.23456789),
    full: true,
  },
};

export const HideIcon: Story = {
  args: {
    symbol: 'ETH',
    amount: bn(1.23456789),
    hideIcon: true,
  },
};

import { mocks } from '@fuel-explorer/graphql';
import type { Meta, StoryObj } from '@storybook/react';

import { BalanceItem } from './BalanceItem';

const meta: Meta<typeof BalanceItem> = {
  title: 'Account/BalanceItem',
  component: BalanceItem,
};

export default meta;
type Story = StoryObj<typeof BalanceItem>;

export const Usage: Story = {
  render: () => (
    <BalanceItem
      item={mocks.aBalance({
        assetId:
          '0x0000000000000000000000000000000000000000000000000000000000000000',
      })}
    />
  ),
};

export const UnknownAsset: Story = {
  render: () => <BalanceItem item={mocks.aBalance()} />,
};

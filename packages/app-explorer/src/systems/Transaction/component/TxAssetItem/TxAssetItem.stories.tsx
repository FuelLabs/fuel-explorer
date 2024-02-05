import type { Meta, StoryObj } from '@storybook/react';
import { bn } from 'fuels';

import { TxAssetItem } from './TxAssetItem';

const meta: Meta<typeof TxAssetItem> = {
  title: 'Transaction/TxAssetItem',
  component: TxAssetItem,
};

export default meta;
type Story = StoryObj<typeof TxAssetItem>;

export const Usage: Story = {
  render: () => (
    <TxAssetItem
      amountIn={bn(1)}
      amountOut={bn(1)}
      assetId="0x0000000000000000000000000000000000000000"
      className="w-[300px]"
    />
  ),
};

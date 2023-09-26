import { assets } from '@fuels/assets';
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
      assetId={assets[0].assetId}
      className="w-[300px]"
    />
  ),
};

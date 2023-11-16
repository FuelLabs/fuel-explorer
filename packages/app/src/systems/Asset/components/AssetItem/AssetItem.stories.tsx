import { VStack } from '@fuels/ui';
import type { Meta, StoryObj } from '@storybook/react';

import { AssetItem } from './AssetItem';

const meta: Meta<typeof AssetItem> = {
  title: 'Asset/AssetItem',
  component: AssetItem,
};

export default meta;
type Story = StoryObj<typeof AssetItem>;

export const Usage: Story = {
  render: () => (
    <VStack>
      <AssetItem assetId="0x0000000000000000000000000000000000000000000000000000000000000000" />
      <AssetItem assetId="0x00000000000000000000000000000000000000000000000000" />
    </VStack>
  ),
};

export const WithPrefix: Story = {
  render: () => (
    <VStack>
      <AssetItem
        prefix="Input:"
        assetId="0x0000000000000000000000000000000000000000000000000000000000000000"
      />
      <AssetItem
        prefix="Input:"
        assetId="0x00000000000000000000000000000000000000000000000000"
      />
    </VStack>
  ),
};

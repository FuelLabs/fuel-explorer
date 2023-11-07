import { mocks } from '@fuel-explorer/graphql';
import type { Meta, StoryObj } from '@storybook/react';

import { Utxos } from './Utxos';

const meta: Meta<typeof Utxos> = {
  title: 'Account/Utxos',
  component: Utxos,
};

export default meta;
type Story = StoryObj<typeof Utxos>;

const MOCK_ITEMS = Array.from({ length: 10 }).map(() => mocks.anUtxoItem());
const ASSET_ID =
  '0x0000000000000000000000000000000000000000000000000000000000000000';

export const Usage: Story = {
  render: () => <Utxos items={MOCK_ITEMS} assetId={ASSET_ID} />,
};

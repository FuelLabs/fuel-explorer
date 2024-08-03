import { VStack } from '@fuels/ui';
import type { Meta, StoryObj } from '@storybook/react';

import {
  OUTPUT_ASSET,
  OUTPUT_ASSET_UNKNOWN,
  OUTPUT_CONTRACT_CREATED,
} from '../../__mocks__/tx';

import { TxOutput } from './TxOutput';

const meta: Meta<typeof TxOutput> = {
  title: 'Transaction/TxOutput',
  component: TxOutput,
};

export default meta;
type Story = StoryObj<typeof TxOutput>;

export const Asset: Story = {
  render: () => (
    <VStack>
      <TxOutput className="w-[500px]" output={OUTPUT_ASSET} />
      <TxOutput className="w-[500px]" output={OUTPUT_ASSET_UNKNOWN} />
    </VStack>
  ),
};

export const ContractCreated: Story = {
  render: () => (
    <TxOutput className="w-[500px]" output={OUTPUT_CONTRACT_CREATED} />
  ),
};

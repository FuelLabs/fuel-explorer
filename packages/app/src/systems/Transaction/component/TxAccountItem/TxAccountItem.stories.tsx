import { VStack } from '@fuel-explorer/ui/Box';
import type { Meta, StoryObj } from '@storybook/react';
import { bn } from 'fuels';

import { TxAccountTypeEnum } from '../../types';
import { TX_CONTRACT_CALL_MOCK } from '../__mocks__/tx';

import { TxAccountItem } from './TxAccountItem';

const meta: Meta<typeof TxAccountItem> = {
  title: 'Transaction/TxAccountItem',
  component: TxAccountItem,
};

export default meta;
type Story = StoryObj<typeof TxAccountItem>;

export const Usage: Story = {
  render: () => (
    <TxAccountItem
      type="Contract"
      id={TX_CONTRACT_CALL_MOCK.transaction.id}
      spent={bn(1)}
      className="max-w-[300px]"
    />
  ),
};

const TYPES = Object.keys(TxAccountTypeEnum);

export const AllTypes: Story = {
  render: () => (
    <VStack>
      {TYPES.map((type: any) => (
        <TxAccountItem
          key={type}
          id={TX_CONTRACT_CALL_MOCK.transaction.id}
          type={type}
          spent={bn(1)}
          className="max-w-[300px]"
        />
      ))}
    </VStack>
  ),
};

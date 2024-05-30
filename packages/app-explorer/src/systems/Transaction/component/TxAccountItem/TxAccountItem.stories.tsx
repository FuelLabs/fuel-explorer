import { bn } from '@fuel-ts/math';
import { VStack } from '@fuels/ui';
import type { Meta, StoryObj } from '@storybook/react';

import { TX_MOCK } from '../../__mocks__/tx';
import { TxAccountTypeEnum } from '../../types';

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
      className="max-w-[300px]"
      id={TX_MOCK.id}
      spent={bn(1)}
      type="Contract"
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
          className="max-w-[300px]"
          id={TX_MOCK.id}
          spent={bn(1)}
          type={type}
        />
      ))}
    </VStack>
  ),
};

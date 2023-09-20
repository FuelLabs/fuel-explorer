import type { Meta, StoryObj } from '@storybook/react';
import { VStack } from 'pn-ui-primitives/Box';

import { TX_TYPES, TxStatusEnum, type TxType } from '../../types';

import { TxTitle } from './TxTitle';

const meta: Meta<typeof TxTitle> = {
  title: 'Transaction/TxTitle',
  component: TxTitle,
};

export default meta;
type Story = StoryObj<typeof TxTitle>;

export const Usage: Story = {
  render: () => (
    <TxTitle
      type="ContractCall"
      status="Success"
      txHash="0x78d13f111bf301324f34f2a7eaffc546d39598d156af38e7c4ef9fe61ea2c46a"
    />
  ),
};

export const AllTypes: Story = {
  render: () => (
    <VStack>
      {TX_TYPES.map((type) => (
        <TxTitle
          key={type}
          type={type as TxType}
          status={TxStatusEnum.Submitted}
          txHash="0x78d13f111bf301324f34f2a7eaffc546d39598d156af38e7c4ef9fe61ea2c46a"
        />
      ))}
    </VStack>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { HStack, VStack } from 'pn-ui-primitives/Box';

import type { TxStatus, TxType } from '../../types';
import { TX_STATUS, TX_TYPES } from '../../types';

import { TxIcon } from './TxIcon';

const meta: Meta<typeof TxIcon> = {
  title: 'Transaction/TxIcon',
  component: TxIcon,
};

export default meta;
type Story = StoryObj<typeof TxIcon>;

export const Usage: Story = {
  render: () => (
    <VStack>
      {TX_TYPES.map((type) => (
        <HStack key={type}>
          {TX_STATUS.map((status) => (
            <TxIcon
              key={status}
              type={type as TxType}
              status={status as TxStatus}
            />
          ))}
        </HStack>
      ))}
    </VStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <HStack>
      <TxIcon type="ContractCall" status="Success" size="sm" />
      <TxIcon type="ContractCall" status="Success" size="md" />
      <TxIcon type="ContractCall" status="Success" size="lg" />
    </HStack>
  ),
};

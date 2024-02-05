import { HStack, VStack } from '@fuels/ui';
import type { Meta, StoryObj } from '@storybook/react';

import type { TxStatus, TxType } from '../../types';
import { TX_ICON_TYPES, TX_STATUS } from '../../types';

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
      {TX_ICON_TYPES.map((type) => (
        <HStack key={type}>
          {TX_STATUS.map((status) => (
            <TxIcon
              key={status}
              status={status as TxStatus}
              type={type as TxType}
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
      <TxIcon size="sm" status="Success" type="ContractCall" />
      <TxIcon size="md" status="Success" type="ContractCall" />
      <TxIcon size="lg" status="Success" type="ContractCall" />
    </HStack>
  ),
};

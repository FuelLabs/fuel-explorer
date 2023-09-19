import { Box } from '@fuel-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

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
    <Box.VStack>
      {TX_TYPES.map((type) => (
        <Box.HStack key={type}>
          {TX_STATUS.map((status) => (
            <TxIcon
              key={status}
              type={type as TxType}
              status={status as TxStatus}
            />
          ))}
        </Box.HStack>
      ))}
    </Box.VStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Box.HStack>
      <TxIcon type="contract-call" status="success" size="sm" />
      <TxIcon type="contract-call" status="success" size="md" />
      <TxIcon type="contract-call" status="success" size="lg" />
    </Box.HStack>
  ),
};

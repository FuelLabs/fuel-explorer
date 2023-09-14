import { Box } from '@fuel-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

import type { TxStatus, TxType } from '../../types';
import { TX_ICON_MAP, TX_STATUS_MAP } from '../../types';

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
      {Object.keys(TX_ICON_MAP).map((type) => (
        <Box.HStack key={type}>
          {Object.keys(TX_STATUS_MAP).map((status) => (
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

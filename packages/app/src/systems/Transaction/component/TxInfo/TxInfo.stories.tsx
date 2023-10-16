import { Badge, VStack } from '@fuels/ui';
import type { Meta, StoryObj } from '@storybook/react';

import { TxInfo } from './TxInfo';

const meta: Meta<typeof TxInfo> = {
  title: 'Transaction/TxInfo',
  component: TxInfo,
};

export default meta;
type Story = StoryObj<typeof TxInfo>;

export const Usage: Story = {
  render: () => (
    <VStack>
      <TxInfo
        className="w-[350px]"
        name="Status"
        description="Here a description"
      >
        <Badge color={'green'} size="1" variant="solid">
          Success
        </Badge>
      </TxInfo>
      <TxInfo
        className="w-[350px]"
        name="Timestamp"
        description="Here a description"
      >
        ~5 days ago
      </TxInfo>
    </VStack>
  ),
};

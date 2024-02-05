import { Badge, VStack } from '@fuels/ui';
import type { Meta, StoryObj } from '@storybook/react';

import { CardInfo } from './CardInfo';

const meta: Meta<typeof CardInfo> = {
  title: 'Transaction/CardInfo',
  component: CardInfo,
};

export default meta;
type Story = StoryObj<typeof CardInfo>;

export const Usage: Story = {
  render: () => (
    <VStack>
      <CardInfo
        className="w-[350px]"
        name="Status"
        description="Here a description"
      >
        <Badge color={'green'} size="1" variant="solid">
          Success
        </Badge>
      </CardInfo>
      <CardInfo
        className="w-[350px]"
        name="Timestamp"
        description="Here a description"
      >
        ~5 days ago
      </CardInfo>
    </VStack>
  ),
};

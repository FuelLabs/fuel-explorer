import { Box, VStack } from '@fuel-explorer/ui/Box';
import { Icon } from '@fuel-explorer/ui/Icon';
import type { Meta, StoryObj } from '@storybook/react';
import { IconCode } from '@tabler/icons-react';
import Image from 'next/image';

import { EntityItem } from './EntityItem';

const meta: Meta<typeof EntityItem> = {
  title: 'Core/EntityItem',
  component: EntityItem,
};

export default meta;
type Story = StoryObj<typeof EntityItem>;

const DEFAULT_ARGS = {
  id: '0x0000000000000000000000000000000000000000000000000000000000000000',
  title: 'Ethereum',
  icon: (
    <Image width={30} height={30} alt="Ethereum Logo" src="/assets/eth.svg" />
  ),
};

export const Default: Story = {
  args: DEFAULT_ARGS,
};

export const Variations: Story = {
  render: () => (
    <VStack gap="4">
      <EntityItem
        icon={
          <Box className="rounded-full bg-gray-6 p-2">
            <Icon icon={IconCode} className="text-white" />
          </Box>
        }
        title="Contract"
        id={DEFAULT_ARGS.id}
      />
      <EntityItem {...DEFAULT_ARGS} />
    </VStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <VStack gap="4">
      <EntityItem {...DEFAULT_ARGS} size="sm" />
      <EntityItem {...DEFAULT_ARGS} size="md" />
      <EntityItem {...DEFAULT_ARGS} size="lg" />
    </VStack>
  ),
};

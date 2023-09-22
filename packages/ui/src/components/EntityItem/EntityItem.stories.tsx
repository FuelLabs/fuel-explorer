import type { Meta, StoryObj } from '@storybook/react';
import { IconCode } from '@tabler/icons-react';

import { VStack } from '../Box';
import { Icon } from '../Icon';

import { EntityItem } from './EntityItem';

const meta: Meta<typeof EntityItem> = {
  title: 'Web3/EntityItem',
  component: EntityItem,
};

export default meta;
type Story = StoryObj<typeof EntityItem>;

const DEFAULT_ARGS = {
  children: (
    <>
      <EntityItem.Slot>
        <img width={30} height={30} alt="Ethereum Logo" src="/assets/eth.svg" />
      </EntityItem.Slot>
      <EntityItem.Info
        title="Ethereum"
        id="0x0000000000000000000000000000000000000000000000000000000000000000"
      />
    </>
  ),
};

export const Default: Story = {
  args: DEFAULT_ARGS,
};

export const Variations: Story = {
  render: () => (
    <VStack gap="4">
      <EntityItem>
        <EntityItem.Slot>
          <Icon
            size={24}
            icon={IconCode}
            className="rounded-full bg-gray-6 flex justify-centered items-center w-full h-full p-[7px]"
          />
        </EntityItem.Slot>
        <EntityItem.Info title="Contract" id="0x000000000" />
      </EntityItem>
      <EntityItem>{DEFAULT_ARGS.children}</EntityItem>
    </VStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <VStack gap="4">
      <EntityItem size="sm">{DEFAULT_ARGS.children}</EntityItem>
      <EntityItem size="md">{DEFAULT_ARGS.children}</EntityItem>
      <EntityItem size="lg">{DEFAULT_ARGS.children}</EntityItem>
    </VStack>
  ),
};

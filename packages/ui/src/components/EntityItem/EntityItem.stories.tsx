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
        <img alt="Ethereum Logo" height={30} src="/assets/eth.svg" width={30} />
      </EntityItem.Slot>
      <EntityItem.Info
        id="0x0000000000000000000000000000000000000000000000000000000000000000"
        title="Ethereum"
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
            className="rounded-full bg-gray-6 flex justify-centered items-center w-full h-full p-[7px]"
            icon={IconCode}
            size={24}
          />
        </EntityItem.Slot>
        <EntityItem.Info id="0x000000000" title="Contract" />
      </EntityItem>
      <EntityItem>{DEFAULT_ARGS.children}</EntityItem>
    </VStack>
  ),
};

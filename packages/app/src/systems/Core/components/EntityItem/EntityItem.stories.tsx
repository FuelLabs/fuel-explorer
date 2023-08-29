import { Box, Icon, Tag } from '@fuel-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

import { AssetIcon } from '../AssetIcon';

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
  icon: <AssetIcon asset="eth" />,
};

export const Default: Story = {
  args: DEFAULT_ARGS,
};

export const Variations: Story = {
  render: () => (
    <Box.Stack gap="$4">
      <EntityItem
        icon={
          <Tag intent="base" variant="ghost">
            <Icon
              icon="Code"
              css={{
                is: ['centered'],
                bg: '$intentsBase4',
                borderRadius: '$full',
              }}
            />
          </Tag>
        }
        title="Contract"
        id={DEFAULT_ARGS.id}
      />
      <EntityItem {...DEFAULT_ARGS} />
    </Box.Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Box.Stack gap="$4">
      <EntityItem {...DEFAULT_ARGS} size="sm" />
      <EntityItem {...DEFAULT_ARGS} size="md" />
      <EntityItem {...DEFAULT_ARGS} size="lg" />
    </Box.Stack>
  ),
};

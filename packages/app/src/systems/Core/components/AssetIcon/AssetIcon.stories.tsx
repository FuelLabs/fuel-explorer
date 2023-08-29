import { Box } from '@fuel-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

import { AssetIcon } from './AssetIcon';

const meta: Meta<typeof AssetIcon> = {
  title: 'Core/AssetIcon',
  component: AssetIcon,
};

export default meta;
type Story = StoryObj<typeof AssetIcon>;

export const Default: Story = {
  args: {
    asset: 'eth',
  },
};

export const Sizes: Story = {
  render: () => (
    <Box.Stack gap="$4">
      <AssetIcon asset="eth" size="sm" />
      <AssetIcon asset="eth" size="md" />
      <AssetIcon asset="eth" size="lg" />
    </Box.Stack>
  ),
};

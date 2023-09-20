import type { Meta, StoryObj } from '@storybook/react';
import { IconPlus } from '@tabler/icons-react';

import { IconButton } from '../IconButton/IconButton';

import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Overlay/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Usage: Story = {
  render: () => (
    <Tooltip content="Add to library">
      <IconButton radius="full" icon={IconPlus} aria-label="Add" />
    </Tooltip>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconPlus,
} from '@tabler/icons-react';

import { IconButton } from '../IconButton/IconButton';

import { Box } from 'src/components/Box';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Overlay/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Usage: Story = {
  render: () => (
    <Box className="w-full flex justify-center absolute top-1/2 transform -translate-y-1/2">
      <Tooltip content="Add to library">
        <IconButton aria-label="Add" icon={IconPlus} radius="full" />
      </Tooltip>
    </Box>
  ),
};

export const Variant: Story = {
  render: () => (
    <Box className="w-full flex items-center justify-around absolute top-1/2 transform -translate-y-1/2">
      <Tooltip content="Add to library" side="top">
        <IconButton
          aria-label="Tooltip on top"
          icon={IconChevronUp}
          radius="full"
        />
      </Tooltip>
      <Tooltip content="Add to library" side="left">
        <IconButton
          aria-label="Tooltip on left"
          icon={IconChevronLeft}
          radius="full"
        />
      </Tooltip>
      <Tooltip content="Add to library" side="right">
        <IconButton
          aria-label="Tooltip on right"
          icon={IconChevronRight}
          radius="full"
        />
      </Tooltip>
      <Tooltip content="Add to library" side="bottom">
        <IconButton
          aria-label="Tooltip on bottom"
          icon={IconChevronDown}
          radius="full"
        />
      </Tooltip>
    </Box>
  ),
};

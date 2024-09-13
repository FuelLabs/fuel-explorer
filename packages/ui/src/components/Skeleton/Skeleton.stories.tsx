import type { Meta, StoryObj } from '@storybook/react';

import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  argTypes: {
    width: {
      control: { type: 'text' },
    },
    height: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Usage: Story = {
  args: {
    width: '100%',
    height: '26px',
  },
};

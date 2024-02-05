import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '../Box';

import { AspectRatio } from './AspectRatio';

const meta: Meta<typeof AspectRatio> = {
  title: 'UI/AspectRatio',
  component: AspectRatio,
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Usage: Story = {
  render: () => (
    <Box className="max-w-lg">
      <AspectRatio ratio={16 / 8}>
        <img
          alt="A house in a forest"
          className="w-full h-full object-cover rounded-lg"
          src="https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80"
        />
      </AspectRatio>
    </Box>
  ),
};

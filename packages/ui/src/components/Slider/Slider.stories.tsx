import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '../Box';

import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Form/Slider',
  component: Slider,
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Usage: Story = {
  render: () => (
    <Box className="w-[400px]">
      <Slider defaultValue={[50]} />
    </Box>
  ),
};

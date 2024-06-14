import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '../Box';

import { ToggleGroup } from './ToggleGroup';

const meta: Meta<typeof ToggleGroup> = {
  title: 'UI/ToggleGroup',
  component: ToggleGroup,
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Usage: Story = {
  render: () => (
    <Box className="max-w-lg">
      <ToggleGroup defaultValue="center" aria-label="Text alignment">
        <ToggleGroup.Item value="left" aria-label="Left aligned">
          Left
        </ToggleGroup.Item>
        <ToggleGroup.Item value="center" aria-label="Center aligned">
          Center
        </ToggleGroup.Item>
        <ToggleGroup.Item value="right" aria-label="Right aligned">
          Right
        </ToggleGroup.Item>
      </ToggleGroup>
    </Box>
  ),
};

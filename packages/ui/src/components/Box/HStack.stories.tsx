import type { Meta, StoryObj } from '@storybook/react';

import type { HStackProps } from './';
import { Box, HStack } from './';

const meta: Meta<typeof HStack> = {
  title: 'Layout/HStack',
  component: HStack,
};

export default meta;
type Story = StoryObj<typeof Box>;

const DecorativeBox = (props: HStackProps) => {
  return (
    <HStack
      {...props}
      className={`w-full h-full bg-gray-a4 border border-dashed border-border ${props.className}`}
    />
  );
};

export const Usage: Story = {
  name: 'HStack',
  render: () => (
    <HStack gap="3">
      <Box className="block w-8 h-8">
        <DecorativeBox />
      </Box>
      <Box className="block w-8 h-8">
        <DecorativeBox />
      </Box>
      <Box className="block w-8 h-8">
        <DecorativeBox />
      </Box>
      <Box className="block w-8 h-8">
        <DecorativeBox />
      </Box>
      <Box className="block w-8 h-8">
        <DecorativeBox />
      </Box>
    </HStack>
  ),
};

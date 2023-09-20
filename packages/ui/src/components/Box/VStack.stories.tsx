import type { Meta, StoryObj } from '@storybook/react';

import type { VStackProps } from './';
import { Box, VStack } from './';

const meta: Meta<typeof VStack> = {
  title: 'Layout/VStack',
  component: VStack,
};

export default meta;
type Story = StoryObj<typeof Box>;

const DecorativeBox = (props: VStackProps) => {
  return (
    <VStack
      {...props}
      className={`w-full h-full bg-gray-a4 border border-dashed border-border ${props.className}`}
    />
  );
};

export const Usage: Story = {
  name: 'VStack',
  render: () => (
    <VStack gap="3">
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
    </VStack>
  ),
};

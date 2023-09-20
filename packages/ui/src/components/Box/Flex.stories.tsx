import type { Meta, StoryObj } from '@storybook/react';

import type { FlexProps } from './';
import { Box, Flex } from './';

const meta: Meta<typeof Flex> = {
  title: 'Layout/Flex',
  component: Flex,
};

export default meta;
type Story = StoryObj<typeof Box>;

const DecorativeBox = (props: FlexProps) => {
  return (
    <Flex
      {...props}
      className={`w-full h-full bg-gray-a4 border border-dashed border-border ${props.className}`}
    />
  );
};

export const Usage: Story = {
  name: 'Flex',
  render: () => (
    <Flex>
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
    </Flex>
  ),
};

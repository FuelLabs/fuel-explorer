import type { Meta, StoryObj } from '@storybook/react';

import { Box } from './Box';
import { Flex } from './Flex';
import type { FlexProps } from './Flex';

const meta: Meta<typeof Box> = {
  title: 'Layout/Box',
  component: Box,
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
  render: () => (
    <Box className="block w-8 h-8">
      <DecorativeBox />
    </Box>
  ),
};

export const AsChild: Story = {
  name: 'AsChild',
  render: () => (
    <Box asChild className="bg-gray-2">
      <span>I&apos;m a span</span>
    </Box>
  ),
};

export const Polymorphic: Story = {
  render: () => <Box as="span">I&apos;m a span</Box>,
};

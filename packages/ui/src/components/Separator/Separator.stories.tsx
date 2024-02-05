import type { Meta, StoryObj } from '@storybook/react';

import { Box, Flex } from '../Box';
import { Text } from '../Text/Text';

import { Separator } from './Separator';

const meta: Meta<typeof Separator> = {
  title: 'UI/Separator',
  component: Separator,
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Usage: Story = {
  render: () => (
    <Box className="w-[400px]">
      <Text size="2">
        Tools for building high-quality, accessible UI.
        <Separator my="3" size="4" />
        <Flex align="center" gap="3">
          Themes
          <Separator orientation="vertical" />
          Primitives
          <Separator orientation="vertical" />
          Icons
          <Separator orientation="vertical" />
          Colors
        </Flex>
      </Text>
    </Box>
  ),
};

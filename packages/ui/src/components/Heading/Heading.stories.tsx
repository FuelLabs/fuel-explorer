import type { Meta, StoryObj } from '@storybook/react';
import { IconCalendar } from '@tabler/icons-react';

import { VStack } from '../Box';

import { Heading } from './Heading';

const meta: Meta<typeof Heading> = {
  title: 'Base/Heading',
  component: Heading,
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Usage: Story = {
  render: () => (
    <VStack>
      <Heading as="h1" size="1">
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading as="h2" size="2">
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading as="h3" size="3">
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading as="h3" size="4">
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading as="h4" size="5">
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading as="h5" size="6">
        The quick brown fox jumps over the lazy dog
      </Heading>
    </VStack>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Heading leftIcon={IconCalendar} size="3">
      Calendar
    </Heading>
  ),
};

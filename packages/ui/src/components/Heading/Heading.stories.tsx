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
      <Heading size="1" as="h1">
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading size="2" as="h2">
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading size="3" as="h3">
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading size="4" as="h3">
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading size="5" as="h4">
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading size="6" as="h5">
        The quick brown fox jumps over the lazy dog
      </Heading>
    </VStack>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Heading size="3" leftIcon={IconCalendar}>
      Calendar
    </Heading>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';

import { VStack } from '../Box';

import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'UI/Spinner',
  component: Spinner,
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Usage: Story = {
  render: (args) => (
    <VStack>
      <Spinner {...args} />
      <Spinner {...args} color="indigo" size={30} />
      <Spinner {...args} color="gray" size={50} />
    </VStack>
  ),
};

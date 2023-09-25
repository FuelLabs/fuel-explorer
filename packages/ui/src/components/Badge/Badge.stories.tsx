import type { Meta, StoryObj } from '@storybook/react';

import { HStack } from '../Box';
import { ButtonClose } from '../ButtonClose/ButtonClose';

import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Usage: Story = {
  render: () => (
    <HStack>
      <Badge color="orange">In progress</Badge>
      <Badge color="blue">In review</Badge>
      <Badge color="green">Complete</Badge>
    </HStack>
  ),
};

export const WithClose: Story = {
  render: () => (
    <Badge color="blue" radius="full" size="2">
      Selected <ButtonClose />
    </Badge>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { IconCalendarX } from '@tabler/icons-react';

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

export const Variants: Story = {
  render: () => (
    <HStack>
      <Badge variant="solid" color="blue">
        Solid
      </Badge>
      <Badge variant="ghost" color="blue">
        Ghost
      </Badge>
      <Badge variant="surface" color="blue">
        Surface
      </Badge>
      <Badge variant="outline" color="blue">
        Outline
      </Badge>
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

export const WithIcon: Story = {
  render: () => (
    <Badge color="blue" leftIcon={IconCalendarX} iconSize={14} size="2">
      2023-10-03
    </Badge>
  ),
};

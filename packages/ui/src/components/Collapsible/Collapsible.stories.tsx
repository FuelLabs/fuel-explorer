import type { Meta, StoryObj } from '@storybook/react';

import { VStack } from '../Box';

import { Collapsible } from './Collapsible';

const meta: Meta<typeof Collapsible> = {
  title: 'UI/Collapsible',
  component: Collapsible,
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Usage: Story = {
  render: () => (
    <Collapsible className="max-w-[450px]">
      <Collapsible.Header>Header</Collapsible.Header>
      <Collapsible.Content>
        <Collapsible.Title>Title</Collapsible.Title>
        <Collapsible.Body>Content</Collapsible.Body>
      </Collapsible.Content>
    </Collapsible>
  ),
};

export const Variants: Story = {
  render: () => (
    <VStack>
      <Collapsible defaultOpened className="max-w-[450px]" variant="ghost">
        <Collapsible.Header>Header</Collapsible.Header>
        <Collapsible.Content>
          <Collapsible.Title>Title</Collapsible.Title>
          <Collapsible.Body>Content</Collapsible.Body>
        </Collapsible.Content>
      </Collapsible>
      <Collapsible defaultOpened className="max-w-[450px]" variant="surface">
        <Collapsible.Header>Header</Collapsible.Header>
        <Collapsible.Content>
          <Collapsible.Title>Title</Collapsible.Title>
          <Collapsible.Body>Content</Collapsible.Body>
        </Collapsible.Content>
      </Collapsible>
    </VStack>
  ),
};

export const Polymorphic: Story = {
  render: () => (
    <Collapsible as={'div' as const} className="max-w-[450px]">
      <Collapsible.Header>Header</Collapsible.Header>
      <Collapsible.Content>
        <Collapsible.Title>Title</Collapsible.Title>
        <Collapsible.Body>Content</Collapsible.Body>
      </Collapsible.Content>
    </Collapsible>
  ),
};

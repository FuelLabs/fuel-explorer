import type { Meta, StoryObj } from '@storybook/react';
import { IconCheck } from '@tabler/icons-react';

import { List } from './List';

const meta: Meta<typeof List> = {
  title: 'Base/List',
  component: List,
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  render: (args) => (
    <List {...args}>
      <List.Item>First item</List.Item>
      <List.Item>Second item</List.Item>
      <List.Item>Third item</List.Item>
    </List>
  ),
};

export const Unordered: Story = {
  render: () => (
    <List.UL>
      <List.Item>First item</List.Item>
      <List.Item>Second item</List.Item>
      <List.Item>Third item</List.Item>
    </List.UL>
  ),
};

export const Ordered: Story = {
  render: () => (
    <List.OL>
      <List.Item>First item</List.Item>
      <List.Item>Second item</List.Item>
      <List.Item>Third item</List.Item>
    </List.OL>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <List icon={IconCheck} iconColor="text-brand">
      <List.Item>First item</List.Item>
      <List.Item>Second item</List.Item>
      <List.Item>Third item</List.Item>
    </List>
  ),
};

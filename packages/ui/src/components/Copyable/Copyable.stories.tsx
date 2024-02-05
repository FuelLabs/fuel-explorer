import type { Meta, StoryObj } from '@storybook/react';
import { IconClipboardCopy } from '@tabler/icons-react';

import { Copyable } from './Copyable';

const meta: Meta<typeof Copyable> = {
  title: 'Helpers/Copyable',
  component: Copyable,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Copyable>;

export const Usage: Story = {
  render: () => <Copyable value="You copied this text">Standard Icon</Copyable>,
};

export const CustomIcon: Story = {
  render: () => (
    <Copyable icon={IconClipboardCopy} value="Another text which you copied">
      Different Icon
    </Copyable>
  ),
};

export const Polymorphic: Story = {
  render: () => (
    <Copyable as="div" value="You copied this text">
      Standard Icon
    </Copyable>
  ),
};

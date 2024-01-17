import type { Meta, StoryObj } from '@storybook/react';
import { IconSettings } from '@tabler/icons-react';

import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'UI/IconButton',
  component: IconButton,
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Usage: Story = {
  render: () => <IconButton aria-label="Settings" icon={IconSettings} />,
};

export const Loading: Story = {
  render: () => (
    <IconButton isLoading aria-label="Settings" icon={IconSettings} />
  ),
};

export const Disabled: Story = {
  render: () => (
    <IconButton disabled aria-label="Settings" icon={IconSettings} />
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <IconButton aria-readonly aria-label="Settings" icon={IconSettings} />
  ),
};

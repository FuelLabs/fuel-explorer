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
  render: () => <IconButton icon={IconSettings} aria-label="Settings" />,
};

export const Loading: Story = {
  render: () => (
    <IconButton icon={IconSettings} aria-label="Settings" isLoading />
  ),
};

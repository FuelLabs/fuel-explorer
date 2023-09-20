import type { Meta, StoryObj } from '@storybook/react';

import { Text } from '../Text/Text';

import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Form/Switch',
  component: Switch,
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Usage: Story = {
  render: () => (
    <Text size="2">
      <label>
        <Switch mr="2" defaultChecked /> Sync settings{' '}
        <Text color="gray">(Default)</Text>
      </label>
    </Text>
  ),
};

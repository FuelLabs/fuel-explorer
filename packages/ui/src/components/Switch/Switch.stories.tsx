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
      <label className="flex flex-row items-center">
        <Switch defaultChecked mr="2" /> Sync settings{' '}
        <Text color="gray">(Default)</Text>
      </label>
    </Text>
  ),
};

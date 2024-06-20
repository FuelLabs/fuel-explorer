import type { Meta, StoryObj } from '@storybook/react';

import { Text } from '../Text/Text';

import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Form/Checkbox',
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Usage: Story = {
  render: () => (
    <Text size="2">
      <label className="flex flex-row items-center">
        <Checkbox defaultChecked mr="1" /> Agree to Terms and Conditions
      </label>
    </Text>
  ),
};

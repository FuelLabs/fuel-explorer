import type { Meta, StoryObj } from '@storybook/react';

import { InputPassword } from './InputPassword';

const meta: Meta<typeof InputPassword> = {
  title: 'Form/InputPassword',
  component: InputPassword,
};

export default meta;
type Story = StoryObj<typeof InputPassword>;

export const Usage: Story = {
  render: () => (
    <InputPassword className="w-[300px]" placeholder="Enter your password…" />
  ),
};

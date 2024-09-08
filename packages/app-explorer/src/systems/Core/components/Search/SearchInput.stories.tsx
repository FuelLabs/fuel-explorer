import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Core/SearchInput',
  component: SearchInput,
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    className: 'w-sm',
  },
};

export const Clearable: Story = {
  args: {
    className: 'w-sm',
    value: 'Some value',
    onSubmit: action('onSubmit'),
    autoFocus: true,
  },
};

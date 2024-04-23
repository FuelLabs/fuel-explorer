import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { AutoComplete, type AutoCompleteProps } from './AutoComplete';

const meta: Meta<typeof AutoComplete> = {
  title: 'Form/AutoComplete',
  component: AutoComplete,
  argTypes: {
    debounce: {
      control: 'number',
      defaultValue: 300,
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof AutoComplete>;

function AutoCompleteStory(args: Pick<AutoCompleteProps, 'debounce'>) {
  const [value, setValue] = useState<string>('');

  return (
    <AutoComplete
      {...args}
      suggestions={['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']}
      placeholder="Type a fruit name"
      value={value}
      onChange={(value) => setValue(value || '')}
    >
      <AutoComplete.Content />
    </AutoComplete>
  );
}

export const Usage: Story = {
  render: AutoCompleteStory,
};

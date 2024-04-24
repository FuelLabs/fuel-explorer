import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ComboBox, type ComboBoxProps } from './AutoComplete';

const meta: Meta<typeof ComboBox> = {
  title: 'Form/ComboBox',
  component: ComboBox,
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
type Story = StoryObj<typeof ComboBox>;

function ComboBoxStory(args: Pick<ComboBoxProps, 'debounce'>) {
  const [value, setValue] = useState<string>('');

  return (
    <ComboBox
      {...args}
      suggestions={['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']}
      placeholder="Type a fruit name"
      value={value}
      onChange={(value) => setValue(value || '')}
    >
      <ComboBox.Content />
    </ComboBox>
  );
}

export const Usage: Story = {
  render: ComboBoxStory,
};

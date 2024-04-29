import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import { ComboBox } from './ComboBox';
import type { ComboBoxProps } from './types';

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
  const [_value, setValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <ComboBox
      {...args}
      inputRef={inputRef}
      suggestions={['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']}
      onItemSelected={(value) => setValue(value || '')}
    >
      <ComboBox.Input>
        <ComboBox.InputField
          inputRef={inputRef}
          placeholder="Type a fruit name"
        />
      </ComboBox.Input>
      <ComboBox.Trigger />
      <ComboBox.Content />
    </ComboBox>
  );
}

export const Usage: Story = {
  render: ComboBoxStory,
};

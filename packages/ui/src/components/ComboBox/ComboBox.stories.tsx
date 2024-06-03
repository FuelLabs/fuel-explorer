import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import { ComboBox, type ComboBoxProps } from './ComboBox';

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
      <ComboBox.Input ref={inputRef} placeholder="Type a fruit name" />
      <ComboBox.Content />
    </ComboBox>
  );
}

export const Usage: Story = {
  render: ComboBoxStory,
};

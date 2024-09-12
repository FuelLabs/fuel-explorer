import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import { HStack } from '../Box';
import { Text } from '../Text';
import { ListBox } from './ListBox';

const meta: Meta<typeof ListBox> = {
  title: 'Form/ListBox',
  component: ListBox,
  argTypes: {
    filter: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ListBox>;

const options = [
  { value: 'allowance', label: 'Allowance', comission: '10%' },
  { value: 'validator', label: 'Validator', comission: '1%' },
  { value: 'convert', label: 'Convert', comission: '5%' },
  { value: 'delegation', label: 'Delegation', comission: '6%' },
  { value: 'redelegation', label: 'Redelegation', comission: '9%' },
  { value: 'undelegation', label: 'Undelegation', comission: '7%' },
  { value: 'withdraw', label: 'Withdraw', comission: '1%' },
];

export const Usage: Story = {
  render: ({ filter }) => {
    const [selected, setSelected] = useState<string>('');
    const [value, setValue] = useState<string>('');

    const filtered = useMemo(() => {
      return options.filter((option) => {
        return option.label.toLowerCase().includes(value.toLowerCase());
      });
    }, [value]);

    return (
      <ListBox
        filter={filter}
        options={filtered}
        getValue={(option) => option.value}
        render={(option) => (
          <ListBox.Item>
            <ListBox.ItemIcon />
            <HStack gap="2" justify="between" align="center" flexGrow="1">
              {option.label}
              <Text size="2" weight="medium" color="gray">
                Comission: {option.comission}
              </Text>
            </HStack>
          </ListBox.Item>
        )}
        onChange={(e) => setValue(e.target.value)}
        selected={selected}
        onSelect={setSelected}
      />
    );
  },
  args: {
    filter: true,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { IconSearch } from '@tabler/icons-react';

import { Box, VStack } from '../Box';
import { Icon } from '../Icon/Icon';

import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Form/Input',
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Usage: Story = {
  render: () => (
    <Box className="w-[300px]">
      <Input>
        <Input.Slot>
          <Icon className="text-icon" icon={IconSearch} size={16} />
        </Input.Slot>
        <Input.Field placeholder="Search the docs…" />
      </Input>
    </Box>
  ),
};

export const Sizes: Story = {
  render: () => (
    <VStack className="w-[350px]">
      <Input.Field placeholder="Search the docs…" size="1" />
      <Input.Field placeholder="Search the docs…" size="2" />
      <Input.Field placeholder="Search the docs…" size="3" />
    </VStack>
  ),
};

export const Numeric: Story = {
  render: () => (
    <Input>
      <Input.Number placeholder="0.00" />
    </Input>
  ),
};

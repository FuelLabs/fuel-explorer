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
          <Icon icon={IconSearch} size={16} className="text-icon" />
        </Input.Slot>
        <Input.Field placeholder="Search the docs…" />
      </Input>
    </Box>
  ),
};

export const Sizes: Story = {
  render: () => (
    <VStack className="w-[350px]">
      <Input.Field size="1" placeholder="Search the docs…" />
      <Input.Field size="2" placeholder="Search the docs…" />
      <Input.Field size="3" placeholder="Search the docs…" />
    </VStack>
  ),
};

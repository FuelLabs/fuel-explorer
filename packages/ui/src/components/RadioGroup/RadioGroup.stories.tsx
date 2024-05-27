import type { Meta, StoryObj } from '@storybook/react';

import { HStack, VStack } from '../Box';
import { Text } from '../Text/Text';

import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'Form/RadioGroup',
  component: RadioGroup,
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Usage: Story = {
  render: () => (
    <RadioGroup defaultValue="1">
      <VStack gap="2">
        <label>
          <HStack align="center">
            <RadioGroup.Item value="1" />
            <Text size="2">Default</Text>
          </HStack>
        </label>
        <label>
          <HStack align="center">
            <RadioGroup.Item value="2" />
            <Text size="2">Comfortable</Text>
          </HStack>
        </label>
        <label>
          <HStack align="center">
            <RadioGroup.Item value="3" />
            <Text size="2">Compact</Text>
          </HStack>
        </label>
      </VStack>
    </RadioGroup>
  ),
};

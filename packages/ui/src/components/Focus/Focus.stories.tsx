import type { Meta, StoryObj } from '@storybook/react';

import { HStack, VStack } from '../Box';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';

import { Focus } from './Focus';

const meta: Meta<typeof Focus> = {
  title: 'Helpers/Focus',
};

export default meta;
type Story = StoryObj<typeof Focus>;

export const Usage: Story = {
  render: () => (
    <VStack>
      <Focus.ArrowNavigator contain>
        <HStack gap="3">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </HStack>
      </Focus.ArrowNavigator>
      <Text>Try to navigate between buttons using arrow keys</Text>
    </VStack>
  ),
};

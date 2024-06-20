import type { Meta, StoryObj } from '@storybook/react';

import { HStack, VStack } from '../Box';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';

import { useState } from 'react';
import { Focus } from './Focus';

const meta: Meta<typeof Focus> = {
  title: 'Helpers/Focus',
};

export default meta;
type Story = StoryObj<typeof Focus>;

export const Usage: Story = {
  render: () => {
    const [focusedText, setFocusedText] = useState('');
    const [clickedText, setClickedText] = useState('');

    return (
      <VStack>
        <Focus.ArrowNavigator contain>
          <HStack gap="3">
            <Button
              onClick={() => setClickedText('First')}
              onFocus={() => setFocusedText('First')}
            >
              First
            </Button>
            <Button
              onClick={() => setClickedText('Second')}
              onFocus={() => setFocusedText('Second')}
            >
              Second
            </Button>
            <Button
              onClick={() => setClickedText('Third')}
              onFocus={() => setFocusedText('Third')}
            >
              Third
            </Button>
          </HStack>
        </Focus.ArrowNavigator>
        <Text>Try to navigate between buttons using arrow keys</Text>
        {!!focusedText && <Text>{focusedText} button focused</Text>}
        {!!clickedText && <Text>{clickedText} button clicked</Text>}
      </VStack>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '../Box';

import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'UI/Accordion',
  component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Usage: Story = {
  render: () => (
    <Box className="max-w-lg">
      <Accordion defaultValue="item-1" type="single">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>What&apos;s Fuel?</Accordion.Trigger>
          <Accordion.Content>
            The world&apos;s fastest modular execution layer.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>Is it really fast?</Accordion.Trigger>
          <Accordion.Content>Yes, it&apos;s blazingly fast.</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Box>
  ),
};

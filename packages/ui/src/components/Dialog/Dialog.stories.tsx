import type { Meta, StoryObj } from '@storybook/react';

import { HStack, VStack } from '../Box';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Text } from '../Text/Text';

import { Dialog } from './Dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Overlay/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Usage: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger>
        <Button>Edit profile</Button>
      </Dialog.Trigger>
      <Dialog.Content className="max-w-sm">
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description mb="4" size="2">
          Make changes to your profile.
        </Dialog.Description>
        <VStack>
          <label className="w-full">
            <Text as="div" mb="1" size="2" weight="bold">
              Name
            </Text>
            <Input
              defaultValue="Freja Johnsen"
              placeholder="Enter your full name"
            />
          </label>
          <label className="w-full">
            <Text as="div" mb="1" size="2" weight="bold">
              Email
            </Text>
            <Input
              defaultValue="freja@example.com"
              placeholder="Enter your email"
            />
          </label>
        </VStack>
        <HStack className="mt-4" justify="end">
          <Dialog.Close>
            <Button color="gray" variant="ghost">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </HStack>
      </Dialog.Content>
    </Dialog>
  ),
};

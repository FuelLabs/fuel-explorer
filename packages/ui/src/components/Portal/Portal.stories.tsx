import type { Meta, StoryObj } from '@storybook/react';

import { Box, HStack, VStack } from '../Box';
import { Button } from '../Button/Button';
import { Dialog } from '../Dialog/Dialog';
import { Input } from '../Input/Input';
import { Text } from '../Text/Text';

import { Portal } from './Portal';

const meta: Meta<typeof Portal> = {
  title: 'Portal',
  component: Portal,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Portal>;

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
      <Portal>
        <Box className="w-[200px] h-4 fixed top-0 left-0 z-50">
          <span> This should render on top of the dialog</span>
        </Box>
      </Portal>
      <Box className="w-[200px] h-4 fixed top-12 left-0 z-50">
        <span> This should render below the dialog </span>
      </Box>
    </Dialog>
  ),
};

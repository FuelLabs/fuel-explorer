import type { Meta, StoryObj } from '@storybook/react';

import { HStack } from '../Box';
import { Button } from '../Button/Button';

import { AlertDialog } from './AlertDialog';

const meta: Meta<typeof AlertDialog> = {
  title: 'Overlay/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

export const Usage: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialog.Trigger>
        <Button color="red">Revoke access</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content className="max-w-md">
        <AlertDialog.Title>Revoke access</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? This application will no longer be accessible and any
          existing sessions will be expired.
        </AlertDialog.Description>
        <HStack className="mt-4" justify="end">
          <AlertDialog.Cancel>
            <Button color="gray" variant="ghost">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red" variant="solid">
              Revoke access
            </Button>
          </AlertDialog.Action>
        </HStack>
      </AlertDialog.Content>
    </AlertDialog>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';

import { HStack } from '../Box';
import { Button } from '../Button/Button';

import { Toast } from './Toast';
import { toast, useToast } from './useToast';

const meta: Meta<typeof Toast> = {
  title: 'Overlay/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Usage: Story = {
  render: () => {
    const { toast } = useToast();
    return (
      <Button
        onClick={() => {
          toast({
            title: 'Scheduled: Catch up',
            description: 'Friday, February 10, 2023 at 5:57 PM',
          });
        }}
      >
        Show toast
      </Button>
    );
  },
};

const toastProps = {
  title: 'Some title',
  description: 'Some description',
  action: <Toast.Action altText="Try again">Action</Toast.Action>,
};

export const Variants: Story = {
  render: () => {
    return (
      <HStack>
        <Button color="gray" onClick={() => toast.base(toastProps.title)}>
          Base
        </Button>
        <Button color="blue" onClick={() => toast.info(toastProps.title)}>
          Info
        </Button>
        <Button color="yellow" onClick={() => toast.warning(toastProps.title)}>
          Warning
        </Button>
        <Button color="green" onClick={() => toast.success(toastProps.title)}>
          Success
        </Button>
        <Button color="red" onClick={() => toast.error(toastProps.title)}>
          Error
        </Button>
      </HStack>
    );
  },
};

export const WithAction: Story = {
  render: () => {
    return (
      <Button
        color="red"
        variant="ghost"
        onClick={() =>
          toast({
            ...toastProps,
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem with your request.',
            variant: 'error',
            width: 'auto',
            duration: 2000,
          })
        }
      >
        Remove Access
      </Button>
    );
  },
};

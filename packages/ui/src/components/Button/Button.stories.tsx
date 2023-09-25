import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { IconBookmark } from '@tabler/icons-react';

import { HStack } from '../Box';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Usage: Story = {
  render: () => <Button leftIcon={IconBookmark}>Bookmark</Button>,
};

export const Variant: Story = {
  render: () => (
    <HStack align="center" gap="5">
      <Button variant="solid">Edit profile</Button>
      <Button variant="ghost">Edit profile</Button>
      <Button variant="outline">Edit profile</Button>
      <Button variant="link">Edit profile</Button>
    </HStack>
  ),
};

export const Colors: Story = {
  render: () => (
    <HStack>
      <Button color="indigo" variant="ghost">
        Edit profile
      </Button>
      <Button color="cyan" variant="ghost">
        Edit profile
      </Button>
      <Button color="orange" variant="ghost">
        Edit profile
      </Button>
      <Button color="crimson" variant="ghost">
        Edit profile
      </Button>
    </HStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <HStack align="center">
      <Button leftIcon={IconBookmark} size="1">
        Edit profile
      </Button>
      <Button leftIcon={IconBookmark} size="2">
        Edit profile
      </Button>
      <Button leftIcon={IconBookmark} size="3">
        Edit profile
      </Button>
      <Button leftIcon={IconBookmark} size="4">
        Edit profile
      </Button>
    </HStack>
  ),
};

export const Loading: Story = {
  render: () => <Button isLoading>Click here</Button>,
};

export const onClick: Story = {
  render: () => <Button onClick={action('onClick')}>Click here</Button>,
};

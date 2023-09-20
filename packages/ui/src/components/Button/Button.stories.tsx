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
      <Button size="1" leftIcon={IconBookmark}>
        Edit profile
      </Button>
      <Button size="2" leftIcon={IconBookmark}>
        Edit profile
      </Button>
      <Button size="3" leftIcon={IconBookmark}>
        Edit profile
      </Button>
      <Button size="4" leftIcon={IconBookmark}>
        Edit profile
      </Button>
    </HStack>
  ),
};

export const Loading: Story = {
  render: () => <Button isLoading>Click here</Button>,
};

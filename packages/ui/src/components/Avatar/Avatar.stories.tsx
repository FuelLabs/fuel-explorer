import type { Meta, StoryObj } from '@storybook/react';

import { HStack } from '../Box';

import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
};

export default meta;
type Story = StoryObj<typeof Avatar>;

function getBaseAvatarComponent(props: any | undefined = {}) {
  return (
    <Avatar
      fallback="S"
      src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
      {...props}
    />
  );
}

export const Usage: Story = {
  render: () => (
    <HStack>
      {getBaseAvatarComponent()}
      {getBaseAvatarComponent({ src: undefined })}
    </HStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <HStack>
      {getBaseAvatarComponent({ size: '1' })}
      {getBaseAvatarComponent({ size: '2' })}
      {getBaseAvatarComponent({ size: '3' })}
      {getBaseAvatarComponent({ size: '4' })}
      {getBaseAvatarComponent({ size: '5' })}
      {getBaseAvatarComponent({ size: '6' })}
      {getBaseAvatarComponent({ size: '7' })}
      {getBaseAvatarComponent({ size: '8' })}
      {getBaseAvatarComponent({ size: '9' })}
    </HStack>
  ),
};

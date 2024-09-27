import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from '~/systems/Block/components/Hero';

const meta: Meta<typeof Hero> = {
  title: 'Home/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const Desktop: Story = {
  args: {},
};

export const Tablet: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
  },
};

export const Mobile: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
  },
};

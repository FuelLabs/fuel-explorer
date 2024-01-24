import type { Meta, StoryObj } from '@storybook/react';

import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Core/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

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

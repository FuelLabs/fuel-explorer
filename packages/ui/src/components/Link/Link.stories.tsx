import type { Meta, StoryObj } from '@storybook/react';

import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Base/Link',
  component: Link,
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Usage: Story = {
  render: () => <Link href="#">Link</Link>,
};

export const External: Story = {
  render: () => (
    <Link href="https://fuel.network" target="_blank">
      Visit our website
    </Link>
  ),
};

export const Polymorphic: Story = {
  render: () => (
    <Link asChild isExternal>
      <a href="https://fuel.network" target="_blank">
        Visit our website
      </a>
    </Link>
  ),
};

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

export const AsChild: Story = {
  render: () => (
    <Link asChild target="_blank">
      <a href="https://fuel.network">Visit our website</a>
    </Link>
  ),
};

export const Polymorphic: Story = {
  render: () => (
    <Link as="button" type="button" href="https://fuel.network" target="_blank">
      Visit our website
    </Link>
  ),
};

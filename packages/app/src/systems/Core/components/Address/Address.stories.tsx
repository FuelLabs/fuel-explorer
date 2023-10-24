import { mocks } from '@fuel-explorer/graphql';
import type { Meta, StoryObj } from '@storybook/react';

import { Address } from './Address';

const meta: Meta<typeof Address> = {
  title: 'Core/Address',
  component: Address,
};

export default meta;
type Story = StoryObj<typeof Address>;

const MOCK = mocks.anInputCoin({
  owner: '8fkjv8kwc0jzv1xcunxejkreq92zr4t1vlxzrtta',
});

export const Usage: Story = {
  render: () => <Address id={MOCK.owner} label="Id" />,
};

export const WithLink: Story = {
  render: () => (
    <Address
      id={MOCK.owner}
      label="Id"
      link={(id) => `/account/${id}`}
      linkLabel="View account"
    />
  ),
};

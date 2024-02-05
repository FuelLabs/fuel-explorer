import type { Meta, StoryObj } from '@storybook/react';

import { Address } from './Address';

const meta: Meta<typeof Address> = {
  title: 'Web3/Address',
  component: Address,
};

export default meta;
type Story = StoryObj<typeof Address>;

const ID = '0x9e91c247ddd6bd98c90658aa5f58c217b013b87ccd393ed339edc23b5aa424c6';

export const Usage: Story = {
  render: () => <Address value={ID} />,
};

export const WithPrefix: Story = {
  render: () => <Address value={ID} prefix="To:" />,
};

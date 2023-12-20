import type { Meta, StoryObj } from '@storybook/react';

import { TX_MOCK } from '../../../Transaction/__mocks__/tx';

import { TxCard } from './TxCard';

const meta: Meta<typeof TxCard> = {
  title: 'Transaction/TxCard',
  component: TxCard,
};

export default meta;
type Story = StoryObj<typeof TxCard>;

export const Usage: Story = {
  render: () => <TxCard transaction={TX_MOCK} />,
};

export const Loader: Story = {
  render: () => <TxCard isLoading transaction={TX_MOCK} />,
};

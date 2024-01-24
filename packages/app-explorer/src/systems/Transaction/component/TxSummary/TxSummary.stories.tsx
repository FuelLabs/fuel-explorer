import type { Meta, StoryObj } from '@storybook/react';

import { TX_MOCK } from '../../__mocks__/tx';

import { TxSummary } from './TxSummary';

const meta: Meta<typeof TxSummary> = {
  title: 'Transaction/TxSummary',
  component: TxSummary,
};

export default meta;
type Story = StoryObj<typeof TxSummary>;

export const Usage: Story = {
  render: () => (
    <TxSummary className="max-w-screen" transaction={TX_MOCK}>
      <TxSummary.Details />
      <TxSummary.Params />
    </TxSummary>
  ),
};

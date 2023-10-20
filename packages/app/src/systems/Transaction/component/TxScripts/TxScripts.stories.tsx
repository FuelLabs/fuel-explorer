import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_TX_CONTRACT_CALL_WITH_RECEIPTS } from '../../__mocks__/receipts';

import { TxScripts } from './TxScripts';

const meta: Meta<typeof TxScripts> = {
  title: 'Transaction/TxScript',
  component: TxScripts,
};

export default meta;
type Story = StoryObj<typeof TxScripts>;

export const Usage: Story = {
  render: () => (
    <TxScripts
      tx={MOCK_TX_CONTRACT_CALL_WITH_RECEIPTS}
      className="max-w-[500px]"
    />
  ),
};

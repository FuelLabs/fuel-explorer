import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_OPERATION_CONTRACT_CALL } from '../../__mocks__/abi';

import { TxScript } from './TxScript';

const meta: Meta<typeof TxScript> = {
  title: 'Transaction/TxScript',
  component: TxScript,
};

export default meta;
type Story = StoryObj<typeof TxScript>;

export const Usage: Story = {
  render: () => (
    <TxScript
      calls={MOCK_OPERATION_CONTRACT_CALL.calls!}
      className="max-w-[500px]"
    />
  ),
};

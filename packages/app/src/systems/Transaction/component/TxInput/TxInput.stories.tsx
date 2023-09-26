/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/react';

import { TX_MOCK } from '../../__mocks__/tx';

import { TxInput } from './TxInput';

const meta: Meta<typeof TxInput> = {
  title: 'Transaction/TxInput',
  component: TxInput,
};

export default meta;
type Story = StoryObj<typeof TxInput>;

export const Usage: Story = {
  render: () => (
    <TxInput className="w-[500px]" input={TX_MOCK.inputs?.[0] as any} />
  ),
};

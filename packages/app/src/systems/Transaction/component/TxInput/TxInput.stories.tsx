import type { Meta, StoryObj } from '@storybook/react';

import {
  GROUPED_INPUT_ASSET,
  GROUPED_INPUT_ASSET_UNKNOWN,
  GROUPED_INPUT_CONTRACT,
  GROUPED_INPUT_MESSAGE,
} from '../../__mocks__/tx';

import { TxInput } from './TxInput';

const meta: Meta<typeof TxInput> = {
  title: 'Transaction/TxInput',
  component: TxInput,
};

export default meta;
type Story = StoryObj<typeof TxInput>;

export const Asset: Story = {
  render: () => <TxInput className="w-[500px]" input={GROUPED_INPUT_ASSET} />,
};

export const AssetUnknown: Story = {
  render: () => (
    <TxInput className="w-[500px]" input={GROUPED_INPUT_ASSET_UNKNOWN} />
  ),
};

export const Contract: Story = {
  render: () => (
    <TxInput className="w-[500px]" input={GROUPED_INPUT_CONTRACT} />
  ),
};

export const Message: Story = {
  render: () => <TxInput className="w-[500px]" input={GROUPED_INPUT_MESSAGE} />,
};

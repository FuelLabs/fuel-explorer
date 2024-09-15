import { VStack } from '@fuels/ui';
import type { Meta, StoryObj } from '@storybook/react';

import {
  MOCKED_COIN,
  MOCKED_CONTRACT,
  MOCKED_MESSAGE,
} from '../../__mocks__/tx';

import { TxInput } from './TxInput';

const meta: Meta<typeof TxInput> = {
  title: 'Transaction/TxInput',
  component: TxInput,
};

export default meta;
type Story = StoryObj<typeof TxInput>;

function Wrapper({ children }: { children: React.ReactNode }) {
  return <VStack className="w-[600px]">{children}</VStack>;
}

export const Coin: Story = {
  render: () => (
    <Wrapper>
      <TxInput input={MOCKED_COIN} />
    </Wrapper>
  ),
};

export const Message: Story = {
  render: () => (
    <Wrapper>
      <TxInput input={MOCKED_MESSAGE} />
    </Wrapper>
  ),
};

export const Contract: Story = {
  render: () => (
    <Wrapper>
      <TxInput input={MOCKED_CONTRACT} />
    </Wrapper>
  ),
};

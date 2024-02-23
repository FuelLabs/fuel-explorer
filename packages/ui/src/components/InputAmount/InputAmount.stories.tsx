import type { Meta, StoryObj } from '@storybook/react';

import { Flex } from '../Box';
import { InputAmount } from './InputAmount';

const meta: Meta<typeof InputAmount> = {
  title: 'Form/InputAmount',
  component: InputAmount,
};

export default meta;
type Story = StoryObj<typeof InputAmount>;

export const Usage: Story = {
  render: () => (
    <InputAmount
      color="green"
      className="anything"
      balance={undefined}
      value={undefined}
      disabled={false}
      onChange={(balance) => console.log(balance)}
    >
      <Flex>
        <InputAmount.Field placeholder="0.00" />

        <InputAmount.Slot>
          <InputAmount.ButtonMaxBalance
            onClick={() => {
              alert('Max Balance has been clicked');
            }}
          />
          <InputAmount.CoinSelector
            asset={{
              name: 'ETH',
              imageUrl: 'https://cdn.fuel.network/assets/eth.svg',
              address: '',
            }}
            onClick={() => alert('Coin selector has been clicked')}
          />
        </InputAmount.Slot>
      </Flex>

      <InputAmount.Balance />
    </InputAmount>
  ),
};

export const OnlyField: Story = {
  render: () => (
    <InputAmount
      color="green"
      className="anything"
      balance={undefined}
      value={undefined}
      disabled={false}
      onChange={(balance) => console.log(balance)}
    >
      <InputAmount.Field placeholder="0.00" />
    </InputAmount>
  ),
};

export const WithoutBalance: Story = {
  render: () => (
    <InputAmount
      color="green"
      className="anything"
      balance={undefined}
      value={undefined}
      disabled={false}
      onChange={(balance) => console.log(balance)}
    >
      <Flex align="center">
        <InputAmount.Field placeholder="0.00" />

        <InputAmount.Slot pb="2">
          <InputAmount.ButtonMaxBalance
            onClick={() => {
              alert('Max Balance has been clicked');
            }}
          />
          <InputAmount.CoinSelector
            asset={{
              name: 'ETH',
              imageUrl: 'https://cdn.fuel.network/assets/eth.svg',
              address: '',
            }}
            onClick={() => alert('Coin selector has been clicked')}
          />
        </InputAmount.Slot>
      </Flex>
    </InputAmount>
  ),
};

export const OnlyBalance: Story = {
  render: () => (
    <InputAmount
      color="green"
      className="anything"
      balance={undefined}
      value={undefined}
      disabled={false}
      onChange={(balance) => console.log(balance)}
    >
      <InputAmount.Field placeholder="0.00" />
      <InputAmount.Balance />
    </InputAmount>
  ),
};

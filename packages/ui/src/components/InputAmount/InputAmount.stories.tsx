import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@radix-ui/themes';
import { Flex, HStack } from '../Box';
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
      balance={undefined}
      value={undefined}
      disabled={false}
      onChange={(balance) => console.log(balance)}
      className="flex flex-wrap flex-row flex max-w-[400px]"
      style={{
        height: 'auto',
        width: 'auto',
      }}
      placeholder="0.00"
    >
      <InputAmount.Slot side="right">
        <HStack className="justify-center">
          <InputAmount.ButtonMaxBalance
            className="w-full w-[100%]"
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
        </HStack>
      </InputAmount.Slot>
      <InputAmount.Balance className="order-2" side="right" />
    </InputAmount>
  ),
};

export const OnlyField: Story = {
  render: () => (
    <Box className="max-w-[400px]">
      <InputAmount
        color="green"
        className="anything"
        balance={undefined}
        value={undefined}
        disabled={false}
        onChange={(balance) => console.log(balance)}
        placeholder="0.00"
      />
    </Box>
  ),
};

export const WithoutBalance: Story = {
  render: () => (
    <Box className="max-w-[400px]">
      <InputAmount
        color="green"
        className="anything"
        balance={undefined}
        value={undefined}
        disabled={false}
        onChange={(balance) => console.log(balance)}
        placeholder="0.00"
      >
        <Flex>
          <InputAmount.Slot side="right">
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
    </Box>
  ),
};

export const OnlyBalance: Story = {
  render: () => (
    <Box className="max-w-[400px]">
      <InputAmount
        color="green"
        className="anything"
        balance={undefined}
        value={undefined}
        disabled={false}
        onChange={(balance) => console.log(balance)}
        placeholder="0.00"
      >
        <Flex direction="column">
          <InputAmount.Balance />
        </Flex>
      </InputAmount>
    </Box>
  ),
};

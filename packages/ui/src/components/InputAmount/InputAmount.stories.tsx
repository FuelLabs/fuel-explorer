import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@radix-ui/themes';
import { InputAmount } from './InputAmount';

const meta: Meta<typeof InputAmount> = {
  title: 'Form/InputAmount',
  component: InputAmount,
};

export default meta;
type Story = StoryObj<typeof InputAmount>;

export const Usage: Story = {
  render: () => (
    <InputAmount balance={undefined}>
      <InputAmount.Label>Choose amount to delegate</InputAmount.Label>
      <InputAmount.Field
        color="green"
        value={undefined}
        disabled={false}
        onChange={(balance) => console.log(balance)}
        className="max-w-[400px]"
        placeholder="0.00"
      >
        <InputAmount.Slot className="flex flex-row flex-1 basis-1/2 justify-end">
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
      </InputAmount.Field>
      <InputAmount.Balance />
    </InputAmount>
  ),
};

export const OnlyField: Story = {
  render: () => (
    <Box className="max-w-[400px]">
      <InputAmount balance={undefined}>
        <InputAmount.Field
          color="green"
          value={undefined}
          disabled={false}
          onChange={(balance) => console.log(balance)}
          placeholder="0.00"
        />
      </InputAmount>
    </Box>
  ),
};

export const WithoutBalance: Story = {
  render: () => (
    <Box className="max-w-[400px]">
      <InputAmount balance={undefined}>
        <InputAmount.Field
          color="green"
          value={undefined}
          disabled={false}
          onChange={(balance) => console.log(balance)}
          placeholder="0.00"
        >
          <InputAmount.Slot className="flex flex-row flex-1 basis-1/2 justify-end">
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
        </InputAmount.Field>
      </InputAmount>
    </Box>
  ),
};

export const OnlyBalance: Story = {
  render: () => (
    <Box className="max-w-[400px]">
      <InputAmount balance={undefined}>
        <InputAmount.Field
          color="green"
          className="items-center"
          value={undefined}
          disabled={false}
          onChange={(balance) => console.log(balance)}
          placeholder="0.00"
        />
        <InputAmount.Balance />
      </InputAmount>
    </Box>
  ),
};

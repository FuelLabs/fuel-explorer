import assetList from '@fuels/assets';
import type { Meta, StoryObj } from '@storybook/react';
import { IconCurrencyEthereum } from '@tabler/icons-react';

import { HStack, VStack } from '../Box';
import { Icon } from '../Icon/Icon';

import { Asset } from './Asset';

const meta: Meta<typeof Asset> = {
  title: 'Web3/Asset',
  component: Asset,
};

export default meta;
type Story = StoryObj<typeof Asset>;

const DEFAULT_ARGS = {
  asset: assetList[0],
  amount: '1000000000',
};

export const Usage: Story = {
  render: (args) => (
    <Asset {...args} {...DEFAULT_ARGS}>
      <Asset.Icon />
      <Asset.Name />
      <HStack className="ml-4">
        <Asset.Amount />
        <Asset.Symbol />
      </HStack>
    </Asset>
  ),
};

export const IconName: Story = {
  name: 'Icon + Name',
  render: (args) => (
    <Asset {...args} {...DEFAULT_ARGS}>
      <Asset.Icon />
      <Asset.Name />
    </Asset>
  ),
};

export const CustomIcon: Story = {
  render: (args) => (
    <Asset {...args} {...DEFAULT_ARGS}>
      <Asset.Icon icon={<Icon icon={IconCurrencyEthereum} />} />
      <Asset.Name />
    </Asset>
  ),
};

const NO_ICON_ARGS = {
  asset: {
    ...assetList[0],
    icon: '',
  },
};

export const NoIcon: Story = {
  render: (args) => (
    <Asset {...args} {...DEFAULT_ARGS} {...NO_ICON_ARGS}>
      <Asset.Icon />
      <Asset.Name />
    </Asset>
  ),
};

export const AmountSymbol: Story = {
  name: 'Amount + Symbol',
  render: (args) => (
    <Asset {...args} {...DEFAULT_ARGS}>
      <Asset.Amount />
      <Asset.Symbol />
    </Asset>
  ),
};

const AMOUNT_ARGS = {
  amount: '1000000001',
  precision: 9,
};
export const AmountExamples: Story = {
  render: (args) => (
    <HStack gap="8">
      <Asset {...args} {...AMOUNT_ARGS}>
        <Asset.Amount />
        <Asset.Symbol />
      </Asset>
      <Asset {...args} {...AMOUNT_ARGS} negative>
        <Asset.Amount />
        <Asset.Symbol />
      </Asset>
    </HStack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <VStack gap="4">
      <Asset {...args} {...DEFAULT_ARGS} iconSize="xs">
        <Asset.Icon />
        <Asset.Name />
        <HStack className="ml-4">
          <Asset.Amount />
          <Asset.Symbol />
        </HStack>
      </Asset>
      <Asset {...args} {...DEFAULT_ARGS} iconSize="sm">
        <Asset.Icon />
        <Asset.Name />
        <HStack className="ml-4">
          <Asset.Amount />
          <Asset.Symbol />
        </HStack>
      </Asset>
      <Asset {...args} {...DEFAULT_ARGS} iconSize="md">
        <Asset.Icon />
        <Asset.Name />
        <HStack className="ml-4">
          <Asset.Amount />
          <Asset.Symbol />
        </HStack>
      </Asset>
      <Asset {...args} {...DEFAULT_ARGS} iconSize="lg">
        <Asset.Icon />
        <Asset.Name />
        <HStack className="ml-4">
          <Asset.Amount />
          <Asset.Symbol />
        </HStack>
      </Asset>
      <Asset {...args} {...DEFAULT_ARGS} iconSize={60}>
        <Asset.Icon />
        <Asset.Name />
        <HStack className="ml-4">
          <Asset.Amount />
          <Asset.Symbol />
        </HStack>
      </Asset>
    </VStack>
  ),
};

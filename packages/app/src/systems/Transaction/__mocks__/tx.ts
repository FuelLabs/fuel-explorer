/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from '@faker-js/faker';
import { GroupInputType, mocks } from '@fuel-explorer/graphql';
import { bn } from '@fuel-ts/math';
import { assets } from '@fuels/assets';
import { dayjs } from '~/systems/Core/utils/dayjs';

const date = dayjs().subtract(1, 'day');
const status = mocks.aSuccessStatus({
  __typename: 'SuccessStatus',
  block: mocks.aBlock({
    transactions: [],
  }),
});

const genInput = (typename: any) =>
  mocks.anInputCoin({
    __typename: typename,
    amount: bn(1),
    utxoId: faker.string.uuid(),
  });

export const GROUPED_INPUT_ASSET = mocks.aGroupedInput({
  __typename: 'GroupedInput',
  type: GroupInputType.InputCoin,
  inputs: [genInput('InputCoin'), genInput('InputCoin'), genInput('InputCoin')],
  assetId: assets[0].assetId,
  totalAmount: bn(3),
  owner: `0x${faker.string.alpha(32)}`,
});

export const GROUPED_INPUT_ASSET_UNKNOWN = mocks.aGroupedInput({
  __typename: 'GroupedInput',
  type: GroupInputType.InputCoin,
  inputs: [genInput('InputCoin'), genInput('InputCoin'), genInput('InputCoin')],
  owner: `0x${faker.string.alpha(32)}`,
  assetId: `0x${faker.string.alpha(32)}`,
  totalAmount: bn(3),
});

export const GROUPED_INPUT_CONTRACT = mocks.aGroupedInput({
  __typename: 'GroupedInput',
  type: GroupInputType.InputContract,
  inputs: [
    genInput('InputContract'),
    genInput('InputContract'),
    genInput('InputContract'),
  ],
  contractId: assets[0].assetId,
  totalAmount: bn(3),
});

export const GROUPED_INPUT_MESSAGE = mocks.aGroupedInput({
  __typename: 'GroupedInput',
  type: GroupInputType.InputMessage,
  sender: `0x${faker.string.alpha(40)}`,
  recipient: `0x${faker.string.alpha(40)}`,
  data: `0x${faker.string.alpha(160)}`,
});

export const TX_MOCK = mocks.aTransaction({
  id: '0x78d13f111bf301324f34f2a7eaffc546d39598d156af38e7c4ef9fe61ea2c46a',
  time: {
    __typename: 'ParsedTime',
    fromNow: date.fromNow(),
    full: dayjs().format('DD MMM YYYY - HH:mm:ss A'),
  },
  totalAccounts: 2,
  totalAssets: 3,
  totalOperations: 4,
  gasUsed: bn(1),
  status,
  groupedInputs: [
    GROUPED_INPUT_ASSET,
    GROUPED_INPUT_ASSET_UNKNOWN,
    GROUPED_INPUT_ASSET,
    GROUPED_INPUT_MESSAGE,
  ],
});

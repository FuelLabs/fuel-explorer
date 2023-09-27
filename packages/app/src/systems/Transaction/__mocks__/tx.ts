/* eslint-disable @typescript-eslint/no-explicit-any */
import { GroupInputType, mocks } from '@fuel-explorer/graphql';
import { assets } from '@fuels/assets';
import { dayjs } from '~/systems/Core/utils/dayjs';

const date = dayjs().subtract(1, 'day');
const status = mocks.aSuccessStatus({
  __typename: 'SuccessStatus',
  block: mocks.aBlock({
    transactions: [],
  }),
});

function input(typename: any) {
  return mocks.anInputCoin({ __typename: typename });
}

export const GROUPED_INPUT_ASSET = mocks.aGroupedInput({
  type: GroupInputType.InputCoin,
  inputs: [input('InputCoin'), input('InputCoin'), input('InputCoin')],
  assetId: assets[0].assetId,
});

export const GROUPED_INPUT_ASSET_UNKNOWN = mocks.aGroupedInput({
  type: GroupInputType.InputCoin,
  inputs: [input('InputCoin'), input('InputCoin'), input('InputCoin')],
});

export const GROUPED_INPUT_CONTRACT = mocks.aGroupedInput({
  type: GroupInputType.InputContract,
  inputs: [
    input('InputContract'),
    input('InputContract'),
    input('InputContract'),
  ],
});

export const GROUPED_INPUT_MESSAGE = mocks.aGroupedInput({
  __typename: 'GroupedInput',
  type: GroupInputType.InputMessage,
});

export const TX_MOCK = mocks.aTransaction({
  time: {
    __typename: 'ParsedTime',
    fromNow: date.fromNow(),
    full: dayjs().format('DD MMM YYYY - HH:mm:ss A'),
  },
  totalAccounts: 2,
  totalAssets: 3,
  totalOperations: 4,
  status,
  groupedInputs: [
    GROUPED_INPUT_ASSET,
    GROUPED_INPUT_ASSET_UNKNOWN,
    GROUPED_INPUT_ASSET,
    GROUPED_INPUT_MESSAGE,
  ],
});

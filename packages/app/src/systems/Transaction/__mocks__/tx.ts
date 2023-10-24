/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GroupedInputType,
  GroupedOutputType,
  mocks,
} from '@fuel-explorer/graphql';
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
  type: GroupedInputType.InputCoin,
  assetId: '0x0000000000000000000000000000000000000000',
  inputs: [input('InputCoin'), input('InputCoin'), input('InputCoin')],
});

export const GROUPED_INPUT_ASSET_UNKNOWN = mocks.aGroupedInput({
  type: GroupedInputType.InputCoin,
  inputs: [input('InputCoin'), input('InputCoin'), input('InputCoin')],
});

export const GROUPED_INPUT_CONTRACT = mocks.aGroupedInput({
  type: GroupedInputType.InputContract,
});

export const GROUPED_INPUT_MESSAGE = mocks.aGroupedInput({
  type: GroupedInputType.InputMessage,
});

function output(typename: any) {
  return mocks.aCoinOutput({ __typename: typename });
}

export const GROUPED_OUTPUT_ASSET = mocks.aGroupedOutput({
  type: GroupedOutputType.CoinOutput,
  outputs: [output('OutputCoin'), output('OutputCoin'), output('OutputCoin')],
  assetId: '0x0000000000000000000000000000000000000000',
});

export const GROUPED_OUTPUT_ASSET_UNKNOWN = mocks.aGroupedOutput({
  type: GroupedOutputType.CoinOutput,
  outputs: [output('outputCoin'), output('outputCoin'), output('outputCoin')],
});

export const GROUPED_OUTPUT_VARIABLE_OUTPUT = mocks.aGroupedOutput({
  type: GroupedOutputType.VariableOutput,
  outputs: [output('outputCoin'), output('outputCoin'), output('outputCoin')],
  assetId: '0x0000000000000000000000000000000000000000',
});

export const GROUPED_OUTPUT_VARIABLE_OUTPUT_UNKNOWN = mocks.aGroupedOutput({
  type: GroupedOutputType.VariableOutput,
  outputs: [output('outputCoin'), output('outputCoin'), output('outputCoin')],
});

export const GROUPED_OUTPUT_CHANGE_OUTPUT = mocks.aGroupedOutput({
  type: GroupedOutputType.ChangeOutput,
  outputs: [output('outputCoin'), output('outputCoin'), output('outputCoin')],
  assetId: '0x0000000000000000000000000000000000000000',
});

export const GROUPED_OUTPUT_CHANGE_OUTPUT_UNKNOWN = mocks.aGroupedOutput({
  type: GroupedOutputType.ChangeOutput,
  outputs: [output('outputCoin'), output('outputCoin'), output('outputCoin')],
});

export const GROUPED_OUTPUT_CONTRACT_OUTPUT = mocks.aGroupedOutput({
  type: GroupedOutputType.ContractOutput,
});

export const GROUPED_OUTPUT_CONTRACT_CREATED = mocks.aGroupedOutput({
  type: GroupedOutputType.ContractCreated,
});

export const GROUPED_OUTPUT_MESSAGE = mocks.aGroupedOutput({
  type: GroupedOutputType.MessageOutput,
});

export const TX_MOCK = mocks.aTransaction({
  title: 'ContractCall',
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
  groupedOutputs: [
    GROUPED_OUTPUT_ASSET,
    GROUPED_OUTPUT_ASSET_UNKNOWN,
    GROUPED_OUTPUT_CONTRACT_OUTPUT,
    GROUPED_OUTPUT_CONTRACT_CREATED,
    GROUPED_OUTPUT_MESSAGE,
  ],
});

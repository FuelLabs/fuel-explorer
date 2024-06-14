import {
  type GQLCoinOutput,
  type GQLInputCoin,
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

function input(typename: GQLInputCoin['__typename']) {
  return mocks.anInputCoin({ __typename: typename });
}

const ADDRS = {
  to: '0xf65d6448a273b531ee942c133bb91a6f904c7d7f3104cdaf6b9f7f50d3518871',
  owner: '0xf65d6448a273b531ee942c133bb91a6f904c7d7f3104cdaf6b9f7f50d3518871',
  sender: 'fuel1ydcrf80f4vjdzamxfnqw9gsvs4weh7n5sz7dv90qyegqmupkfhzq9ny4js',
  recipient: 'fuel1ydcrf80f4vjdzamxfnqw9gsvs4weh7n5sz7dv90qyegqmupkfhzq9ny4js',
  contractId: 'fuel1f347fmtxk7pl2hjy5mfk9y9889c2v946xvjkvdk0zkk4ehkj9rvs8a3c9m',
};

export const GROUPED_INPUT_ASSET = mocks.aGroupedInputCoin({
  ...ADDRS,
  assetId: '0x0000000000000000000000000000000000000000',
  inputs: [input('InputCoin'), input('InputCoin'), input('InputCoin')],
});

export const GROUPED_INPUT_ASSET_UNKNOWN = mocks.aGroupedInputCoin({
  ...ADDRS,
  inputs: [input('InputCoin'), input('InputCoin'), input('InputCoin')],
});

export const GROUPED_INPUT_MESSAGE = mocks.aGroupedInputMessage({
  ...ADDRS,
});

function output(typename: GQLCoinOutput['__typename']) {
  return mocks.aCoinOutput({ __typename: typename });
}

export const GROUPED_OUTPUT_ASSET = mocks.aGroupedOutputCoin({
  ...ADDRS,
  outputs: [output('CoinOutput'), output('CoinOutput'), output('CoinOutput')],
  assetId: '0x0000000000000000000000000000000000000000',
});

export const GROUPED_OUTPUT_ASSET_UNKNOWN = mocks.aGroupedOutputCoin({
  ...ADDRS,
  outputs: [output('CoinOutput'), output('CoinOutput'), output('CoinOutput')],
});
export const GROUPED_OUTPUT_CHANGE_OUTPUT = mocks.aGroupedOutputChanged({
  ...ADDRS,
  outputs: [output('CoinOutput'), output('CoinOutput'), output('CoinOutput')],
  assetId: '0x0000000000000000000000000000000000000000',
});

export const GROUPED_OUTPUT_CHANGE_OUTPUT_UNKNOWN = mocks.aGroupedOutputCoin({
  ...ADDRS,
  outputs: [output('CoinOutput'), output('CoinOutput'), output('CoinOutput')],
});

export const GROUPED_OUTPUT_CONTRACT_CREATED =
  mocks.aGroupedOutputContractCreated({
    ...ADDRS,
  });

export const TX_MOCK = mocks.aTransaction({
  title: 'ContractCall',
  time: {
    __typename: 'ParsedTime',
    fromNow: date.fromNow(),
    full: dayjs().format('DD MMM YYYY - HH:mm:ss A'),
  },
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
    GROUPED_OUTPUT_CONTRACT_CREATED,
  ],
});

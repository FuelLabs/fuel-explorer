import { GroupedInputType, mocks } from '@fuel-explorer/graphql';
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

const ADDRS = {
  to: '0xf65d6448a273b531ee942c133bb91a6f904c7d7f3104cdaf6b9f7f50d3518871',
  owner: '0xf65d6448a273b531ee942c133bb91a6f904c7d7f3104cdaf6b9f7f50d3518871',
  sender: '0x2370349de9ab24d177664cc0e2a20c855d9bfa7480bcd615e026500df0364dc4',
  recipient:
    '0x2370349de9ab24d177664cc0e2a20c855d9bfa7480bcd615e026500df0364dc4',
  contractId:
    '0x4c6be4ed66b783f55e44a6d36290a73970a616ba33256636cf15ad5cded228d9',
};

export const GROUPED_INPUT_ASSET = mocks.aGroupedInput({
  ...ADDRS,
  type: GroupedInputType.InputCoin,
  assetId: '0x0000000000000000000000000000000000000000',
  inputs: [input('InputCoin'), input('InputCoin'), input('InputCoin')],
});

export const GROUPED_INPUT_ASSET_UNKNOWN = mocks.aGroupedInput({
  ...ADDRS,
  type: GroupedInputType.InputCoin,
  inputs: [input('InputCoin'), input('InputCoin'), input('InputCoin')],
});

export const GROUPED_INPUT_MESSAGE = mocks.aGroupedInput({
  ...ADDRS,
  type: GroupedInputType.InputMessage,
});

export const OUTPUT_ASSET = mocks.aCoinOutput({
  to: ADDRS.to,
  assetId: '0x0000000000000000000000000000000000000000',
});

export const OUTPUT_ASSET_UNKNOWN = mocks.aCoinOutput({
  to: ADDRS.to,
});

export const OUTPUT_CONTRACT_CREATED = mocks.aContractCreated({
  contract: ADDRS.contractId,
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
  groupedOutputs: [],
  outputs: [OUTPUT_ASSET, OUTPUT_ASSET_UNKNOWN, OUTPUT_CONTRACT_CREATED],
});

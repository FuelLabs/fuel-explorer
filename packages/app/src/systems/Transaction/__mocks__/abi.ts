import type { Operation } from 'fuels';
import { AddressType, BaseAssetId, OperationName, bn } from 'fuels';

export const AbiContractId =
  '0xd58568036bb3c01142d3149f238bcf2d75478c01fa97dfc1b8caee0f808651ff';

export const FlatAbi = {
  types: [
    {
      typeId: 0,
      type: '()',
      components: [],
      typeParameters: null,
    },
    {
      typeId: 1,
      type: 'b256',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 2,
      type: 'struct Address',
      components: [
        {
          name: 'value',
          type: 1,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 3,
      type: 'u64',
      components: null,
      typeParameters: null,
    },
  ],
  functions: [
    {
      inputs: [
        {
          name: 'amount',
          type: 3,
          typeArguments: null,
        },
        {
          name: 'address',
          type: 2,
          typeArguments: null,
        },
        {
          name: 'amount2',
          type: 3,
          typeArguments: null,
        },
      ],
      name: 'mint_to_address',
      output: {
        name: '',
        type: 0,
        typeArguments: null,
      },
      attributes: [
        {
          name: 'storage',
          arguments: ['read', 'write'],
        },
      ],
    },
  ],
  loggedTypes: [],
  messagesTypes: [],
  configurables: [],
};

export const MOCK_TX_RECIPIENT = {
  account: {
    address: 'fuel1glqzc3xu3xzxvd6slyclqepxx0tspgz5nccnrf2rjzserz87r4qqtekuj7',
    type: AddressType.account,
  },

  contract: {
    address: 'fuel1yal7nrhm4lpwuzjn8eq3qjlsk9366dwpsrpd5ns5q049g30kyp7qcey6wk',
    type: AddressType.contract,
  },
};

export const MOCK_OPERATION_CONTRACT_CALL: Operation = {
  name: OperationName.contractCall,
  from: MOCK_TX_RECIPIENT.account,
  to: MOCK_TX_RECIPIENT.contract,
  assetsSent: [
    {
      amount: bn.parseUnits('0.10001'),
      assetId: BaseAssetId,
    },
  ],
  calls: [
    {
      functionName: 'mint_to_address',
      functionSignature: 'mint_to_address(u64,s(b256),u64)',
      argumentsProvided: {
        address: {
          value:
            '0xa5a77a7d97c6708b08de873528ae6879ef5e9900fbc2e3f3cb74e28917bf7038',
        },
        amount: '0x64',
        amount2: '0x64',
      },
      amount: bn('0x5f5e100'),
      assetId:
        '0x0000000000000000000000000000000000000000000000000000000000000000',
    },
  ],
};

import type {
  GQLBlock,
  GQLTransaction,
} from '~/graphql/generated/sdk-provider';

export const fakeBlocks = [
  {
    _id: 4709913,
    blockHash: 'hash5',
    timestamp: new Date('2024-07-02T09:56:00Z'),
    data: {
      id: 'hash5',
      header: {
        height: '4709913',
      },
      transactions: [] as GQLTransaction[],
    } as GQLBlock,
    totalGasUsed: '180',
    producer: 'producer',
  },
  {
    _id: 4709914,
    blockHash: 'hash4',
    timestamp: new Date('2024-07-02T09:57:00Z'),
    data: {
      id: 'hash4',
      header: {
        height: '4709914',
      },
      transactions: [] as GQLTransaction[],
    } as GQLBlock,
    totalGasUsed: '120',
    producer: 'producer',
  },
  {
    _id: 4709915,
    blockHash: 'hash3',
    timestamp: new Date('2024-07-02T09:58:00Z'),
    data: {
      id: 'hash3',
      header: {
        height: '4709915',
      },
      transactions: [] as GQLTransaction[],
    } as GQLBlock,
    totalGasUsed: '200',
    producer: 'producer',
  },
  {
    _id: 4709916,
    blockHash: 'hash2',
    timestamp: new Date('2024-07-02T09:59:00Z'),
    data: {
      id: 'hash2',
      header: {
        height: '4709916',
      },
      transactions: [] as GQLTransaction[],
    } as GQLBlock,
    totalGasUsed: '150',
    producer: 'producer',
  },
  {
    _id: 4709917,
    blockHash: 'hash1',
    timestamp: new Date('2024-07-02T10:00:00Z'),
    data: {
      id: 'hash1',
      header: {
        height: '4709917',
      },
      transactions: [] as GQLTransaction[],
    } as GQLBlock,
    totalGasUsed: '100',
    producer: 'producer',
  },
];

export const fakeTransactions = [
  {
    _id: '00000000000000000000000004709913-0000000000000001',
    txHash: 'txhash7',
    accountIndex: 'account3',
    blockId: 4709913,
    data: {} as GQLTransaction,
  },
  {
    _id: '00000000000000000000000004709913-0000000000000002',
    txHash: 'txhash8',
    accountIndex: 'account2',
    blockId: 4709913,
    data: {} as GQLTransaction,
  },
  {
    _id: '00000000000000000000000004709913-0000000000000003',
    txHash: 'txhash9',
    accountIndex: 'account1',
    blockId: 4709913,
    data: {} as GQLTransaction,
  },
  {
    _id: '00000000000000000000000004709914-0000000000000001',
    txHash: 'txhash6',
    accountIndex: 'account1',
    blockId: 4709914,
    data: {} as GQLTransaction,
  },
  {
    _id: '00000000000000000000000004709914-0000000000000002',
    txHash: 'txhash10',
    accountIndex: 'account3',
    blockId: 4709914,
    data: {} as GQLTransaction,
  },
  {
    _id: '00000000000000000000000004709915-0000000000000001',
    txHash: 'txhash4',
    accountIndex: 'account3',
    blockId: 4709915,
    data: {} as GQLTransaction,
  },
  {
    _id: '00000000000000000000000004709915-0000000000000002',
    txHash: 'txhash5',
    accountIndex: 'account2',
    blockId: 4709915,
    data: {} as GQLTransaction,
  },
  {
    _id: '00000000000000000000000004709915-0000000000000003',
    txHash: 'txhash11',
    accountIndex: 'account1',
    blockId: 4709915,
    data: {} as GQLTransaction,
  },
  {
    _id: '00000000000000000000000004709916-0000000000000001',
    txHash: 'txhash3',
    accountIndex: 'account1',
    blockId: 4709916,
    data: {} as GQLTransaction,
  },
  {
    _id: '00000000000000000000000004709916-0000000000000002',
    txHash: 'txhash12',
    accountIndex: 'account3',
    blockId: 4709916,
    data: {} as GQLTransaction,
  },
  {
    _id: '00000000000000000000000004709917-0000000000000001',
    txHash: 'txhash1',
    accountIndex: 'account1',
    blockId: 4709917,
    data: {} as GQLTransaction,
  },
  {
    _id: '00000000000000000000000004709917-0000000000000002',
    txHash: 'txhash2',
    accountIndex: 'account2',
    blockId: 4709917,
    data: {} as GQLTransaction,
  },
  {
    _id: '00000000000000000000000004709917-0000000000000003',
    txHash: 'txhash13',
    accountIndex: 'account3',
    blockId: 4709917,
    data: {} as GQLTransaction,
  },
];

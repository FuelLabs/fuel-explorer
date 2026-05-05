import { GraphQLClient } from 'graphql-request';
import { getSdk } from '~/graphql/generated/sdk-provider';

const FUEL_PROVIDER = 'https://mainnet.fuel.network/v1/graphql';

function collectKeys(obj: any, prefix = ''): Set<string> {
  const keys = new Set<string>();
  if (obj === null || obj === undefined || typeof obj !== 'object') return keys;
  if (Array.isArray(obj)) {
    for (const item of obj) {
      for (const k of collectKeys(item, prefix)) keys.add(k);
    }
    return keys;
  }
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    keys.add(path);
    for (const k of collectKeys(value, path)) keys.add(k);
  }
  return keys;
}

describe('Syncer data completeness', () => {
  const gqlClient = new GraphQLClient(FUEL_PROVIDER);
  const sdk = getSdk(gqlClient);

  it('syncer stores all fields the frontend expects from blocks.data JSONB', async () => {
    const result = await sdk.blocks({ last: 1 });
    const block = result.data.blocks.nodes[0];

    const keys = collectKeys(block);

    const requiredFields = [
      'height',
      'id',
      'header.height',
      'header.applicationHash',
      'header.daHeight',
      'header.time',
      'header.transactionsCount',
      'consensus.__typename',
    ];

    const requiredTxFields = [
      'id',
      'rawPayload',
      'scriptData',
      'inputs',
      'outputs',
      'status.__typename',
    ];

    const missingBlock: string[] = [];
    for (const field of requiredFields) {
      if (!keys.has(field)) missingBlock.push(field);
    }

    if (block.transactions?.length > 0) {
      const txKeys = collectKeys(block.transactions[0]);
      const missingTx: string[] = [];
      for (const field of requiredTxFields) {
        if (!txKeys.has(field)) missingTx.push(field);
      }
      if (missingTx.length > 0) {
        console.log('Missing transaction fields:', missingTx);
      }
      expect(missingTx).toEqual([]);
    }

    if (missingBlock.length > 0) {
      console.log('Missing block fields:', missingBlock);
    }
    expect(missingBlock).toEqual([]);
  }, 30000);

  it('SDK blocks query returns InputCoin.predicateData (non-null in schema)', async () => {
    const result = await sdk.blocks({ last: 5 });
    for (const block of result.data.blocks.nodes) {
      for (const tx of block.transactions) {
        if (!tx.inputs) continue;
        for (const input of tx.inputs) {
          if (input.__typename === 'InputCoin') {
            expect(input).toHaveProperty('predicateData');
            expect(input).toHaveProperty('predicateGasUsed');
          }
        }
      }
    }
  }, 30000);
});

import { TextDecoder, TextEncoder } from 'node:util';
import { deserialize, serialize } from 'node:v8';
import type { JsonAbi } from 'fuels';
import cancelTx from './__fixtures__/o2-cancel-tx.json';
import fillTx from './__fixtures__/o2-fill-tx.json';
import orderBookAbi from './__fixtures__/o2-order-book-abi.json';
import tradeAccountAbi from './__fixtures__/o2-trade-account-abi.json';
import type * as Decoder from './abiDecoder';
import type { AbiRegistry, DecodedOperationReceipt } from './abiDecoder';
import { buildAbiIndex, resolveAbiRegistry } from './abiRegistry';

// jsdom lacks globals that fuels needs.
Object.assign(globalThis, {
  TextDecoder,
  TextEncoder,
  structuredClone: (value: unknown) => deserialize(serialize(value)),
});
const { collectContractIds, decodeOperationReceipts } =
  require('./abiDecoder') as typeof Decoder;

const ORDER_BOOK =
  '0x5a908a89f5caac1a76b199e71e44e42ffed125b2c4e64d0982e60a536a394f76';
const TRADE_ACCOUNT =
  '0x66fa6d1e596a43d5c6533986c54a853f870276133836a71463c2d76ba92182da';

const registry: AbiRegistry = {
  contracts: {
    [ORDER_BOOK]: {
      name: 'o2 Order Book ETH/USDC',
      abi: orderBookAbi as JsonAbi,
      callers: [{ name: 'o2 Trade Account', abi: tradeAccountAbi as JsonAbi }],
    },
  },
};

type Tx = typeof cancelTx;

function decode(tx: Tx) {
  const operations = JSON.parse(
    JSON.stringify(tx.operations),
  ) as typeof tx.operations;
  decodeOperationReceipts(operations, tx.rawPayload, registry);
  const out: DecodedOperationReceipt[] = [];
  const walk = (receipts?: unknown) => {
    for (const r of (receipts as DecodedOperationReceipt[]) ?? []) {
      out.push(r);
      walk(r.receipts);
    }
  };
  for (const op of operations) walk(op.receipts);
  return out;
}

const names = (receipts: DecodedOperationReceipt[]) =>
  receipts.filter((r) => r.decoded).map((r) => r.decoded?.name);

describe('decodeOperationReceipts', () => {
  it('names the top-level trade account call and the forwarded order book calls', () => {
    const receipts = decode(cancelTx);
    const calls = receipts.filter((r) => r.decoded?.kind === 'call');

    expect(calls.map((r) => [r.item?.to, r.decoded?.name])).toEqual([
      [TRADE_ACCOUNT, 'par_session_call_contracts'],
      [ORDER_BOOK, 'cancel_order'],
      [ORDER_BOOK, 'settle_balance'],
      [ORDER_BOOK, 'create_order'],
    ]);
    expect(calls[0].decoded?.contractName).toBe('o2 Trade Account');
    expect(calls[1].decoded?.contractName).toBe('o2 Order Book ETH/USDC');
    expect(calls[1].decoded?.value).toEqual({
      order_id:
        '0x00000000000000610000028122ed170000000000000000000000000000000003',
    });
  });

  it('decodes order book and trade account logs', () => {
    const receipts = decode(cancelTx);
    expect(names(receipts.filter((r) => r.decoded?.kind === 'log'))).toEqual([
      'ParallelNonceUsedEvent',
      'ExtendedNonceSessionContractCallEvent',
      'OrderCancelledEvent',
      'ExtendedNonceSessionContractCallEvent',
      'WithdrawSettledTradeEvent',
      'ExtendedNonceSessionContractCallEvent',
      'OrderCreatedEvent',
    ]);
    const created = receipts.find(
      (r) => r.decoded?.name === 'OrderCreatedEvent',
    );
    expect(created?.decoded?.value).toMatchObject({
      order_side: 'Buy',
      order_type: 'PostOnly',
      trader_id: { ContractId: { bits: TRADE_ACCOUNT } },
    });
  });

  it('decodes fills', () => {
    const receipts = decode(fillTx);
    expect(names(receipts)).toContain('OrderMatchedEvent');
  });

  it('names forwarded calls to contracts without an ABI', () => {
    const receipts = decode(fillTx);
    const unknownCalls = receipts.filter(
      (r) => r.decoded?.kind === 'call' && !r.decoded.contractName,
    );
    expect(unknownCalls.length).toBeGreaterThan(0);
    for (const r of unknownCalls) {
      expect(r.decoded?.name).toMatch(/^[a-z_]+$/);
      expect(r.decoded?.value).toMatch(/^0x/);
    }
  });

  it('leaves receipts of unknown contracts raw', () => {
    const operations = JSON.parse(
      JSON.stringify(cancelTx.operations),
    ) as typeof cancelTx.operations;
    decodeOperationReceipts(operations, cancelTx.rawPayload, {
      contracts: {},
    });
    expect(JSON.stringify(operations)).not.toContain('"decoded"');
  });
});

describe('collectContractIds', () => {
  it('returns called and logging contracts', () => {
    expect(collectContractIds(cancelTx.operations).sort()).toEqual(
      [ORDER_BOOK, TRADE_ACCOUNT].sort(),
    );
  });
});

describe('resolveAbiRegistry', () => {
  const index = buildAbiIndex(
    [
      {
        name: 'o2',
        description: '',
        url: '',
        tags: [],
        contracts: {
          mainnet: [
            {
              id: ORDER_BOOK.toUpperCase().replace('0X', '0x'),
              name: 'o2 Order Book ETH/USDC',
              description: '',
              source: '',
              commit: '',
              repo: '',
              links: [],
              audits: [],
              abi: 'order-book.json',
            },
          ],
        },
        callerContracts: {
          mainnet: [{ name: 'o2 Trade Account', abi: 'trade-account.json' }],
        },
      },
    ],
    'mainnet',
  );

  it('loads only the ABIs of contracts in the transaction', async () => {
    const loadAbi = jest.fn(async (url: string) =>
      url === 'order-book.json'
        ? (orderBookAbi as JsonAbi)
        : (tradeAccountAbi as JsonAbi),
    );
    const resolved = await resolveAbiRegistry(
      index,
      [ORDER_BOOK, TRADE_ACCOUNT],
      loadAbi,
    );
    expect(Object.keys(resolved.contracts)).toEqual([ORDER_BOOK]);
    expect(resolved.contracts[ORDER_BOOK].callers).toHaveLength(1);
    expect(loadAbi.mock.calls.map(([url]) => url).sort()).toEqual([
      'order-book.json',
      'trade-account.json',
    ]);

    loadAbi.mockClear();
    await resolveAbiRegistry(index, [TRADE_ACCOUNT], loadAbi);
    expect(loadAbi).not.toHaveBeenCalled();
  });

  it('skips a contract whose ABI fails to load', async () => {
    const resolved = await resolveAbiRegistry(index, [ORDER_BOOK], () =>
      Promise.reject(new Error('404')),
    );
    expect(resolved.contracts).toEqual({});
  });
});

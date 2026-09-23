import { TextDecoder, TextEncoder } from 'node:util';
import { deserialize, serialize } from 'node:v8';
import type { JsonAbi } from 'fuels';
import cancelTx from './__fixtures__/o2-cancel-tx.json';
import fillTx from './__fixtures__/o2-fill-tx.json';
import orderBookAbi from './__fixtures__/o2-order-book-abi.json';
import tradeAccountAbi from './__fixtures__/o2-trade-account-abi.json';
import type * as Decoder from './abiDecoder';
import type { AbiRegistry, DecodedOperationReceipt } from './abiDecoder';
import {
  buildAbiIndex,
  isTrustedAbiUrl,
  resolveAbiRegistry,
  resolveAccounts,
} from './abiRegistry';

// jsdom lacks globals that fuels needs.
Object.assign(globalThis, {
  TextDecoder,
  TextEncoder,
  structuredClone: (value: unknown) => deserialize(serialize(value)),
});
const { collectCallerCandidates, collectContractIds, decodeOperationReceipts } =
  require('./abiDecoder') as typeof Decoder;

const ORDER_BOOK =
  '0x5a908a89f5caac1a76b199e71e44e42ffed125b2c4e64d0982e60a536a394f76';
const TRADE_ACCOUNT =
  '0x66fa6d1e596a43d5c6533986c54a853f870276133836a71463c2d76ba92182da';
const FILL_TRADE_ACCOUNT =
  '0xea832687c77bd953a6fb1ba8823564ef60e065272f25b5952588a54c737f3980';
const REGISTRY =
  '0x284c6802ad33bb95a37a1113106238ee9d084aa337879b62d2c3a8a74401cdb2';

const orderBook = {
  name: 'o2 Order Book ETH/USDC',
  abi: orderBookAbi as JsonAbi,
};
const tradeAccount = {
  name: 'o2 Trade Account',
  abi: tradeAccountAbi as JsonAbi,
};

const registry = (accounts: AbiRegistry['accounts'] = {}): AbiRegistry => ({
  contracts: { [ORDER_BOOK]: orderBook },
  accounts,
});

type Tx = typeof cancelTx;

function decode(tx: Tx, reg: AbiRegistry) {
  const operations = JSON.parse(
    JSON.stringify(tx.operations),
  ) as typeof tx.operations;
  decodeOperationReceipts(operations, tx.rawPayload, reg);
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
  const verified = registry({ [TRADE_ACCOUNT]: tradeAccount });

  it('names the top-level account call and the forwarded order book calls', () => {
    const calls = decode(cancelTx, verified).filter(
      (r) => r.decoded?.kind === 'call',
    );
    expect(calls.map((r) => [r.item?.to, r.decoded?.name])).toEqual([
      [TRADE_ACCOUNT, 'par_session_call_contracts'],
      [ORDER_BOOK, 'cancel_order'],
      [ORDER_BOOK, 'settle_balance'],
      [ORDER_BOOK, 'create_order'],
    ]);
    expect(calls[0].decoded?.contractName).toBe('o2 Trade Account');
    expect(calls[1].decoded?.value).toEqual({
      order_id:
        '0x00000000000000610000028122ed170000000000000000000000000000000003',
    });
  });

  it('decodes order book and account logs', () => {
    const receipts = decode(cancelTx, verified);
    expect(names(receipts.filter((r) => r.decoded?.kind === 'log'))).toEqual([
      'ParallelNonceUsedEvent',
      'ExtendedNonceSessionContractCallEvent',
      'OrderCancelledEvent',
      'ExtendedNonceSessionContractCallEvent',
      'WithdrawSettledTradeEvent',
      'ExtendedNonceSessionContractCallEvent',
      'OrderCreatedEvent',
    ]);
    expect(
      receipts.find((r) => r.decoded?.name === 'OrderCreatedEvent')?.decoded
        ?.value,
    ).toMatchObject({
      order_side: 'Buy',
      order_type: 'PostOnly',
      trader_id: { ContractId: { bits: TRADE_ACCOUNT } },
    });
  });

  it('decodes fills and names forwarded calls to contracts without an ABI', () => {
    const receipts = decode(
      fillTx,
      registry({ [FILL_TRADE_ACCOUNT]: tradeAccount }),
    );
    expect(names(receipts)).toContain('OrderMatchedEvent');
    const raw = receipts.filter((r) => r.decoded?.raw);
    expect(raw.length).toBeGreaterThan(0);
    for (const r of raw) {
      expect(r.decoded?.name).toMatch(/^[a-z_]+$/);
      expect(r.decoded?.value).toMatch(/^0x/);
    }
  });

  it('applies no account ABI to an unverified caller', () => {
    const receipts = decode(cancelTx, registry());
    const accountReceipts = receipts.filter(
      (r) =>
        r.item?.id === TRADE_ACCOUNT ||
        (r.item?.to === TRADE_ACCOUNT && !r.item?.id),
    );
    expect(accountReceipts.some((r) => r.decoded)).toBe(false);
    expect(names(receipts)).toEqual([
      'OrderCancelledEvent',
      'WithdrawSettledTradeEvent',
      'OrderCreatedEvent',
    ]);
  });

  it('skips calls the account ABI does not have', () => {
    const trial = {
      name: 'o2 Trial Trade Account',
      abi: {
        ...(tradeAccountAbi as JsonAbi),
        functions: (tradeAccountAbi as JsonAbi).functions.filter(
          (f) => f.name !== 'par_session_call_contracts',
        ),
      },
    };
    const calls = decode(cancelTx, registry({ [TRADE_ACCOUNT]: trial })).filter(
      (r) => r.decoded?.kind === 'call',
    );
    expect(calls).toEqual([]);
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

describe('collectContractIds and collectCallerCandidates', () => {
  it('returns called and logging contracts', () => {
    expect(collectContractIds(cancelTx.operations).sort()).toEqual(
      [ORDER_BOOK, TRADE_ACCOUNT].sort(),
    );
  });

  it('returns unlisted callers of listed contracts', () => {
    const listed = registry().contracts;
    expect(
      collectCallerCandidates(cancelTx.operations, (id) => !!listed[id]),
    ).toEqual({
      [TRADE_ACCOUNT]: ORDER_BOOK,
    });
  });
});

describe('registry resolution', () => {
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
            {
              id: REGISTRY,
              name: 'o2 Trade Account Registry',
              description: '',
              source: '',
              commit: '',
              repo: '',
              links: [],
              audits: [],
              abi: 'registry.json',
            },
          ],
        },
        callerContracts: {
          mainnet: [
            {
              name: 'o2 Trade Account',
              abi: 'trade-account.json',
              verify: { contractId: REGISTRY, method: 'is_valid' },
            },
            {
              name: 'o2 Trial Trade Account',
              abi: 'trial-trade-account.json',
              verify: { contractId: REGISTRY, method: 'trial_is_valid' },
            },
          ],
        },
      },
    ],
    'mainnet',
  );
  const loadAbi = jest.fn(
    async (url: string) => ({ url }) as unknown as JsonAbi,
  );

  beforeEach(() => loadAbi.mockClear());

  it('loads only the ABIs of contracts in the transaction', async () => {
    const resolved = await resolveAbiRegistry(
      index,
      [ORDER_BOOK, TRADE_ACCOUNT],
      loadAbi,
    );
    expect(Object.keys(resolved.contracts)).toEqual([ORDER_BOOK]);
    expect(loadAbi.mock.calls.map(([url]) => url)).toEqual(['order-book.json']);
  });

  it('skips a contract whose ABI fails to load', async () => {
    const resolved = await resolveAbiRegistry(index, [ORDER_BOOK], () =>
      Promise.reject(new Error('404')),
    );
    expect(resolved.contracts).toEqual({});
  });

  it('picks the account ABI the verifier confirms', async () => {
    const verify = jest.fn(
      async (_c: string, _a: JsonAbi, method: string, _child: string) =>
        method === 'trial_is_valid',
    );
    const accounts = await resolveAccounts(
      index,
      { [TRADE_ACCOUNT]: ORDER_BOOK },
      loadAbi,
      verify,
    );
    expect(accounts[TRADE_ACCOUNT]?.name).toBe('o2 Trial Trade Account');
    expect(verify.mock.calls.map((c) => [c[0], c[2], c[3]])).toEqual([
      [REGISTRY, 'is_valid', TRADE_ACCOUNT],
      [REGISTRY, 'trial_is_valid', TRADE_ACCOUNT],
    ]);
  });

  it('gives no ABI to a caller the verifier rejects', async () => {
    const accounts = await resolveAccounts(
      index,
      { [TRADE_ACCOUNT]: ORDER_BOOK },
      loadAbi,
      async () => false,
    );
    expect(accounts).toEqual({});
  });
});

describe('isTrustedAbiUrl', () => {
  const projects =
    'https://raw.githubusercontent.com/FuelLabs/fuel-ecosystem/abc123/projects.json';

  it('accepts ABIs from the same repository', () => {
    expect(
      isTrustedAbiUrl(
        'https://raw.githubusercontent.com/FuelLabs/fuel-ecosystem/main/artifacts/o2/order-book-abi.json',
        projects,
      ),
    ).toBe(true);
  });

  it('rejects other repositories and hosts', () => {
    expect(
      isTrustedAbiUrl(
        'https://raw.githubusercontent.com/attacker/repo/main/abi.json',
        projects,
      ),
    ).toBe(false);
    expect(isTrustedAbiUrl('https://example.com/abi.json', projects)).toBe(
      false,
    );
  });
});

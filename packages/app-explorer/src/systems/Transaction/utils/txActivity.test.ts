import { TextDecoder, TextEncoder } from 'node:util';
import { deserialize, serialize } from 'node:v8';
import type { JsonAbi } from 'fuels';
import cancelTx from './__fixtures__/o2-cancel-tx.json';
import fillTx from './__fixtures__/o2-fill-tx.json';
import orderBookAbi from './__fixtures__/o2-order-book-abi.json';
import tpslCreateTx from './__fixtures__/o2-tpsl-create-tx.json';
import tpslTriggerTx from './__fixtures__/o2-tpsl-trigger-tx.json';
import tradeAccountAbi from './__fixtures__/o2-trade-account-abi.json';
import type * as Decoder from './abiDecoder';
import type { AbiRegistry } from './abiDecoder';
import { type ActivityPart, buildTxActivity } from './txActivity';

// jsdom lacks globals that fuels needs.
Object.assign(globalThis, {
  TextDecoder,
  TextEncoder,
  structuredClone: (value: unknown) => deserialize(serialize(value)),
});
const { decodeOperationReceipts } = require('./abiDecoder') as typeof Decoder;

const ORDER_BOOK =
  '0x5a908a89f5caac1a76b199e71e44e42ffed125b2c4e64d0982e60a536a394f76';
const BASE = '0xbase';
const QUOTE = '0xquote';

const registry: AbiRegistry = {
  contracts: {
    [ORDER_BOOK]: {
      name: 'o2 Order Book ETH/USDC',
      abi: orderBookAbi as JsonAbi,
      project: 'o2',
      market: { symbol: 'ETH/USDC', baseAssetId: BASE, quoteAssetId: QUOTE },
    },
  },
  accounts: {
    '0x66fa6d1e596a43d5c6533986c54a853f870276133836a71463c2d76ba92182da': {
      name: 'o2 Trade Account',
      abi: tradeAccountAbi as JsonAbi,
    },
    '0xea832687c77bd953a6fb1ba8823564ef60e065272f25b5952588a54c737f3980': {
      name: 'o2 Trade Account',
      abi: tradeAccountAbi as JsonAbi,
    },
  },
};

function activityOf(tx: typeof cancelTx) {
  const operations = JSON.parse(
    JSON.stringify(tx.operations),
  ) as typeof tx.operations;
  decodeOperationReceipts(operations, tx.rawPayload, registry);
  const activity = buildTxActivity(operations, registry);
  if (!activity) throw new Error('no activity');
  return activity;
}

const render = (parts: ActivityPart[]) =>
  parts
    .map((p) =>
      'text' in p
        ? p.text
        : 'code' in p
          ? p.code
          : 'amount' in p
            ? `[${p.amount} ${p.assetId}]`
            : p.address,
    )
    .join('');

describe('buildTxActivity', () => {
  it('summarizes a cancel and replace', () => {
    const activity = activityOf(cancelTx);
    expect(activity.headline).toBe(
      'Placed 1 order and cancelled 1 order on ETH/USDC',
    );
    expect(activity.project).toBe('o2');
    expect(activity.actor).toEqual({
      address:
        '0x66fa6d1e596a43d5c6533986c54a853f870276133836a71463c2d76ba92182da',
      name: 'o2 Trade Account',
    });
    expect(activity.sessionKey).toBe(
      '0x6becccf6187fc3ebc6050593ff3cb27a3e86ec354413e2a123b5d959614eb850',
    );
    expect(activity.actions.map((a) => [a.label, render(a.parts)])).toEqual([
      ['Order cancelled', 'Order 0x6100...0003'],
      [
        'Order placed',
        `Post-only buy [334000000 ${BASE}] at [2753320000000 ${QUOTE}]`,
      ],
    ]);
  });

  it('describes a fill from the taker side and hides zero settlements', () => {
    const activity = activityOf(fillTx);
    expect(activity.headline).toMatch(
      /^Placed 1 order and filled 1 trade on ETH\/USDC, plus calls to \d+ other contracts$/,
    );
    const lines = activity.actions
      .filter((a) => a.kind !== 'call')
      .map((a) => [a.label, render(a.parts)]);
    expect(lines).toEqual([
      [
        'Order placed',
        `Fill-or-kill buy [7898286 ${BASE}] at [2775500000000 ${QUOTE}]`,
      ],
      ['Filled', `Bought [7898286 ${BASE}] at [2747870000000 ${QUOTE}]`],
      ['Fees', `[789 ${BASE}] collected by the market`],
      ['Settled', `[7897497 ${BASE}] moved to the trade account`],
    ]);
    expect(
      activity.actions.filter((a) => a.kind === 'call').map((a) => a.parts),
    ).toContainEqual([{ code: 'swap' }]);
  });

  it('names order types that carry data', () => {
    const decoded = (orderType: unknown) => ({
      item: { receiptType: 'LOG_DATA' },
      decoded: {
        kind: 'log',
        contractId: ORDER_BOOK,
        name: 'OrderCreatedEvent',
        value: {
          order_id: '0x01',
          order_side: 'Sell',
          order_type: orderType,
          quantity: '1',
          price: '2',
        },
      },
    });
    const activity = buildTxActivity(
      [
        {
          receipts: [
            decoded({ Limit: ['2', { unix: '100' }] }),
            decoded({ BoundedMarket: ['1', '3'] }),
          ],
        },
      ],
      registry,
    );
    expect(activity?.actions.map((a) => render(a.parts))).toEqual([
      `Limit sell [1 ${BASE}] at [2 ${QUOTE}]`,
      `Market sell [1 ${BASE}] with a limit price of [2 ${QUOTE}]`,
    ]);
  });

  describe('take profit and stop loss (testnet fETH/fUSDC)', () => {
    const TESTNET_BOOK =
      '0x2a78ab167c28f474d2ad62daabe7a42ce03f066dd8aa7cf57b984d14e4bd907b';
    const testnetRegistry: AbiRegistry = {
      contracts: {
        [TESTNET_BOOK]: {
          name: 'o2 Order Book fETH/fUSDC',
          abi: orderBookAbi as JsonAbi,
          project: 'o2',
          market: {
            symbol: 'fETH/fUSDC',
            baseAssetId: BASE,
            quoteAssetId: QUOTE,
          },
        },
      },
      accounts: {
        '0x2397ed7a5bb6d8748beb7336e21327892ba13a2a06a5e3988fe1a94249435328': {
          name: 'o2 Trade Account',
          abi: tradeAccountAbi as JsonAbi,
        },
      },
    };
    const activityFor = (tx: { operations: unknown; rawPayload: string }) => {
      const operations = JSON.parse(JSON.stringify(tx.operations));
      decodeOperationReceipts(operations, tx.rawPayload, testnetRegistry);
      const activity = buildTxActivity(operations, testnetRegistry);
      if (!activity) throw new Error('no activity');
      return activity;
    };

    it('labels the trigger above a buy as take profit and below as stop loss', () => {
      const activity = activityFor(tpslCreateTx);
      expect(activity.headline).toBe(
        'Placed 1 order with take profit and stop loss on fETH/fUSDC',
      );
      expect(activity.actions.map((a) => [a.label, render(a.parts)])).toEqual([
        [
          'Order placed',
          `Limit buy [1522400000 ${BASE}] at [2714850000000 ${QUOTE}]`,
        ],
        [
          'Take profit',
          `Sell the filled amount when the price rises to [2769150000000 ${QUOTE}]`,
        ],
        [
          'Stop loss',
          `Sell the filled amount when the price falls to [2660550000000 ${QUOTE}]`,
        ],
      ]);
    });

    it('describes a triggered order and its cancelled pair', () => {
      const activity = activityFor(tpslTriggerTx);
      expect(activity.headline).toMatch(
        /^Triggered 1 order, cancelled 1 order and filled 2 trades on fETH\/fUSDC$/,
      );
      expect(activity.actions.map((a) => a.label)).toEqual([
        'Triggered',
        'Trigger cancelled',
        'Order placed',
        'Filled',
        'Filled',
        'Fees',
      ]);
      expect(render(activity.actions[1].parts)).toMatch(
        /was cancelled because its paired order triggered$/,
      );
    });
  });

  it('describes a reverted transaction as an attempt', () => {
    const operations = JSON.parse(JSON.stringify(cancelTx.operations));
    decodeOperationReceipts(operations, cancelTx.rawPayload, registry);
    const activity = buildTxActivity(operations, registry, true);
    expect(activity?.failed).toBe(true);
    expect(activity?.headline).toBe(
      'Failed to place 1 order and cancel 1 order on ETH/USDC',
    );
  });
});

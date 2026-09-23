import type { CosmosStakingQueryItem } from '../cosmos/CosmosIndex';
import { normalizeCosmosQueryResponse } from './normalize';

function item(
  overrides: Partial<CosmosStakingQueryItem> = {},
): CosmosStakingQueryItem {
  return {
    id: 1,
    tx_hash: 'TX1',
    block_height: 50,
    timestamp: '2026-01-01T00:00:00.000Z',
    event_index: 0,
    event_type: 'delegate',
    event_key: 'delegator',
    event_value: '"0xabc"',
    ...overrides,
  };
}

describe('normalizeCosmosQueryResponse', () => {
  it('groups events sharing an index into one object, one entry per tx', () => {
    const result = normalizeCosmosQueryResponse([
      item({ event_key: 'delegator', event_value: '"0xabc"' }),
      item({ event_key: 'amount', event_value: '"100"' }),
    ]);
    expect(result).toHaveLength(1);
    expect(result[0].txHash).toBe('TX1');
    expect(result[0].events).toHaveLength(1);
    expect(result[0].event).toEqual({
      type: 'delegate',
      delegator: '0xabc',
      amount: '100',
    });
  });

  it('keeps separate txs as separate entries', () => {
    const result = normalizeCosmosQueryResponse([
      item({ tx_hash: 'TX1' }),
      item({ tx_hash: 'TX2', event_value: '"0xdef"' }),
    ]);
    expect(result.map((r) => r.txHash).sort()).toEqual(['TX1', 'TX2']);
  });

  it('filters to the preferred event type and prefers it for `event`', () => {
    const result = normalizeCosmosQueryResponse(
      [
        item({
          event_index: 0,
          event_type: 'redelegate',
          event_key: 'destination_validator',
        }),
        item({
          event_index: 1,
          event_type: 'withdraw_rewards',
          event_key: 'delegator',
        }),
      ],
      'withdraw_rewards',
    );
    expect(result[0].events).toHaveLength(1);
    expect((result[0].event as { type: string }).type).toBe('withdraw_rewards');
  });

  it('leaves an unparseable value as the raw string', () => {
    const result = normalizeCosmosQueryResponse([
      item({ event_key: 'validator', event_value: 'fuelsequencervaloper1abc' }),
    ]);
    expect((result[0].event as { validator: string }).validator).toBe(
      'fuelsequencervaloper1abc',
    );
  });
});

import type { CosmosStakingQueryItem } from '../cosmos/CosmosIndex';
import type { ComosTx } from './types';

// Groups flat (tx_hash, event_index, event_key, event_value) rows back into
// one object per cosmos tx, with one entry per event_index merging that
// event's keys.
export function normalizeCosmosQueryResponse<T = Record<string, unknown>>(
  items: CosmosStakingQueryItem[],
  preferredEventType?: string,
): Array<ComosTx<T>> {
  const tryParse = (value: string) => {
    try {
      if (typeof value !== 'string') return value;
      return JSON.parse(value);
    } catch {
      return value;
    }
  };

  type Building = {
    height: string;
    txHash: string;
    timestamp: Date;
    events: unknown[];
  };
  const result: Record<string, Building> = {};
  for (const item of items) {
    result[item.tx_hash] = result[item.tx_hash] || {
      height: String(item.block_height),
      txHash: item.tx_hash,
      timestamp: new Date(item.timestamp ?? 0),
      events: [],
    };
    const events = result[item.tx_hash].events as Array<
      Record<string, unknown>
    >;
    events[item.event_index] = {
      ...(events[item.event_index] as Record<string, unknown> | undefined),
      type: item.event_type,
      [item.event_key]: tryParse(item.event_value),
    };
  }

  return Object.values(result).map((tx) => {
    const events = (
      tx.events as Array<Record<string, unknown> | undefined>
    ).filter((e): e is Record<string, unknown> => !!e);

    if (preferredEventType) {
      const filteredEvents = events.filter(
        (e) => e.type === preferredEventType,
      );
      return {
        ...tx,
        events: filteredEvents as T[],
        event: (filteredEvents.length > 0 ? filteredEvents[0] : events[0]) as T,
      };
    }

    return {
      ...tx,
      events: events as T[],
      event: events[0] as T,
    };
  });
}

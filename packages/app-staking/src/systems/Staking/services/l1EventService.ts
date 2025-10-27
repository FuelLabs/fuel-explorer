import { FUEL_INDEXER_API } from 'app-commons';
import { api } from '~staking/systems/Core/utils/api';
import { fetchWithdrawProof } from '../services/fetchWithdrawProof';
import type { StakingEvent, StakingEventWithProof } from '../types/l1/events';

export type L1EventServiceInputs = {
  fetchEvent: {
    id: string | undefined;
    skipCache?: boolean;
    cacheTtlMs?: number;
  };
};

export class L1EventService {
  /**
   * Fetches an L1 event by ID
   * @param input Object containing the event ID to fetch
   * @returns The event data with proof if applicable
   */
  static async fetchEvent(
    input: L1EventServiceInputs['fetchEvent'],
  ): Promise<StakingEvent | StakingEventWithProof> {
    const { id } = input;

    if (!id) {
      throw new Error('No id to fetch event');
    }

    const data = await api.get<StakingEvent>(
      `${FUEL_INDEXER_API}/staking/events/${id}`,
    );

    // @ts-ignore - StakingEvent may have nonce property depending on the type
    const nonce = data.nonce;
    if (nonce === '' || nonce == null) {
      return data;
    }

    try {
      const proof = await fetchWithdrawProof(nonce);
      return {
        ...data,
        proof,
      };
    } catch (_) {
      return data;
    }
  }
}

import { FUEL_INDEXER_API } from 'app-commons';
import { formatSecondsToETA } from '~staking/systems/Core/utils/formatSecondsToETA';

export type FinalizationPeriodFlow = 'withdraw' | 'undelegate';

export const FinalizationPeriodService = {
  fetchFinalizationPeriod: async (
    flow: FinalizationPeriodFlow,
  ): Promise<string | undefined> => {
    try {
      const res = await fetch(
        `${FUEL_INDEXER_API}/staking/finalization-period/${flow}`,
      );
      if (!res.ok) return undefined;
      const data = await res.json();
      if (data.seconds == null) return undefined;
      return formatSecondsToETA(data.seconds, '~');
    } catch (error) {
      console.error('Error fetching finalization period:', error);
      return undefined;
    }
  },
};

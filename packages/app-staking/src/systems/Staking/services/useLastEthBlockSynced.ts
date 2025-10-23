import { useQuery } from '@tanstack/react-query';
import { cosmosApi } from '~staking/systems/Core/utils/api';
import { QUERY_KEYS } from '~staking/systems/Core/utils/query';

export const useLastEthBlockSynced = () => {
  const query = useQuery({
    queryKey: QUERY_KEYS.lastEthBlockSynced,
    queryFn: async () => {
      const response = await cosmosApi.get<{ block: number }>(
        '/fuelsequencer/bridge/v1/last_ethereum_block_synced',
      );
      return response.block;
    },
  });

  return query;
};

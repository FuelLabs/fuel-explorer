import { useState } from 'react';
import {
  useEthAccountConnection,
  useFuelAccountConnection,
} from '~portal/systems/Chains';

import { useQuery } from '@tanstack/react-query';
import { BridgeService } from '../services';

const MAX_BY_PAGE = 1;

export const useBridgeTxs = () => {
  const {
    isConnected,
    isLoadingConnection,
    provider: fuelProvider,
    address: fuelAddress,
  } = useFuelAccountConnection();

  const [amountTxsToShow, setAmountTxsToShow] = useState(MAX_BY_PAGE);
  const { publicClient: ethPublicClient } = useEthAccountConnection();

  // @TODO: Move it to "queries" folder
  const { data: bridgeTxs, isLoading: isLoadingState } = useQuery({
    queryKey: ['bridgeTxs'],
    queryFn: async () => {
      const data = await BridgeService.fetchTxs({
        fuelAddress,
        fuelProvider,
        ethPublicClient,
      });

      return data;
    },
    enabled: !!fuelAddress && !!fuelProvider && !!ethPublicClient,
    // @TODO: Move it to global the setting, basically it keeps everything on cache but always getting once fresh data
    cacheTime: 1000 * 60, // 1 minute
    staleTime: Infinity,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  const isLoading = isLoadingState || isLoadingConnection;
  const length = bridgeTxs?.length ?? 0;
  const paginatedBridgeTxs = bridgeTxs?.slice(0, amountTxsToShow);
  const hasMorePages = (bridgeTxs?.length || 0) > amountTxsToShow;

  return {
    isLoading,
    hasMorePages,
    bridgeTxs: paginatedBridgeTxs,
    shouldShowNotConnected: !isLoading && !isConnected,
    shouldShowEmpty: !isLoading && isConnected && !length,
    handlers: {
      showMore: () => setAmountTxsToShow(amountTxsToShow + MAX_BY_PAGE),
    },
  };
};

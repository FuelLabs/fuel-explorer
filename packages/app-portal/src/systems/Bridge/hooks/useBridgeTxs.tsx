import { useState } from 'react';
import {
  useEthAccountConnection,
  useFuelAccountConnection,
} from '~portal/systems/Chains';

import { useQuery } from '@tanstack/react-query';
import { BRIDGE_QUERY_KEYS } from '../queries/keys';
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

  const { data: bridgeTxs, isLoading: isLoadingState } = useQuery({
    queryKey: BRIDGE_QUERY_KEYS.list(),
    queryFn: async () => {
      return await BridgeService.fetchTxs({
        fuelAddress,
        fuelProvider,
        ethPublicClient,
      });
    },
    enabled:
      !!fuelAddress &&
      !!fuelProvider &&
      !!ethPublicClient &&
      !isLoadingConnection,
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

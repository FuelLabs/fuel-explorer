import { useEffect } from 'react';
import { Services, store } from '~portal/store';
import {
  useEthAccountConnection,
  useFuelAccountConnection,
} from '~portal/systems/Chains';

import type { BridgeTxsMachineState } from '../machines';

const selectors = {
  allTxs: (state: BridgeTxsMachineState) => {
    return state.context.allTxs;
  },
  paginatedTxs: (state: BridgeTxsMachineState) => {
    return state.context.paginatedTxs;
  },
  isLoading: (state: BridgeTxsMachineState) => {
    return state.hasTag('isLoading');
  },
};

export const useBridgeTxs = () => {
  const {
    isConnected,
    isLoadingConnection,
    provider: fuelProvider,
    address: fuelAddress,
  } = useFuelAccountConnection();

  const { publicClient: ethPublicClient } = useEthAccountConnection();
  const allTxs = store.useSelector(Services.bridgeTxs, selectors.allTxs);
  const paginatedTxs = store.useSelector(
    Services.bridgeTxs,
    selectors.paginatedTxs,
  );
  const isLoadingState = store.useSelector(
    Services.bridgeTxs,
    selectors.isLoading,
  );

  const isLoading = isLoadingState || isLoadingConnection;
  const length = paginatedTxs?.length ?? 0;
  const hasMorePages = (allTxs?.length || 0) > length;

  useEffect(() => {
    if (isLoadingConnection || !fuelProvider || !ethPublicClient) return;
    store.fetchTxs({ fuelProvider, ethPublicClient, fuelAddress });
  }, [
    isLoadingConnection,
    fuelProvider?.url,
    ethPublicClient.chain.id,
    fuelAddress?.toAddress(),
  ]);

  return {
    isLoading,
    hasMorePages,
    bridgeTxs: paginatedTxs,
    shouldShowNotConnected: !isLoading && !isConnected,
    shouldShowEmpty: !isLoading && isConnected && !length,
    handlers: {
      showMore: store.fetchNextPage,
    },
  };
};

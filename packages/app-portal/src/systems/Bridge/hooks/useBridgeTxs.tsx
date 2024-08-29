import { useEffect } from 'react';
import { Services, store } from '~portal/store';
import {
  useEthAccountConnection,
  useFuelAccountConnection,
} from '~portal/systems/Chains';

import type { BridgeTxsMachineState } from '../machines';

const selectors = {
  paginatedTxs: (state: BridgeTxsMachineState) => {
    return state.context.paginatedTxs;
  },
  hasNextPage: (state: BridgeTxsMachineState) => {
    return state.context.hasNextPage;
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
    account,
  } = useFuelAccountConnection();

  const { publicClient: ethPublicClient } = useEthAccountConnection();
  const paginatedTxs = store.useSelector(
    Services.bridgeTxs,
    selectors.paginatedTxs,
  );
  const hasNextPage = store.useSelector(
    Services.bridgeTxs,
    selectors.hasNextPage,
  );
  const isLoadingState = store.useSelector(
    Services.bridgeTxs,
    selectors.isLoading,
  );

  const isLoading = isLoadingState || isLoadingConnection;
  const length = paginatedTxs?.length ?? 0;

  useEffect(() => {
    if (isLoadingConnection || !fuelProvider || !ethPublicClient) return;
    store.fetchTxs({
      fuelProvider,
      ethPublicClient: ethPublicClient,
      fuelAddress,
    });
  }, [
    isLoadingConnection,
    fuelProvider?.url,
    ethPublicClient?.chain?.id,
    fuelAddress?.toAddress(),
  ]);

  return {
    isLoading,
    hasMorePages: hasNextPage,
    bridgeTxs: paginatedTxs,
    shouldShowNotConnected: !isLoading && !account,
    shouldShowEmpty: !isLoading && isConnected && !length,
    handlers: {
      showMore: store.fetchNextPage,
    },
  };
};

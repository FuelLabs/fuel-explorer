import { useEffect, useState } from 'react';
import { Services, store } from '~portal/store';
import {
  useEthAccountConnection,
  useFuelAccountConnection,
} from '~portal/systems/Chains';

import type { BridgeTxsMachineState } from '../machines';

const MAX_BY_PAGE = 15;

const selectors = {
  bridgeTxs: (state: BridgeTxsMachineState) => {
    return state.context.bridgeTxs;
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

  const [amountTxsToShow, setAmountTxsToShow] = useState(MAX_BY_PAGE);
  const { publicClient: ethPublicClient } = useEthAccountConnection();
  const bridgeTxs = store.useSelector(Services.bridgeTxs, selectors.bridgeTxs);
  const isLoadingState = store.useSelector(
    Services.bridgeTxs,
    selectors.isLoading,
  );

  const isLoading = isLoadingState || isLoadingConnection;
  const length = bridgeTxs?.length ?? 0;
  const paginatedBridgeTxs = bridgeTxs?.slice(0, amountTxsToShow);
  const hasMorePages = (bridgeTxs?.length || 0) > amountTxsToShow;

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
    bridgeTxs: paginatedBridgeTxs,
    shouldShowNotConnected: !isLoading && !isConnected,
    shouldShowEmpty: !isLoading && isConnected && !length,
    handlers: {
      showMore: () => setAmountTxsToShow(amountTxsToShow + MAX_BY_PAGE),
    },
  };
};

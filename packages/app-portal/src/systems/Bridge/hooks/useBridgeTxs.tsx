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
  const isLoading = store.useSelector(Services.bridgeTxs, selectors.isLoading);

  useEffect(() => {
    if (!fuelProvider || !ethPublicClient) return;

    store.fetchTxs({ fuelProvider, ethPublicClient, fuelAddress });
  }, [fuelProvider?.url, ethPublicClient.chain.id, fuelAddress?.toAddress()]);

  const paginatedBridgeTxs = bridgeTxs?.slice(0, amountTxsToShow);
  const hasMorePages = (bridgeTxs?.length || 0) > amountTxsToShow;

  return {
    handlers: {
      showMore: () => setAmountTxsToShow(amountTxsToShow + MAX_BY_PAGE),
    },
    bridgeTxs: paginatedBridgeTxs,
    isLoading,
    hasMorePages,
    shouldShowNotConnected: !isLoadingConnection && !isConnected && !isLoading,
    shouldShowEmpty:
      isConnected && !isLoading && bridgeTxs && bridgeTxs.length === 0,
    shouldShowList: !isLoading && isConnected && (bridgeTxs?.length || 0) > 0,
  };
};

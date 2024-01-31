import { useEffect, useState } from 'react';
import { Services, store } from '~/store';
import {
  useEthAccountConnection,
  useFuelAccountConnection,
} from '~/systems/Chains';

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
    hasWallet,
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

  const isConnected = !!fuelAddress?.toAddress();

  return {
    handlers: {
      showMore: () => setAmountTxsToShow(amountTxsToShow + MAX_BY_PAGE),
    },
    bridgeTxs: paginatedBridgeTxs,
    isLoading,
    hasMorePages,
    shouldShowNotConnected: hasWallet
      ? !isLoadingConnection && !isConnected && !isLoading
      : !hasWallet,
    shouldShowEmpty:
      isConnected && !isLoading && bridgeTxs && bridgeTxs.length === 0,
    shouldShowList:
      !isLoading && isConnected && ((bridgeTxs && bridgeTxs.length) || 0) > 0,
  };
};

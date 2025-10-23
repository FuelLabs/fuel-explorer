import { useQueryClient } from '@tanstack/react-query';
import { type HexAddress, STAKING_ENV } from 'app-commons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useWaitForTransactionReceipt } from 'wagmi';
import { QUERY_KEYS } from '~staking/systems/Core/utils/query';
import { StakingEndpointsService } from '~staking/systems/Staking/services/StakingEndpointsService';
import { useLastEthBlockSynced } from '~staking/systems/Staking/services/useLastEthBlockSynced';
import { useWebSocket } from '~staking/systems/Staking/services/useWebSocket';
import type { CometBlockSyncEventMessage } from './types';

const subscriptionMsg = {
  jsonrpc: '2.0',
  method: 'subscribe',
  id: 1,
  params: {
    query: "fuelsequencer.bridge.EventEthereumBlockSynced.full_sync='true'",
  },
};

const unsubscribeMsg = {
  jsonrpc: '2.0',
  method: 'unsubscribe',
  id: 1,
  params: {
    query: "fuelsequencer.bridge.EventEthereumBlockSynced.full_sync='true'",
  },
};

function onOpen(ws: WebSocket) {
  ws.readyState === WebSocket.OPEN && ws.send(JSON.stringify(subscriptionMsg));
}

function onClose(ws: WebSocket) {
  ws.readyState === WebSocket.OPEN && ws.send(JSON.stringify(unsubscribeMsg));
}

export const useWaitForEthBlockSync = (
  txHash: HexAddress | null | undefined,
  onNewBlock?: (blockNumber: bigint) => void,
) => {
  const [targetReached, setTargetReached] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const secureEndpoint =
    StakingEndpointsService.getCurrentCosmosCometUrls().COMET.SECURE;
  const cometUrl = useMemo(
    () =>
      secureEndpoint.replace(
        /https?:\/\//,
        STAKING_ENV === 'LOCAL' ? 'ws://' : 'wss://',
      ),
    [secureEndpoint],
  );
  const queryClient = useQueryClient();
  const { data: receipt } = useWaitForTransactionReceipt({
    hash: txHash || undefined,
    query: {
      enabled: txHash?.startsWith('0x'),
    },
  });
  const targetBlockNumber = receipt?.blockNumber;

  const { data: lastEthBlockSynced = -1n } = useLastEthBlockSynced();
  const targetReachedOnCachedData =
    targetBlockNumber && lastEthBlockSynced >= targetBlockNumber;
  const enabled =
    !targetReachedOnCachedData && !!targetBlockNumber && !!txHash && !!cometUrl;

  // biome-ignore lint/correctness/useExhaustiveDependencies: Reset state on target block number change
  useEffect(() => {
    setTargetReached(false);
    setError(undefined);
  }, [targetBlockNumber]);

  const onMessage = useCallback(
    (ws: WebSocket, data: MessageEvent<string>) => {
      try {
        if (!targetBlockNumber) return;

        const response = JSON.parse(
          data.data.toString(),
        ) as CometBlockSyncEventMessage;

        if (response?.result?.data?.type !== 'tendermint/event/Tx') return;

        const rawBlockNumber =
          response.result.events[
            'fuelsequencer.bridge.EventEthereumBlockSynced.block_number'
          ]?.[0];
        if (!rawBlockNumber) return;

        const _blockNumber = BigInt(rawBlockNumber.replaceAll('"', ''));

        onNewBlock?.(_blockNumber);
        if (_blockNumber >= targetBlockNumber) {
          setTargetReached(true);
          ws.close();

          queryClient.setQueryData<bigint>(
            QUERY_KEYS.lastEthBlockSynced,
            (data) => {
              if (!data || data < _blockNumber) {
                return _blockNumber;
              }
              return data;
            },
          );
        }
      } catch (e) {
        setError(
          e instanceof Error
            ? e
            : new Error('Failed to parse websocket message'),
        );
      }
    },
    [targetBlockNumber, queryClient, onNewBlock],
  );

  useWebSocket({
    url: cometUrl,
    onOpen,
    beforeClose: onClose,
    onMessage,
    enabled,
  });

  return {
    targetReached: targetReachedOnCachedData || targetReached,
    error,
  };
};

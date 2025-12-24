import { useQuery } from '@tanstack/react-query';
import { cosmosApi } from '~staking/systems/Core/utils/api';

// Maximum polling duration: 10 minutes
const MAX_POLLING_DURATION_MS = 10 * 60 * 1000;
// Maximum retries (5 seconds * 120 = 10 minutes)
const MAX_RETRIES = 120;

interface TxResponse {
  tx_response: {
    height: string;
    txhash: string;
    code: number;
    codespace: string;
    data: string;
    raw_log: string;
    logs: Array<{
      msg_index: number;
      log: string;
      events: Array<{
        type: string;
        attributes: Array<{ key: string; value: string }>;
      }>;
    }>;
    info: string;
    gas_wanted: string;
    gas_used: string;
    timestamp: string;
  };
}

interface BlockResponse {
  block: {
    header: {
      height: string;
      time: string;
    };
  };
}

export interface SequencerOperationStatus {
  isCompleted: boolean;
  isFailed: boolean;
  hasExceededTimeout: boolean;
  code: number;
  height?: string;
  logs?: Array<{
    msg_index: number;
    log: string;
    events: Array<{
      type: string;
      attributes: Array<{ key: string; value: string }>;
    }>;
  }>;
  // Progress tracking
  currentHeight?: number;
  inclusionHeight?: number;
  blocksSinceInclusion?: number;
  progressPercentage?: number;
  progressStage?:
    | 'pending'
    | 'included'
    | 'confirmed'
    | 'completed'
    | 'timeout';
}

/**
 * Hook to query the status of a sequencer operation by its transaction hash.
 * Tracks progress with block confirmations and has timeout protection (10 min max).
 *
 * The hook will automatically stop polling and return timeout status if the
 * operation hasn't completed within MAX_POLLING_DURATION_MS.
 */
export const useSequencerOperationStatus = (
  txHash: string | undefined,
  startedAt?: number,
) => {
  const query = useQuery<SequencerOperationStatus | null, Error>({
    queryKey: ['sequencerOperationStatus', txHash],
    queryFn: async () => {
      if (!txHash) return null;

      // Check for timeout
      const elapsed = startedAt ? Date.now() - startedAt : 0;
      if (elapsed > MAX_POLLING_DURATION_MS) {
        return {
          isCompleted: false,
          isFailed: false,
          hasExceededTimeout: true,
          code: 0,
          progressStage: 'timeout',
          progressPercentage: 0,
        };
      }

      try {
        // Fetch transaction status
        const txResponse = await cosmosApi.get<TxResponse>(
          `/cosmos/tx/v1beta1/txs/${txHash}`,
        );

        if (!txResponse?.tx_response) {
          // Transaction not yet on chain (still pending)
          return {
            isCompleted: false,
            isFailed: false,
            hasExceededTimeout: false,
            code: 0,
            progressStage: 'pending',
            progressPercentage: 10,
          };
        }

        const { tx_response } = txResponse;
        const code = tx_response.code ?? 0;
        const inclusionHeight = Number.parseInt(tx_response.height, 10);

        // Fetch current block height to calculate progress
        let currentHeight = inclusionHeight;
        let blocksSinceInclusion = 0;

        try {
          const blockResponse = await cosmosApi.get<BlockResponse>(
            '/cosmos/blocks/latest',
          );
          currentHeight = Number.parseInt(
            blockResponse.block.header.height,
            10,
          );
          blocksSinceInclusion = currentHeight - inclusionHeight;
        } catch {
          // If we can't fetch latest block, just use inclusion height
        }

        // Calculate progress
        // Confirmation requires ~2-3 blocks on Sepolia
        const requiredConfirmations = 3;
        const currentConfirmations = Math.min(
          blocksSinceInclusion,
          requiredConfirmations,
        );
        const progressPercentage = Math.round(
          50 + (currentConfirmations / requiredConfirmations) * 40,
        ); // 50-90%

        let progressStage:
          | 'pending'
          | 'included'
          | 'confirmed'
          | 'completed'
          | 'timeout' = 'included';
        if (blocksSinceInclusion >= requiredConfirmations) {
          progressStage = 'confirmed';
        }

        return {
          isCompleted:
            code === 0 && blocksSinceInclusion >= requiredConfirmations,
          isFailed: code !== 0,
          hasExceededTimeout: false,
          code,
          height: tx_response.height,
          logs: tx_response.logs,
          currentHeight,
          inclusionHeight,
          blocksSinceInclusion,
          progressPercentage,
          progressStage,
        };
      } catch (_error) {
        // If tx is not found (404), it's not yet on chain
        return {
          isCompleted: false,
          isFailed: false,
          hasExceededTimeout: false,
          code: 0,
          progressStage: 'pending',
          progressPercentage: 5,
        };
      }
    },
    enabled: !!txHash,
    // Poll every 5 seconds until the operation completes
    refetchInterval: (query) => {
      // Stop polling once completed, failed, or timed out
      const data = query.state.data;
      if (data?.isCompleted || data?.isFailed || data?.hasExceededTimeout)
        return false;
      return 5000;
    },
    retry: MAX_RETRIES,
    retryDelay: 5000,
    staleTime: 0,
  });

  return {
    ...query,
    isProcessed: query.data?.isCompleted ?? false,
    hasExceededTimeout: query.data?.hasExceededTimeout ?? false,
    responseCode: query.data?.code,
  };
};

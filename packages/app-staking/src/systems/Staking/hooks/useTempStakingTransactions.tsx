import { type QueryClient, useQuery } from '@tanstack/react-query';

// Define the transaction type
export interface StakingTransaction {
  id?: string;
  type?: 'deposit' | 'withdraw';
  amount?: string;
  status?: 'pending' | 'success' | 'failed';
  timestamp?: number;
  hash?: string;
}

// Define a unique key for the query
const TEMP_STAKING_TRANSACTIONS_KEY = 'temp-staking-transactions';

// Create a type for the shared state
interface StakingTransactionsState {
  transactions: StakingTransaction[];
}

/**
 * Hook to access and update temporary staking transactions across components
 * @returns An object with the current transactions and methods to manage them
 */
export function useTempStakingTransactions() {
  // Get the current transactions from the query cache
  const { data } = useQuery<StakingTransactionsState>({
    queryKey: [TEMP_STAKING_TRANSACTIONS_KEY],
    // Initialize with empty array if not present
    initialData: { transactions: [] },
    // Don't refetch on window focus or network reconnect
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    // Keep the data in cache forever
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
  });

  return {
    transactions: data?.transactions || [],
  };
}

/**
 * Functions to update the transactions from outside React components
 */
export const TempStakingTransactions = {
  addTransaction: (
    queryClient: QueryClient,
    transaction: StakingTransaction,
  ) => {
    queryClient.setQueryData<StakingTransactionsState>(
      [TEMP_STAKING_TRANSACTIONS_KEY],
      (old) => ({
        transactions: [...(old?.transactions || []), transaction],
      }),
    );
    queryClient.invalidateQueries({
      queryKey: [TEMP_STAKING_TRANSACTIONS_KEY],
    });
    queryClient.refetchQueries({ queryKey: [TEMP_STAKING_TRANSACTIONS_KEY] });
  },

  removeTransaction: (queryClient: QueryClient, id: string) => {
    queryClient.setQueryData<StakingTransactionsState>(
      [TEMP_STAKING_TRANSACTIONS_KEY],
      (old) => ({
        transactions: (old?.transactions || []).filter((tx) => tx.id !== id),
      }),
    );
    queryClient.invalidateQueries({
      queryKey: [TEMP_STAKING_TRANSACTIONS_KEY],
    });
    queryClient.refetchQueries({ queryKey: [TEMP_STAKING_TRANSACTIONS_KEY] });
  },

  clearTransactions: (queryClient: QueryClient) => {
    queryClient.setQueryData<StakingTransactionsState>(
      [TEMP_STAKING_TRANSACTIONS_KEY],
      { transactions: [] },
    );
    queryClient.invalidateQueries({
      queryKey: [TEMP_STAKING_TRANSACTIONS_KEY],
    });
    queryClient.refetchQueries({ queryKey: [TEMP_STAKING_TRANSACTIONS_KEY] });
  },
};

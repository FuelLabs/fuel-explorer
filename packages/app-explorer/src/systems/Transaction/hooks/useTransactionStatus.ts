import { type Query, type QueryKey, useQuery } from '@tanstack/react-query';
import { FUEL_CHAIN } from 'app-commons';
import type { GqlTransactionStatusesNames } from 'fuels';
import { api } from '~/systems/Core/utils/api';
import { QUERY_KEYS } from '~/systems/Core/utils/queryKeys';

interface UseTransactionStatusParams {
  txId: string | undefined;
}

interface UseTransactionStatusResponse {
  id: string;
  isStatusSuccess: boolean;
  isStatusFailure: boolean;
  isStatusPending: boolean;
}

interface GraphQLError {
  message: string;
}

interface GQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

interface GQLTransactionStatusResponse {
  transaction: {
    id: string;
    status: {
      __typename: GqlTransactionStatusesNames;
    };
  };
}

// Refetch frequency while user is waiting for the transaction confirmation
const REFETCH_INTERVAL = 2000; // 2s

const queryFn = async ({
  txId = '',
}: UseTransactionStatusParams): Promise<GQLTransactionStatusResponse> => {
  const query = `
    query getTransactionStatus {
      transaction(
        id: "${txId}"
      ) {
        id
        status {
          __typename
        }
      }
    }
  `;

  const result: GQLResponse<GQLTransactionStatusResponse> = await api.post(
    FUEL_CHAIN.providerUrl,
    {
      query,
      operationName: 'getTransactionStatus',
    },
    {
      cache: 'no-store',
    },
  );

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  if (result.data) {
    return result.data;
  }

  // Fallback to the default status
  const fallback: GQLTransactionStatusResponse = {
    transaction: {
      id: txId,
      status: {
        __typename: 'SubmittedStatus',
      },
    },
  };

  return fallback;
};

const select = (
  data: GQLTransactionStatusResponse,
): UseTransactionStatusResponse => {
  const { transaction } = data;
  const status = transaction.status.__typename;

  return {
    id: transaction.id,
    isStatusSuccess: status === 'SuccessStatus',
    isStatusFailure: ['FailureStatus', 'SqueezedOutStatus'].includes(status),
    isStatusPending: status === 'SubmittedStatus',
  };
};

const refetchInterval = (
  query: Query<
    GQLTransactionStatusResponse,
    Error,
    GQLTransactionStatusResponse,
    QueryKey
  >,
): number | false => {
  const data = query.state.data;

  // If the transaction status has already changed, let's stop the interval
  if (
    data?.transaction?.status?.__typename &&
    data.transaction.status.__typename !== 'SubmittedStatus'
  ) {
    return false;
  }

  return REFETCH_INTERVAL;
};

export const useTransactionStatus = ({ txId }: UseTransactionStatusParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.transactionStatus(txId),
    queryFn: () => queryFn({ txId }),
    select,
    enabled: !!txId,
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval,
  });
};

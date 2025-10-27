import type { QueryClient, QueryKey } from '@tanstack/react-query';

export const invalidateQueries = (
  queryClient: QueryClient,
  queries: Array<QueryKey>,
) => {
  for (const queryKey of queries) {
    queryClient.invalidateQueries({ queryKey });
  }
};

import type { ReactNode } from 'react';

import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { type OmitKeyof, QueryClient, isServer } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  type PersistQueryClientOptions,
  PersistQueryClientProvider,
} from '@tanstack/react-query-persist-client';

const FATAL_ETH_ERRORS = ['revert', 'Missing or invalid parameters'];

type ReactQueryProviderProps = {
  children: ReactNode;
};

function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // For persist to work properly, you probably want to pass QueryClient
        // a gcTime value to override the default during hydration
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
        retry: (count, error) => {
          return (
            !FATAL_ETH_ERRORS.some((errorMessage) =>
              error?.message?.includes(errorMessage),
            ) && count < 3
          );
        },
        retryDelay: 500,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  }

  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

const persister = createSyncStoragePersister({
  storage: isServer ? undefined : window.localStorage,
  key: 'fuel.explorer.store',
  serialize: (data: unknown) => {
    return JSON.stringify(data, (_key, value) => {
      if (typeof value === 'bigint') {
        return value.toString();
      }

      return value;
    });
  },
  throttleTime: 500,
});

const persistOptions: OmitKeyof<PersistQueryClientOptions, 'queryClient'> = {
  persister,
  buster: '',
  dehydrateOptions: {
    shouldDehydrateQuery: (query) => {
      const isSuccess = query.state.status === 'success';
      return (
        isSuccess &&
        // Stale time infinity will cause queries to be frozen
        (query.isStaleByTime(Number.POSITIVE_INFINITY) ||
          query.meta?.persist === true) &&
        query.meta?.persist !== false
      );
    },
  },
};

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={persistOptions}
    >
      {children}

      <ReactQueryDevtools buttonPosition="bottom-right" initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
}

import { useQuery } from '@tanstack/react-query';
import { ETH_CHAIN_NAME } from 'app-commons';
import type { Project } from '~/types/ecosystem';
import { ApiService, queryKeys } from '../services';

// Transaction hooks
// export const useTransaction = (txId: string) => {
//   return useQuery({
//     queryKey: queryKeys.transactions.detail(txId),
//     queryFn: () => sdk.transactionDetails({ id: txId }),
//     enabled: !!txId,
//   });
// };

// export const useTransactions = (params?: {
//   first?: number;
//   after?: string;
// }) => {
//   return useQuery({
//     queryKey: queryKeys.transactions.list(params || {}),
//     queryFn: () =>
//       sdk.recentTransactions({
//         first: params?.first || 10,
//         after: params?.after,
//       }),
//   });
// };

// // Block hooks
// export const useBlock = (blockId: string) => {
//   return useQuery({
//     queryKey: queryKeys.blocks.detail(blockId),
//     queryFn: () => {
//       // Determine if blockId is a height (number) or block hash
//       const isBlockHeight = !Number.isNaN(Number(blockId));
//       return isBlockHeight
//         ? sdk.block({ height: blockId })
//         : sdk.block({ id: blockId });
//     },
//     enabled: !!blockId,
//   });
// };

// export const useBlocks = (params?: { first?: number; after?: string }) => {
//   return useQuery({
//     queryKey: queryKeys.blocks.list(params || {}),
//     queryFn: () =>
//       sdk.blocks({
//         first: params?.first || 10,
//         after: params?.after,
//       }),
//   });
// };

// export const useBlockTransactions = (
//   blockId: string,
//   params?: { first?: number; after?: string },
// ) => {
//   return useQuery({
//     queryKey: [
//       ...queryKeys.blocks.detail(blockId),
//       'transactions',
//       params || {},
//     ],
//     queryFn: () =>
//       sdk.transactionsByBlockId({
//         blockId,
//         first: params?.first || 10,
//         after: params?.after,
//       }),
//     enabled: !!blockId,
//   });
// };

// Statistics hooks
// export const useStatistics = () => {
//   return useQuery({
//     queryKey: queryKeys.statistics.general(),
//     queryFn: () => sdk.statistics(),
//     staleTime: 1000 * 30, // 30 seconds
//   });
// };

// export const useTPS = () => {
//   return useQuery({
//     queryKey: queryKeys.statistics.tps(),
//     queryFn: () => sdk.tps(),
//     staleTime: 1000 * 10, // 10 seconds
//     refetchInterval: 1000 * 10, // Auto-refresh every 10 seconds
//   });
// };

// // Dashboard hooks
// export const useBlocksDashboard = () => {
//   return useQuery({
//     queryKey: queryKeys.blocks.dashboard(),
//     queryFn: () => sdk.getBlocksDashboard(),
//     staleTime: 1000 * 30, // 30 seconds
//   });
// };

// // Asset hooks
// export const useAsset = (assetId: string) => {
//   return useQuery({
//     queryKey: queryKeys.assets.detail(assetId),
//     queryFn: () => sdk.asset({ assetId }),
//     enabled: !!assetId,
//     staleTime: 1000 * 60 * 10, // 10 minutes (assets change rarely)
//   });
// };

// Ecosystem hooks
// export const useEcosystemProjects = () => {
//   return useQuery({
//     queryKey: queryKeys.ecosystem.projects(),
//     queryFn: () =>
//       fetch(import.meta.env.VITE_ECOSYSTEM_PROJECTS_URL).then((res) =>
//         res.json(),
//       ),
//     staleTime: 1000 * 60 * 60, // 1 hour (relatively static data)
//   });
// };

// export const useExchangeInfo = () => {
//   return useQuery({
//     queryKey: queryKeys.ecosystem.exchange(),
//     queryFn: () =>
//       fetch(
//         'https://api.coingecko.com/api/v3/simple/price?ids=fuel&vs_currencies=usd',
//       ).then((res) => res.json()),
//     staleTime: 1000 * 60 * 5, // 5 minutes
//   });
// };

// // Predicate hooks
// export const usePredicate = (address: string) => {
//   return useQuery({
//     queryKey: queryKeys.predicate(address),
//     queryFn: () => ApiService.getPredicate(address),
//     enabled: !!address,
//     staleTime: 1000 * 60 * 10, // 10 minutes
//   });
// };

export const usePredicateMetadata = (bytecode: string | null) => {
  return useQuery({
    queryKey: ['predicate', 'metadata', bytecode],
    // Metadata by bytecode not implemented yet; return null to avoid UI break
    queryFn: async () => null as any,
    enabled: !!bytecode,
    staleTime: 1000 * 60 * 10,
  });
};

// // Infinite query hooks for pagination
// export const useInfiniteTransactions = () => {
//   return useInfiniteQuery({
//     queryKey: queryKeys.transactions.lists(),
//     queryFn: ({ pageParam = undefined }) =>
//       sdk.recentTransactions({
//         first: 10,
//         after: pageParam,
//       }),
//     getNextPageParam: (lastPage) =>
//       lastPage?.data?.transactions?.pageInfo?.hasNextPage
//         ? lastPage.data.transactions.pageInfo.endCursor
//         : undefined,
//     initialPageParam: undefined as string | undefined,
//   });
// };

// export const useInfiniteBlocks = () => {
//   return useInfiniteQuery({
//     queryKey: queryKeys.blocks.lists(),
//     queryFn: ({ pageParam = undefined }) =>
//       sdk.blocks({
//         first: 10,
//         after: pageParam,
//       }),
//     getNextPageParam: (lastPage) =>
//       lastPage?.data?.blocks?.pageInfo?.hasNextPage
//         ? lastPage.data.blocks.pageInfo.endCursor
//         : undefined,
//     initialPageParam: undefined as string | undefined,
//   });
// };

// Account hooks
export const useAccountBalances = (address: string) => {
  return useQuery({
    queryKey: queryKeys.accounts.balances(address),
    queryFn: () => ApiService.getAccountBalances(address),
    enabled: !!address,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useAccountPredicate = (address: string) => {
  return useQuery({
    queryKey: queryKeys.accounts.detail(address),
    queryFn: () => ApiService.getAccountPredicate(address),
    enabled: !!address,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useAccountTransactions = (
  address: string,
  params?: { cursor?: string; direction?: 'after' | 'before' },
) => {
  return useQuery({
    queryKey: queryKeys.accounts.transactions(address, params),
    queryFn: () => ApiService.getAccountTransactions(address, params),
    enabled: !!address,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

// Contract hooks
export const useContract = (contractId: string) => {
  return useQuery({
    queryKey: queryKeys.contracts.detail(contractId),
    queryFn: () => ApiService.getContract(contractId),
    enabled: !!contractId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useContractBalances = (contractId: string) => {
  return useQuery({
    queryKey: queryKeys.contracts.balances(contractId),
    queryFn: () => ApiService.getContractBalances(contractId),
    enabled: !!contractId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useContractTransactions = (
  contractId: string,
  params?: { cursor?: string; direction?: 'after' | 'before' },
) => {
  return useQuery({
    queryKey: queryKeys.contracts.transactions(contractId, params),
    queryFn: () => ApiService.getContractTransactions(contractId, params),
    enabled: !!contractId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useContractMintedAssets = (
  contractId: string,
  params?: { cursor?: string; direction?: 'after' | 'before' },
) => {
  return useQuery({
    queryKey: [
      ...queryKeys.contracts.detail(contractId),
      'minted-assets',
      params,
    ],
    queryFn: () => ApiService.getContractMintedAssets(contractId, params),
    enabled: !!contractId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Search hook
export const useSearch = (query: string) => {
  return useQuery({
    queryKey: queryKeys.search.query(query),
    queryFn: () => ApiService.search(query),
    enabled: !!query && query.length > 2, // Only search if query has 3+ characters
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useContractMetadata = (address: string | null = '') => {
  return useQuery({
    queryKey: ['contract', 'metadata', address],
    queryFn: async () => {
      if (!address) {
        return { project: null, metadata: null };
      }

      const ECOSYSTEM_PROJECTS_URL = import.meta.env
        .VITE_ECOSYSTEM_PROJECTS_URL;

      if (!ECOSYSTEM_PROJECTS_URL) {
        return { project: null, metadata: null };
      }

      try {
        const projects = (await (
          await fetch(ECOSYSTEM_PROJECTS_URL, {})
        ).json()) as Array<Project>;

        for (const project of projects) {
          const contractsByNetwork = project.contracts?.[ETH_CHAIN_NAME];

          if (contractsByNetwork) {
            const metadata = contractsByNetwork.find(
              (c: { id: string }) =>
                c.id.toLowerCase() === address.toLowerCase(),
            );
            if (metadata) {
              return { project, metadata };
            }
          }
        }

        return { project: null, metadata: null };
      } catch (error) {
        console.error('useContractMetadata: Error fetching projects:', error);
        return { project: null, metadata: null };
      }
    },
    enabled: !!address,
    staleTime: Number.POSITIVE_INFINITY,
  });
};

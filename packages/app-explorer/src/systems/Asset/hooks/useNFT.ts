import { useQuery } from '@tanstack/react-query';
import { ApiError, api } from '~/systems/Core/utils/api';
import { QUERY_KEYS } from '~/systems/Core/utils/queryKeys';

type UseNFTData = {
  name: string | null;
  symbol: string | null;
  nft: boolean;
  // A 404 or an NFT still missing its metadata may change on the next ask.
  final: boolean;
};

type UseNFTParams = {
  contractId: string | null | undefined;
  assetId: string | null | undefined;
};

type AssetBody = {
  name?: string;
  symbol?: string;
  collection?: string;
  isNFT?: boolean;
  metadata?: unknown;
};

const NOT_NFT: Omit<UseNFTData, 'final'> = {
  name: null,
  symbol: null,
  nft: false,
};

const queryFn = async (assetId: string): Promise<UseNFTData> => {
  try {
    const asset = await api.get<AssetBody>(
      `${import.meta.env.VITE_FUEL_INDEXER_API}/assets/${assetId}`,
    );
    if (!asset.isNFT) return { ...NOT_NFT, final: true };
    return {
      name: asset.name ?? null,
      // Collection NFTs often have a name and collection but no symbol.
      symbol: asset.symbol ?? asset.collection ?? asset.name ?? null,
      nft: true,
      final: !asset.collection || asset.metadata != null,
    };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return { ...NOT_NFT, final: false };
    }
    throw error;
  }
};

export const useNFT = ({ contractId = '', assetId = '' }: UseNFTParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.nft(contractId, assetId),
    queryFn: () => queryFn(assetId as string),
    enabled: !!contractId && !!assetId,
    staleTime: (query) =>
      query.state.data?.final ? Number.POSITIVE_INFINITY : 0,
  });
};

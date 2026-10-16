import { useQuery } from '@tanstack/react-query';
import { ApiError, api } from '~/systems/Core/utils/api';
import { QUERY_KEYS } from '~/systems/Core/utils/queryKeys';

type UseNFTData = {
  name: string | null;
  symbol: string | null;
  nft: boolean;
};

type UseNFTParams = {
  contractId: string | null | undefined;
  assetId: string | null | undefined;
};

type AssetBody = {
  name?: string;
  symbol?: string;
  isNFT?: boolean;
};

const NOT_NFT: UseNFTData = { name: null, symbol: null, nft: false };

const queryFn = async (assetId: string): Promise<UseNFTData> => {
  try {
    const asset = await api.get<AssetBody>(
      `${import.meta.env.VITE_FUEL_INDEXER_API}/assets/${assetId}`,
    );
    if (!asset.isNFT) return NOT_NFT;
    return {
      name: asset.name ?? null,
      symbol: asset.symbol ?? null,
      nft: true,
    };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return NOT_NFT;
    throw error;
  }
};

export const useNFT = ({ contractId = '', assetId = '' }: UseNFTParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.nft(contractId, assetId),
    queryFn: () => queryFn(assetId as string),
    enabled: !!contractId && !!assetId,
    staleTime: Number.POSITIVE_INFINITY,
  });
};

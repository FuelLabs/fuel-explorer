import { useQuery } from '@tanstack/react-query';
import { relativeUrl } from 'app-commons';
import { api } from '~/systems/Core/utils/api';
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

const queryFn = async ({
  contractId,
  assetId,
}: UseNFTParams): Promise<UseNFTData> => {
  const data = await api.get<UseNFTData>(
    relativeUrl(`/api/nft/${contractId}/${assetId}`),
  );
  return data;
};

export const useNFT = ({ contractId = '', assetId = '' }: UseNFTParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.nft(contractId, assetId),
    queryFn: () => queryFn({ contractId, assetId }),
    enabled: !!contractId && !!assetId,
    staleTime: Number.POSITIVE_INFINITY,
  });
};

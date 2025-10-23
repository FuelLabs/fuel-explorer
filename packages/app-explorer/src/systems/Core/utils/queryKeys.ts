import type { QueryKey } from '@tanstack/react-query';

export const QUERY_KEYS = {
  base: ['fuel', 'explorer'] as QueryKey,
  verifiedAssets: ['fuel', 'explorer', 'verifiedAssets'] as QueryKey,
  nft: (contractId: string | null, assetId: string | null): QueryKey => {
    if (contractId && assetId) {
      return QUERY_KEYS.base.concat(
        'nft',
        contractId.toLowerCase(),
        assetId.toLowerCase(),
      );
    }

    return QUERY_KEYS.base.concat('nft');
  },
  contractMetadata: (address: string | null): QueryKey => {
    if (address) {
      return QUERY_KEYS.base.concat(
        'contract',
        'metadata',
        address.toLowerCase(),
      );
    }

    return QUERY_KEYS.base.concat('contract', 'metadata');
  },
  transactionStatus: (txId: string | undefined = ''): QueryKey => {
    return QUERY_KEYS.base.concat('transaction', 'status', txId.toLowerCase());
  },
};

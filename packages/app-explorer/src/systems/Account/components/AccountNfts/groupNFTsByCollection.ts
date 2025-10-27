export const UNKNOWN_COLLECTION_TITLE = 'Others';

export type Balance = {
  amount: string;
  assetId: string;
  owner: string;
  name?: string | null;
  symbol?: string | null;
  icon?: string | null;
  decimals?: string | null;
  suspicious?: boolean | null;
  contractId?: string | null;

  metadata?: any;
  totalSupply?: string | null;
  collection?: string | null;
};

interface NFT {
  assetId: string;
  name: string | undefined;
  image: string | undefined;
}

interface Collection {
  name: string;
  nfts: NFT[];
}

export function isNFT(balance: Balance) {
  return Number(balance.decimals) === 0 && balance.totalSupply === '1';
}

export const groupNFTsByCollection = (balances: Balance[]): Collection[] => {
  const grouped: Collection[] = balances
    // Filter only NFTs
    .filter(isNFT)

    // Group balances by collection name
    .reduce((acc, balance) => {
      const name = balance.collection || UNKNOWN_COLLECTION_TITLE;
      let collection = acc.find((item) => item.name === name);

      if (!collection) {
        collection = { name, nfts: [] };
        acc.push(collection);
      }

      collection.nfts.push({
        assetId: balance.assetId,
        name: balance?.metadata?.name,
        image: balance.metadata?.image,
      });

      return acc;
    }, [] as Collection[])

    // Sort NFTs by name
    .map((collection) => {
      return {
        name: collection.name,
        nfts: collection.nfts.sort((a, b) => {
          if (a.name && b.name) {
            return a.name.localeCompare(b.name, undefined, {
              numeric: true,
              sensitivity: 'base',
            });
          }

          return 0;
        }),
      };
    })

    // Move "Others" to the bottom
    .sort((a, b) => {
      if (a.name === UNKNOWN_COLLECTION_TITLE) return 1;
      if (b.name === UNKNOWN_COLLECTION_TITLE) return -1;
      return 0;
    });

  return grouped;
};

import { Copyable, Grid, HStack, VStack } from '@fuels/ui';
import { type CSSProperties, useMemo } from 'react';
import { EmptyNfts } from '~/systems/Core/components/EmptyBlocks/EmptyNfts';
import { shortAddress } from '~portal/systems/Core';
import { NFTImage } from './NFTImage';
import { type Balance, groupNFTsByCollection } from './groupNFTsByCollection';

export type AccountNftsProps = {
  balances?: Balance[];
};

export function AccountNfts({ balances = [] }: AccountNftsProps) {
  const collections = useMemo(() => {
    return groupNFTsByCollection(balances);
  }, [balances]);

  if (collections.length === 0) {
    return <EmptyNfts entity="account" />;
  }

  return (
    <VStack className="min-h-[45vh]">
      {collections.map((collection) => {
        return (
          <div key={collection.name} className="mb-10">
            <HStack gap="2" className="mb-5 items-baseline">
              <h2 className="fuel-label m-0">{collection.name}</h2>
              <span className="text-[13px] text-[var(--fuel-element-low-em)]">
                {collection.nfts.length}
              </span>
            </HStack>
            <Grid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {collection.nfts.map((nft, index) => {
                return (
                  <VStack
                    key={nft.assetId}
                    align="center"
                    className="fuel-rise"
                    style={
                      {
                        '--fuel-enter-delay': `${Math.min(index, 10) * 30}ms`,
                      } as CSSProperties
                    }
                  >
                    <NFTImage assetId={nft.assetId} image={nft.image} />
                    <HStack justify="center" align="center">
                      <span className="text-[14px] text-heading">
                        {nft.name || shortAddress(nft.assetId)}
                      </span>
                      <Copyable value={nft.assetId} iconSize={16} />
                    </HStack>
                  </VStack>
                );
              })}
            </Grid>
          </div>
        );
      })}
    </VStack>
  );
}

import { Badge, Copyable, Grid, HStack, Text, VStack } from '@fuels/ui';
import { useMemo } from 'react';
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
            <HStack gap="2" className="mb-5">
              <Text className="font-bold text-md text-primary font-mono">
                {collection.name}
              </Text>
              <Badge variant="ghost" color="gray" size="2">
                {collection.nfts.length}
              </Badge>
            </HStack>
            <Grid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {collection.nfts.map((nft) => {
                return (
                  <VStack key={nft.assetId} align="center">
                    <NFTImage assetId={nft.assetId} image={nft.image} />
                    <HStack justify="center" align="center">
                      <Text>{nft.name || shortAddress(nft.assetId)}</Text>
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

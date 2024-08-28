'use client';

import { HStack, Heading, Theme, VStack } from '@fuels/ui';
import { Grid, LineGraph } from '@fuels/ui';
import { dummyData } from '../../data/dummyData';
import NFTHashItem from '../NFTHashItem/NFTHashItem';
import { NFTsHeader } from '../NFTsHeader/NFTsHeader';

export function Hero() {
  return (
    <Theme>
      <VStack className="gap-2">
        <HStack>
          <p className="text-[#9f9f9f] text-xs">Home</p>
          <p className=" text-xs">{'>'}</p>
          <p className=" text-xs">DeGods NFT Collection</p>
        </HStack>

        <VStack className="gap-2 my-5">
          <HStack>
            <img
              src="https://s3-alpha-sig.figma.com/img/ce9b/a7be/e0093146aeed87ea99217eae3e967e34?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U7xNl3e4fA0KA5XYrVMp8dYnu07YNc66pcoWDmr4HBJs~xNP~9y7vrvkdp-ifAQLrSUvKMGpk8q-rOWdOPI6ysQq7WEOHcXgKTe8Pe3n48Nx8Lg~8YlTRVcafn3~eqV1sF-t398fKYsj2Ns0Vc9Yh2eWEdmsxHRmuq5ev2Htt0w4ms1XwhQklkhzfo9kOvtPR-vNuYnbQp2rIR7vvnzASxVLib1drz2FEvMXnXbWReZq-CDWormFu59H-XPpVM50NCLVA7UqS2b~mO3uXQbEskgpYOetnPeUQxJh8uZk0yH7tFXuH92A29RlJHtXYRavz0kYRRagMvESOs~60dx6OQ__"
              alt="token_logo"
              className="w-[4rem] rounded"
            />
            <Heading as="h1" className="m-0 p-0 font-mono">
              DeGods
            </Heading>
          </HStack>
          <NFTHashItem
            hashAddress="sdasjasasnajsnaksnajsnsjansjansasnjansa"
            width="100px"
          />
          <p className="text-gray-10 text-sm w-[25.5rem] mt-3">
            A collection of degenerates, punks, and misfits. Gods of the
            metaverse & masters of our own universe.
          </p>
        </VStack>
        <div className="w-full flex flex-wrap gap-3">
          <NFTsHeader titleProp="Items" valuesProp="5,146" timeProp="" />
          <NFTsHeader
            titleProp="Total Volume"
            valuesProp="191,454 ETH"
            timeProp="Last 1 Hour"
          />
          <NFTsHeader
            titleProp="Floor Price"
            valuesProp="1.493 ETH"
            timeProp=""
          />
          <NFTsHeader
            titleProp="Unique Holders"
            valuesProp="3,299"
            timeProp=""
          />
        </div>

        <Grid className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-5">
          <LineGraph dataProp={dummyData} titleProp={'New Block'} />
          <LineGraph dataProp={dummyData} titleProp={'Avg. Block Reward'} />
        </Grid>
      </VStack>
    </Theme>
  );
}

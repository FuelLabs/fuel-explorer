import { HStack, RoundedContainer, VStack } from '@fuels/ui';

interface LatestBlockProps {
  blockNo: string;
  blockHash: string;
  totalFeeInUsd: string;
}

const LatestBlock = ({
  blockNo,
  blockHash,
  totalFeeInUsd,
}: LatestBlockProps) => {
  return (
    <RoundedContainer className="py-4 px-5 space-y-[24px] h-full bg-light-gradient dark:bg-dark-gradient">
      <div className="space-y-[16px]">
        <div className="flex items-center justify-between">
          <div className="text-[15px] leading-[24px] text-heading font-semibold group relative">
            <div className=" relative group">
              <div className="flex items-center group">
                <span className="">Latest Block</span>
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-[27px] lg:text-[32px] leading-[36px] text-heading font-bold">
          {blockNo}
        </h2>
      </div>

      <HStack className="flex items-start justify-between w-full">
        <VStack>
          <p> </p>
          <p className="block w-full max-w-[144px] truncate line-clamp-1 text-[13px] leading-[20px] text-muted">
            {blockHash}
          </p>
        </VStack>
        <VStack gap={'0'} className="items-end">
          <p className="line-clamp-1 text-[13px] leading-[20px]">
            Block Reward
          </p>
          <p className="line-clamp-1 text-[13px] leading-[20px] text-muted">
            {totalFeeInUsd || '$0'}
          </p>
        </VStack>
      </HStack>
    </RoundedContainer>
  );
};
export default LatestBlock;

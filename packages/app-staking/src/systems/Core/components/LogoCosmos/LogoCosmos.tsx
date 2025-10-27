import { Flex } from '@fuels/ui';

export interface LogoCosmosProps {
  alt?: string;
}

export const LogoCosmos = ({ alt = 'Cosmos Logo' }: LogoCosmosProps) => {
  return (
    <Flex className="w-[24px] h-[24px] bg-[#2e3148] rounded-full items-center justify-center">
      <img src="/assets/cosmos.svg" alt={alt} className="w-[16px] h-[16px]" />
    </Flex>
  );
};

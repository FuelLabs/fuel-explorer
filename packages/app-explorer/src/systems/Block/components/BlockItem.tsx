import { Box, Copyable, HStack, Text, Tooltip, VStack } from '@fuels/ui';
import { DECIMAL_FUEL } from 'fuels';
import { useFormatBalance } from '~staking/systems/Core/hooks/useFormatBalance';

export interface BlockItemProps {
  blockId: string;
  totalFee: number;
}

export default function BlockItem({ blockId, totalFee }: BlockItemProps) {
  const { formatted, original } = useFormatBalance(
    BigInt(totalFee),
    DECIMAL_FUEL,
  );
  return (
    <VStack gap="1">
      <HStack>
        <Box>
          <Copyable
            value={blockId}
            className="font-mono font-semibold text-sm "
          >
            #{blockId}
          </Copyable>
        </Box>
      </HStack>
      <Tooltip content={`${original.display} ETH `}>
        <Text
          className="text-gray-10 text-xs text-ellipsis w-[7rem]"
          aria-label="Total fee"
        >
          {formatted.display} ETH
        </Text>
      </Tooltip>
    </VStack>
  );
}

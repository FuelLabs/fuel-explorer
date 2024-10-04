import { Box, Copyable, HStack, Text, VStack } from '@fuels/ui';
import Link from 'next/link';

export interface BlockItemProps {
  blockId: string;
  ethValue: string;
}

export default function BlockItem({ blockId, ethValue }: BlockItemProps) {
  return (
    <VStack gap="">
      <HStack gap={'0'}>
        <Box>
          <Copyable
            value={blockId}
            className="font-mono font-semibold text-sm whitespace-nowrap"
          >
            #{blockId}
          </Copyable>
        </Box>
      </HStack>
      <Link href={`/block/${blockId}/simple`}>
        <div className="flex sm:hidden items-center gap-0">
          {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="text-icon inline-flex items-center fuel-Icon"
            >
              <path d="M14 11h1a2 2 0 0 1 2 2v3a1.5 1.5 0 0 0 3 0v-7l-3 -3" />
              <path d="M4 20v-14a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v14" />
              <path d="M3 20l12 0" />
              <path d="M18 7v1a1 1 0 0 0 1 1h1" />
              <path d="M4 11l10 0" />
            </svg>
          }
          <Text className=" text-gray-10 text-xs text-ellipsis w-[7rem]">
            {ethValue} ETH
          </Text>
        </div>
      </Link>
    </VStack>
  );
}

'use client';
import { Heading, HStack, Button } from '@fuels/ui';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

type ComponentProps = {
  page: string;
};

export function TransactionsTitle({ page: current = '1' }: ComponentProps) {
  const page = Number(current);
  const hasPrev = page > 1;
  const hasNext = page < 10;
  const router = useRouter();
  return (
    <Heading
      as="h2"
      size="2"
      className="flex justify-between items-center mb-10"
    >
      Recent Transactions
      <HStack gap="1">
        <Button
          size="2"
          variant="ghost"
          color="gray"
          disabled={!hasPrev}
          onClick={() => router.push(`/transactions/${page - 1}`)}
        >
          <IconArrowLeft size={14} />
        </Button>
        <Button size="2" variant="ghost" color="gray" className="bg-gray-3">
          Page {page}
        </Button>
        <Button
          size="2"
          variant="ghost"
          color="gray"
          disabled={!hasNext}
          onClick={() => router.push(`/transactions/${page + 1}`)}
        >
          <IconArrowRight size={14} />
        </Button>
      </HStack>
    </Heading>
  );
}

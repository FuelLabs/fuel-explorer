'use client';
import { useRouter } from 'next/navigation';
import { useWindowSize } from 'react-use';
import { PageTitle } from '~/systems/Core/components/PageTitle/PageTitle';
import { Pagination } from '~/systems/Core/components/Pagination/Pagination';

type ComponentProps = {
  page: string;
};

export function TransactionsTitle({ page: current = '1' }: ComponentProps) {
  const page = Number(current);
  const { width } = useWindowSize();
  const router = useRouter();

  return (
    <PageTitle
      rightElement={
        width >= 768 && (
          <Pagination
            page={page}
            onChange={(page) => router.push(`/transactions/${page}`)}
          />
        )
      }
    >
      Recent Transactions
    </PageTitle>
  );
}

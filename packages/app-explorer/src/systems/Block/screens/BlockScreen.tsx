import { VStack } from '@fuels/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { GQLBlocksQuery } from '@fuel-explorer/graphql';
import { getBlocks } from '../actions/get-blocks';
import BlocksTable from '../components/BlocksTable';
import { Hero } from '../components/Hero';

export const BlocksScreen = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = useState<GQLBlocksQuery['blocks'] | undefined>(
    undefined,
  );
  const [dir, setDir] = useState<'after' | 'before'>('after');
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCursor, setCurrentCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  const fetchBlockData = async (
    cursor: string | null = null,
    dir: 'after' | 'before' = 'after',
  ) => {
    setLoading(true);
    try {
      const result = await getBlocks({ cursor, dir });
      const blockData = result.blocks;
      setData(blockData);

      if (totalPages === null && blockData?.pageInfo.endCursor) {
        const endCursor = Number(blockData.pageInfo.endCursor);
        setTotalPages(Math.ceil(endCursor / limit));
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePageChanged = (newPageNumber: number) => {
    if (data) {
      const newDir = newPageNumber > currentPage ? 'before' : 'after';
      let newCursor: string | null = null;
      setDir(newDir);

      if (newDir === 'before' && data.pageInfo.endCursor) {
        newCursor = data.pageInfo.endCursor;
      } else if (newDir === 'after' && data.pageInfo.startCursor) {
        newCursor = data.pageInfo.startCursor;
      }

      setCurrentPage(newPageNumber);
      setCurrentCursor(newCursor);
      router.push(`/blocks?page=${newPageNumber}&cursor=${newCursor}`);
    }
  };

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1');
    const cursor = searchParams.get('cursor') || null;

    setCurrentPage(page);
    setCurrentCursor(cursor);
    setDir(page > currentPage ? 'after' : 'before');
  }, [searchParams]);

  useEffect(() => {
    fetchBlockData(currentCursor, dir);
  }, [currentCursor, dir]);

  return (
    <VStack>
      <Hero />
      {loading ? (
        <p>Loading blocks...</p>
      ) : (
        data && (
          <BlocksTable
            blocks={data}
            onPageChanged={handlePageChanged}
            pageCount={totalPages || 1}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )
      )}
    </VStack>
  );
};

import { VStack } from '@fuels/ui';
import { useEffect, useState } from 'react';

import { GQLBlocksQuery } from '@fuel-explorer/graphql';
import { getBlocks } from '../actions/get-blocks';
import BlocksTable from '../components/BlocksTable';
import { Hero } from '../components/Hero';

export const BlocksScreen = () => {
  const [data, setData] = useState<GQLBlocksQuery['blocks'] | undefined>(
    undefined,
  );
  const [dir, setDir] = useState<'after' | 'before'>('after');
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCursor, setCurrentCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  const calculateTotalPages = () => {
    if (data?.pageInfo.endCursor) {
      const endCursor = Number(data.pageInfo.endCursor);
      return Math.ceil(endCursor / limit);
    }
    return 1;
  };

  useEffect(() => {
    if (data) {
      const totalPageCount = calculateTotalPages();
      setTotalPages(totalPageCount);
    }
  }, [data]);

  const fetchBlockData = async (
    cursor: string | null = null,
    dir: 'after' | 'before' = 'after',
  ) => {
    setLoading(true);
    try {
      const result = await getBlocks({ cursor, dir });
      const blockData = result.blocks;
      setData(blockData);
    } catch (err) {
      console.error('Error fetching block data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChanged = (newPageNumber: number) => {
    if (data) {
      const newDir = newPageNumber > currentPage ? 'before' : 'after';
      let newCursor: string | null = null;
      setDir(newDir);

      if (
        newPageNumber === currentPage + 1 ||
        newPageNumber === currentPage - 1
      ) {
        if (newDir === 'before' && data.pageInfo.endCursor) {
          newCursor = data.pageInfo.endCursor;
        } else if (newDir === 'after' && data.pageInfo.startCursor) {
          newCursor = data.pageInfo.startCursor;
        }
      } else {
        if (newDir === 'before' && data.pageInfo.endCursor) {
          newCursor = (
            +data.pageInfo.endCursor -
            (newPageNumber - currentPage) * limit
          ).toString();
        } else if (newDir === 'after' && data.pageInfo.startCursor) {
          newCursor = (
            +data.pageInfo.startCursor +
            (currentPage - newPageNumber) * limit
          ).toString();
        }
      }

      setCurrentPage(newPageNumber);
      setCurrentCursor(newCursor);
    }
  };

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
            pageCount={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )
      )}
    </VStack>
  );
};

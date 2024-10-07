import { VStack } from '@fuels/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { GQLBlocksQuery } from '@fuel-explorer/graphql';
import { LoadingBox, LoadingWrapper } from '@fuels/ui';
import { getBlocks } from '../actions/get-blocks';
import BlocksTable from '../components/BlocksTable';
import { Hero } from '../components/Hero';

export const BlocksScreen = () => {
  const router = useRouter();
  const _searchParams = useSearchParams();

  const [data, setData] = useState<GQLBlocksQuery['blocks'] | undefined>(
    undefined,
  );
  const [dir, setDir] = useState<'after' | 'before'>('after');
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCursor, setCurrentCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
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
      if (newPageNumber === 1) {
        router.push('/blocks', { scroll: false });
        return;
      }
      router.push(`/blocks?page=${newPageNumber}&cursor=${newCursor}`, {
        scroll: false,
      });
    }
  };

  useEffect(() => {
    fetchBlockData(currentCursor, dir);
  }, [currentCursor, dir]);

  return (
    <VStack p={'1'}>
      <Hero />
      <LoadingWrapper
        isLoading={loading}
        loadingEl={
          <VStack gap={'20px'}>
            {[...Array(10)].map((_, index) => (
              <LoadingBox
                key={index}
                className="w-full  h-[3.5rem]  rounded-lg"
              />
            ))}
            <LoadingBox className="w-[250px]  h-[2.9rem]  rounded-lg ml-auto" />
          </VStack>
        }
        regularEl={
          data && (
            <>
              <BlocksTable
                blocks={data}
                onPageChanged={handlePageChanged}
                pageCount={totalPages || 1}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          )
        }
      />
    </VStack>
  );
};

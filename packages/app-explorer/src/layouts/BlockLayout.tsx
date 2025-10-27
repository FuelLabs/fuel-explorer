import { useQuery } from '@tanstack/react-query';
import type React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { BlockHeader } from '~/systems/Block/components/BlockHeader';
import { ApiService } from '../services/api';

type BlockRouteParams = {
  id: string;
};

const BlockLayout: React.FC = () => {
  const { id } = useParams<BlockRouteParams>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['block', id],
    queryFn: () => ApiService.fetchBlock(id),
    enabled: !!id,
    staleTime: 0,
  });

  if (error) {
    throw error;
  }

  return (
    <>
      <BlockHeader id={data?.block?.id} isLoading={isLoading} />
      <Outlet />
    </>
  );
};

export default BlockLayout;

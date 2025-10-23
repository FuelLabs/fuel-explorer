import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import type { Pagination } from '~staking/systems/Core/types/pagination';
import type { Validator } from '~staking/systems/Staking/types/validators';
import { cosmosApi } from '../../Core/utils/api';
import { QUERY_KEYS } from '../../Core/utils/query';
import type { ServiceOptions } from './types';

export type ReturnProps = {
  query: UseQueryResult<ValidatorsData, Error>;
  pagination: Pagination;
};

export type ValidatorsData = {
  validators: Array<Validator>;
  pagination: {
    next_key: string | null;
    previous_key: string | null;
    total: string;
  };
};

const queryFn = async ({ pageParam }: { pageParam: string | undefined }) => {
  return await cosmosApi.get<ValidatorsData>(
    `/cosmos/staking/v1beta1/validators?${
      pageParam ? `pagination.key=${encodeURIComponent(pageParam)}&` : ''
    }pagination.limit=1000`,
  );
};

export const useValidators = (
  options?: Omit<
    ServiceOptions<ValidatorsData, Error, ValidatorsData>,
    'select'
  >,
): ReturnProps => {
  // Maps the previous key of a given key
  const [previousKeys, setPreviousKeys] = useState<Record<string, string>>({});
  const [page, setPage] = useState<string | undefined>();
  const previousPage = page && previousKeys[page];

  const query = useQuery({
    queryKey: QUERY_KEYS.validators(page),
    queryFn: () => queryFn({ pageParam: page }),
    ...options,
  });

  const onFetchNextPage = useCallback(() => {
    if (query.data?.pagination.next_key) {
      page &&
        setPreviousKeys((prev) => ({
          ...prev,
          [query.data.pagination.next_key as string]: page,
        }));
      setPage(query.data?.pagination.next_key);
    }
  }, [query.data, page]);

  const onFetchPreviousPage = useCallback(() => {
    if (previousPage) {
      setPage(previousPage);
      return;
    }
    // Return to initial page
    if (page) setPage(undefined);
  }, [previousPage, page]);
  const data = query.data?.validators.filter(
    (validator) => validator.description.moniker !== 'polkachu.com',
  );
  return {
    query: {
      ...query,
      data: {
        ...query.data,
        validators: data ?? [],
      },
    } as UseQueryResult<ValidatorsData, Error>,
    pagination: {
      fetchNextPage: onFetchNextPage,
      hasNextPage: !!query.data?.pagination.next_key,
      fetchPreviousPage: onFetchPreviousPage,
      // Page starts as undefined, hence if page is defined it means we're not at the initial page
      hasPreviousPage: !!page,
      isFetching: query.isFetching,
    },
  };
};

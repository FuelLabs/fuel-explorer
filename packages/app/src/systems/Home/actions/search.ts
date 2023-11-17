'use server';

import type { SearchResult } from '@fuel-explorer/graphql';
import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { sdk } from '~/systems/Core/utils/sdk';

const schema = z.object({
  query: z.string(),
});

export const search = act(schema, async ({ query }) => {
  const { data } = await sdk.searchQuery({ search: query }).catch((_) => {
    return { data: { search: null } };
  });
  console.log('in search', data.search);
  return data?.search as SearchResult;
});

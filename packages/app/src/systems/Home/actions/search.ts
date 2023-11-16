'use server';

import type { SearchResult } from '@fuel-explorer/graphql';
import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { sdk } from '~/systems/Core/utils/sdk';

const schema = z.object({
  query: z.string(),
});

export const search = act(schema, async ({ query }) => {
  console.log('in search');
  const { data } = await sdk.searchQuery({ search: query }).catch((_) => {
    return { data: { search: null } };
  });
  return data?.search as SearchResult;
});

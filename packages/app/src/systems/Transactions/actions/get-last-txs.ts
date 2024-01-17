'use server';

import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { sdk } from '~/systems/Core/utils/sdk';

const PER_PAGE = 10;

const schema = z.object({
  page: z.number().int().positive().optional(),
});

export const getLastTxs = act(schema, async ({ page = 1 }) => {
  const currentPage = Number(page);
  const toFetch = !page ? PER_PAGE : page * PER_PAGE;
  const { data } = await sdk.getLastTransactions({ last: toFetch });
  const list = data.transactions.edges;
  if (!page) return list;
  const startRange = (currentPage - 1) * PER_PAGE;
  const endRange = currentPage * PER_PAGE;
  return list.slice(startRange, endRange);
});

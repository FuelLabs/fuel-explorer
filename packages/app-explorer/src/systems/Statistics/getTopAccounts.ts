'use server';

import { z } from 'zod';
import { act } from '../../systems/Core/utils/act-server';
import { sdk } from '../../systems/Core/utils/sdk';

// Schema to validate inputs
const schema = z.object({
  sortBy: z.string().optional(), // Sorting criteria (balance, transaction_count, etc.)
  sortOrder: z.string().optional(), // asc or desc
  first: z.number().optional().nullable(), // Number of accounts to fetch, can be null
  cursor: z.string().optional().nullable(), // Pagination cursor
});

// Common function to fetch top accounts
async function fetchTopAccounts(
  sortBy = 'transaction_count', // Default to transaction_count
  sortOrder: 'asc' | 'desc' = 'desc', // Default to descending order
  first: number | null = null, // Allow null to fetch all records if no limit is provided
  cursor?: string | null, // Cursor for pagination (optional)
) {
  const queryParams: Record<string, any> = {
    sortBy,
    sortOrder,
    cursor,
  };

  // If `first` is provided and not null, add it to the query parameters
  if (first !== null) {
    queryParams.first = first;
  }

  const data = await sdk.paginatedAccounts(queryParams);

  // Handle case where no data is returned
  if (!data.data.paginatedAccounts.nodes.length) {
    return {
      accounts: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: null,
        endCursor: null,
      },
    };
  }

  const { nodes, pageInfo } = data.data.paginatedAccounts;

  const accounts = nodes.map((account: any) => ({
    id: account.id,
    account_id: account.account_id,
    balance: account.balance,
    transaction_count: account.transaction_count,
  }));

  return {
    accounts,
    pageInfo: {
      hasNextPage: pageInfo.hasNextPage,
      hasPreviousPage: pageInfo.hasPreviousPage,
      startCursor: pageInfo.startCursor,
      endCursor: pageInfo.endCursor,
    },
  };
}

export const getTopAccounts = act(schema, async (params) => {
  const sortBy = params.sortBy || 'transaction_count';
  const sortOrder = (params.sortOrder || 'desc') as 'asc' | 'desc';
  const first = params.first === null ? null : params.first || 10;
  const cursor = params.cursor || null;

  return fetchTopAccounts(sortBy, sortOrder, first, cursor);
});

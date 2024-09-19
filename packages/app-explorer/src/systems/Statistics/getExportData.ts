'use server';

import { z } from 'zod';
import { act } from '../../systems/Core/utils/act-server';
import { sdk } from '../../systems/Core/utils/sdk';

const schema = z.object({
  account: z.string().optional().nullable(),
  startDate: z.string(),
  endDate: z.string(),
});

export const getTransactionStats = act(
  schema,
  async ({ account, startDate, endDate }) => {
    if (!account) {
      throw new Error('Account is required');
    }

    // Prepare parameters for the GraphQL query
    const params = {
      account,
      startDate,
      endDate,
    };

    // Call the getTransactionsByAccountAndDate function from the sdk
    const data = await sdk.getTransactionsByAccountAndDate(params);

    // Check if any transactions are available
    if (!data.data.transactionsByAccountAndDate) {
      return [];
    }

    // Destructure transactions and return the raw data
    const transactions = data.data.transactionsByAccountAndDate;

    return transactions;
  },
);

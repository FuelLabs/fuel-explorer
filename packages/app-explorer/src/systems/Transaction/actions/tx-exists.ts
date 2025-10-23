'use server';

import type {} from '@fuel-explorer/graphql/sdk';
import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { parseAddressParam } from '~/systems/Core/utils/address';
import { fuelCoreSdk, sdk } from '~/systems/Core/utils/sdk';
import { gqlCore, gqlSdkTxExists } from '~/systems/Transaction/constants/tags';
import type {
  IndexedTransaction,
  PendingTransaction,
} from '~/systems/Transaction/types';

const schema = z.object({
  id: z.string().nullable(),
});

export const txExists = act(
  schema,
  async (input): Promise<PendingTransaction | IndexedTransaction> => {
    try {
      const id = parseAddressParam(input.id);

      const { data } = await sdk.transactionExists(
        { id },
        { tagName: gqlSdkTxExists, tagId: input.id?.toString() ?? '' },
      );

      if (!data.transaction) {
        // Go to fallback
        throw new Error('Transaction not found');
      }

      return { id: data.transaction.id, status: 'synced' };
    } catch (_) {
      if (!input.id) {
        return { id: '', status: 'synced' };
      }
      return await fuelCoreSdk
        .transaction(
          { id: parseAddressParam(input.id) },
          { tagName: gqlCore, tagId: input.id?.toString() ?? '' },
        )
        .then((data) =>
          data?.data?.transaction?.id
            ? ({
                id: data.data.transaction?.id,
                status: 'indexing',
              } as PendingTransaction)
            : { id: '', status: 'synced' },
        );
    }
  },
);

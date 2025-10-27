import { OperationName } from 'fuels';
import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { parseAddressParam } from '~/systems/Core/utils/address';
import { sdk } from '~/systems/Core/utils/sdk';
import { gqlSdk } from '~/systems/Transaction/constants/tags';
import type { TransactionNode } from '~/systems/Transaction/types';
import { createTransactionSummary } from '../utils/txSummary';

const schema = z.object({
  id: z.string().nullable(),
});

export const getTx = act(
  schema,
  async (input): Promise<TransactionNode | undefined | null> => {
    try {
      const id = parseAddressParam(input.id);
      const { data } = await sdk.transactionDetails(
        { id },
        { tagName: gqlSdk, tagId: input.id?.toString() ?? '' },
      );
      if (!data.transaction) {
        return null;
      }

      // TODO: Remoeve filter operations once TxSummary adds support
      // for other operations.
      const operations = (
        await createTransactionSummary({
          transaction: data.transaction,
        })
      ).filter((op) => op.name === OperationName.transfer);

      return {
        ...data.transaction,
        summary: operations || [],
      };
    } catch (e) {
      console.error(e);
      return null;
    }
  },
);

'use server';

import dayjs from 'dayjs';
import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { parseAddressParam } from '~/systems/Core/utils/address';
import { sdk } from '~/systems/Core/utils/sdk';

const schema = z.object({
  owner: z.string().nullable(),
});

export const getAccountTransactions = act(schema, async (input) => {
  const owner = parseAddressParam(input.owner);
  const { data } = await sdk.getAccountTransactions({ owner });
  // TODO: remove this after gets our own indexer working
  const edges = data.transactions.edges.sort((a, b) => {
    const aTime = dayjs(a.node.time?.rawUnix);
    const bTime = dayjs(b.node.time?.rawUnix);
    return bTime.diff(aTime);
  });
  data.transactions.edges = edges;
  return data.transactions;
});

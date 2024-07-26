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
  const { data } = await sdk.transactionsByOwner({ owner, last: 100 });
  // TODO: remove this after gets our own indexer working
  const nodes = data.transactionsByOwner.nodes.sort((a, b) => {
    const aTime = dayjs(a.time?.rawUnix);
    const bTime = dayjs(b.time?.rawUnix);
    return bTime.diff(aTime);
  });
  data.transactionsByOwner.nodes = nodes;
  return data.transactionsByOwner;
});

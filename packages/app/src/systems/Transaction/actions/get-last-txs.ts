'use server';
import { getSdk } from '@fuel-explorer/graphql';
import { GraphQLClient } from 'graphql-request';
import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';

const schema = z.object({
  last: z.number().default(12).optional(),
});

export const getLastTxs = act(schema, async ({ last = 12 }) => {
  const client = new GraphQLClient(process.env.GRAPHQL_API!);
  const sdk = getSdk(client);
  const { data } = await sdk.getLastTransactions({ last });
  return data.transactions.nodes;
});

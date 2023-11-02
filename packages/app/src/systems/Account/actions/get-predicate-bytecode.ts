'use server';

import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { parseAddressParam } from '~/systems/Core/utils/address';
import { sdk } from '~/systems/Core/utils/sdk';

const schema = z.object({
  owner: z.string().nullable(),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findBytecodeInput(owner: string, i: any) {
  return i.owner === owner && i.predicate !== '0x';
}

export const getPredicateBytecode = act(schema, async (input) => {
  const owner = parseAddressParam(input.owner);
  const { data } = await sdk.getPredicateBytecode({ owner });
  const nodes = data.transactionsByOwner.nodes;
  const inputs = nodes.flatMap((n) => n.inputs ?? []);
  const isPredicate = inputs.some((i) => findBytecodeInput(owner, i));
  if (!isPredicate) return null;
  const filtered = inputs.filter((i) => findBytecodeInput(owner, i));
  const first = filtered[0];
  if (first.__typename !== 'InputContract') return first.predicate;
});

'use server';

import type { GQLBlockFragment } from '@fuel-explorer/graphql-new';
import { Signer } from 'fuels';
import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { isValidAddress } from '~/systems/Core/utils/address';
import { sdk } from '~/systems/Core/utils/sdk';

const schema = z.object({
  id: z.string().nullable(),
});

export const getBlock = act(schema, async (input) => {
  const id = input.id;
  const isAddressValid = isValidAddress(id);
  const isValidBlockHeight = !Number.isNaN(Number(id));
  if (!isValidBlockHeight && !isValidAddress) {
    throw new Error('Invalid block number or block id');
  }

  if (isAddressValid) {
    const { data } = await sdk.block({ id });
    const producer = getProducer(data?.block);
    return { block: data.block, producer };
  }

  const { data } = await sdk.block({ height: id });
  const producer = getProducer(data?.block);
  return { block: data.block, producer };
});

const getProducer = (block?: GQLBlockFragment | null) => {
  // TODO use custom resolver once a fix is found
  let producer: string | null = null;
  if (block && block.consensus.__typename === 'PoAConsensus') {
    const signature = block?.consensus.signature;
    producer = Signer.recoverAddress(block.id, signature).toAddress();
  }

  return producer;
};

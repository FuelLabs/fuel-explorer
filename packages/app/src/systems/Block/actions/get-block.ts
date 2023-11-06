'use server';

import type { GetBlockByHeightQuery } from '@fuel-explorer/graphql';
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
  const isValidBlockHeight = !isNaN(Number(id));
  if (!isValidBlockHeight && !isValidAddress) {
    throw new Error('Invalid block number or block id');
  }

  if (isAddressValid) {
    const { data } = await sdk.getBlockById({ id }).catch((err) => {
      console.log(`err`, err);
      return { data: { block: null } };
    });
    const producer = getProducer(data);
    return { block: data.block, producer };
  }

  const { data } = await sdk.getBlockByHeight({ height: id }).catch((err) => {
    console.log(`err`, err);
    return { data: { block: null } };
  });
  const producer = getProducer(data);
  return { block: data.block, producer };
});

const getProducer = (
  data:
    | GetBlockByHeightQuery
    | {
        block: null;
      },
) => {
  // TODO use custom resolver once a fix is found
  let producer: string | null = null;
  if (data.block && data.block.consensus.__typename === 'PoAConsensus') {
    const signature = data?.block?.consensus.signature;
    producer = Signer.recoverAddress(data.block.id, signature).toAddress();
  }

  return producer;
};

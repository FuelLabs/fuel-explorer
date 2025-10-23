'use server';

import { bn } from 'fuels';
import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { parseAddressParam } from '~/systems/Core/utils/address';
import { sdk } from '~/systems/Core/utils/sdk';

const schema = z.object({
  owner: z.string().nullable(),
});

export const getBalances = act(schema, async (input) => {
  const owner = parseAddressParam(input.owner);
  const { data } = await sdk.balances({ first: 100, filter: { owner } });
  for (const balance of data.balances.nodes) {
    if (balance.metadata) {
      balance.metadata = JSON.parse(balance.metadata);
    }
  }
  const sortedBalances = data.balances.nodes.sort((a, b) => {
    // first every asset with icon (verifieds)
    if (a.icon && !b.icon) return -1;
    if (!a.icon && b.icon) return 1;
    if (a.icon && b.icon) {
      // then between the ones that have icon, ETH will be first
      if (a.symbol === 'ETH' && b.symbol !== 'ETH') return -1;
      if (a.symbol !== 'ETH' && b.symbol === 'ETH') return 1;
    }
    // then order by those who have symbol first
    if (a.symbol && !b.symbol) return -1;
    if (!a.symbol && b.symbol) return 1;
    return (a.symbol || '').localeCompare(b.symbol || '');
  });
  return sortedBalances.filter((balance) => !bn(balance.amount).isZero());
});

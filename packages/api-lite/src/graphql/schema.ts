import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PoliciesResolver } from '~/graphql/resolvers/PoliciesResolver';
import { providerDocPath } from '../fuelcore/FuelCoreClient';
import type { AppContext } from './context';
import { analyticsResolvers } from './resolvers/analytics';
import { blockResolvers } from './resolvers/blocks';
import { passthroughResolvers } from './resolvers/passthrough';
import { searchResolvers } from './resolvers/search';
import { stubResolvers } from './resolvers/stubs';
import { transactionResolvers } from './resolvers/transactions';

function schemasDir(): string {
  const bundled = join(__dirname, 'schemas');
  if (existsSync(bundled)) return bundled;
  return join(
    __dirname,
    '..',
    '..',
    '..',
    'graphql',
    'src',
    'graphql',
    'schemas',
  );
}

function tryReadDoc(name: string): string | null {
  try {
    return readFileSync(providerDocPath(name), 'utf8');
  } catch {
    return null;
  }
}

const typeDefs = mergeTypeDefs(loadFilesSync(schemasDir()));
const policies = PoliciesResolver.create();
const coinsDoc = tryReadDoc('coins');

const balanceResolvers = {
  async utxos(
    parent: { owner: string; assetId: string },
    _args: unknown,
    ctx: AppContext,
  ) {
    if (!coinsDoc) return [];
    const data = await ctx.client.query<{ coins?: { nodes?: unknown[] } }>(
      coinsDoc,
      {
        filter: { owner: parent.owner, assetId: parent.assetId },
        first: 100,
      },
    );
    return data.coins?.nodes ?? [];
  },
};

export function buildSchema() {
  return makeExecutableSchema<AppContext>({
    typeDefs,
    resolvers: {
      Query: {
        ...stubResolvers.Query,
        ...passthroughResolvers.Query,
        ...blockResolvers.Query,
        ...transactionResolvers.Query,
        ...searchResolvers.Query,
        ...analyticsResolvers.Query,
      },
      Transaction: { ...policies.Transaction },
      Policies: policies.Policies,
      Balance: balanceResolvers,
    },
  });
}

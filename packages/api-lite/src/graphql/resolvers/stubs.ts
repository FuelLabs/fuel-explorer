import { type PageArgs, emptyConnection, pageSize } from '../pagination';

const empty = async () => emptyConnection();
const nil = async () => null;

export const stubResolvers = {
  Query: {
    contracts: async (_: unknown, args: PageArgs, ctx: any) => {
      const rows = ctx.index.contracts({ limit: pageSize(args) });
      return {
        nodes: rows.map((r: any) => ({ _id: r.height, id: r.contractId })),
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: '',
          endCursor: '',
        },
      };
    },
    predicate: async (_: unknown, args: { address: string }, ctx: any) => {
      const bytecode = ctx.index.predicate(args.address.toLowerCase());
      return bytecode ? { address: args.address, bytecode } : null;
    },
    asset: async (_: unknown, args: { assetId: string }, ctx: any) => {
      const a = ctx.index.asset(args.assetId.toLowerCase());
      return a
        ? {
            __typename: 'Asset',
            assetId: args.assetId,
            contractId: a.contractId,
            subId: a.subId,
            name: null,
            symbol: null,
            icon: null,
            decimals: null,
            suspicious: false,
            verified: false,
          }
        : null;
    },
    assetsByContract: async (
      _: unknown,
      args: { contractId: string } & PageArgs,
      ctx: any,
    ) => {
      const rows = ctx.index.assetsByContract(
        args.contractId.toLowerCase(),
        pageSize(args),
      );
      return {
        nodes: rows.map((r: any) => ({
          __typename: 'Asset',
          assetId: r.assetId,
          contractId: args.contractId,
          subId: r.subId,
          name: null,
          symbol: null,
          icon: null,
          decimals: null,
          suspicious: false,
          verified: false,
        })),
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: '',
          endCursor: '',
        },
      };
    },
    balanceByBlockHeight: nil,
    searchFast: nil,
    searchSlow: nil,
    stakingAPY: nil,
    stakingEvents: empty,
    stakingEvent: nil,
    bridgeEvents: empty,
    bridgeEvent: nil,
  },
};

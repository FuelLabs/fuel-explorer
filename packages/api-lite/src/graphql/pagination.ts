import { GraphQLError } from 'graphql';

export type PageArgs = {
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
};

export function pageSize(args: PageArgs, max = 50): number {
  const n = args.first ?? args.last ?? 10;
  if (!Number.isInteger(n) || n < 1 || n > max) {
    throw new GraphQLError(`Page size must be an integer between 1 and ${max}`);
  }
  return n;
}

export function emptyConnection() {
  return {
    nodes: [],
    edges: [],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: '',
      endCursor: '',
      startCount: 0,
      endCount: 0,
      totalCount: 0,
    },
  };
}

export function connection<T extends { cursor: string }>(
  items: T[],
  info: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    totalCount?: number;
    startCount?: number;
    endCount?: number;
  },
) {
  const nodes = items.map(({ cursor, ...node }) => node);
  return {
    nodes,
    edges: items.map((i, idx) => ({ cursor: i.cursor, node: nodes[idx] })),
    pageInfo: {
      hasNextPage: info.hasNextPage,
      hasPreviousPage: info.hasPreviousPage,
      startCursor: items[0]?.cursor ?? '',
      endCursor: items[items.length - 1]?.cursor ?? '',
      startCount: info.startCount ?? 0,
      endCount: info.endCount ?? 0,
      totalCount: info.totalCount ?? nodes.length,
    },
  };
}

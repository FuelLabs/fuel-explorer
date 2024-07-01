import { gt, lt } from 'drizzle-orm';
import type { PgTableWithColumns } from 'drizzle-orm/pg-core';
import type { Maybe } from '~/graphql/generated/sdk';
import type { DbConnection, DbTransaction } from '~/infra/database/Db';
import type { Entity } from './Entity';
import type { Identifier } from './Identifier';

export type PaginatorParams = {
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
};

type Cursor = string | number | null | undefined;
type Edge<T> = { cursor: Cursor; node: T };

export type PaginatedResults<T> = {
  nodes: T[];
  edges: Edge<T>[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: Cursor;
    endCursor: Cursor | null;
  };
};

export class Paginator<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  Source extends PgTableWithColumns<any>,
  Params extends PaginatorParams = PaginatorParams,
> {
  constructor(
    private source: Source,
    readonly params: Params,
    private conn: DbConnection | DbTransaction,
  ) {}

  async hasPreviousPage(startCursor: Cursor): Promise<boolean> {
    const idField = this.source._id;
    const total = await this.conn
      .select({
        [idField.name]: idField,
      })
      .from(this.source)
      .where(lt(idField, startCursor))
      .limit(1);

    return total.length > 0;
  }

  async hasNextPage(endCursor: Cursor | null): Promise<boolean> {
    if (!endCursor) {
      return false;
    }

    const idField = this.source._id;
    const total = await this.conn
      .select({
        [idField.name]: idField,
      })
      .from(this.source)
      .where(gt(idField, endCursor))
      .limit(1);

    return total.length > 0;
  }

  getPaginatedResult<T>(items: T[], params: Params) {
    const { last } = params;

    if (last) {
      return items.reverse();
    }

    return items;
  }

  async validateParams() {
    const { first, last, after, before } = this.params;
    if (first && last) {
      throw new Error('Cannot use both first and last');
    }
    if (after && before) {
      throw new Error('Cannot use both after and before');
    }
    if (first && before) {
      throw new Error('Cannot use first with before');
    }
    if (last && after) {
      throw new Error('Cannot use last with after');
    }
  }

  getStartCursor<T extends Entity<unknown, Identifier<Cursor>>>(items: T[]) {
    const first = items[0];
    return first ? first.cursor : null;
  }

  getEndCursor<T extends Entity<unknown, Identifier<Cursor>>>(items: T[]) {
    const last = items[items.length - 1];
    return last ? last.cursor : null;
  }

  async createPaginatedResult<
    T,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    R extends { cursor?: Maybe<Edge<T>['cursor']>; _id?: any; id?: any },
  >(
    nodes: T[],
    startCursor: Cursor,
    endCursor: Cursor | null,
    iterator: (node: T) => R,
  ): Promise<PaginatedResults<R>> {
    const newNodes = nodes.map(iterator);
    const edges = newNodes.map((node) => ({
      node,
      cursor: node.cursor || node._id || node.id,
    }));

    const hasPreviousPage = await this.hasPreviousPage(startCursor);
    const hasNextPage = await this.hasNextPage(endCursor);

    return {
      nodes: newNodes,
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        endCursor,
        startCursor,
      },
    };
  }
}

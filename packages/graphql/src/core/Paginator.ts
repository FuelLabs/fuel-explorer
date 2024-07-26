import { gt, lt, sql } from 'drizzle-orm';
import type { PgTableWithColumns } from 'drizzle-orm/pg-core';
import type { DbConnection, DbTransaction } from '~/infra/database/Db';
import type { Entity } from './Entity';
import type { Identifier } from './Identifier';

type Cursor = string | number | null | undefined;
export type PaginatorParams = {
  first?: number | null;
  last?: number | null;
  before?: Cursor | null;
  after?: Cursor | null;
};

type Edge<T> = {
  cursor: Cursor;
  node: T;
};

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

type PaginatorEntity<T, ID extends Identifier<unknown>> = Entity<T, ID> & {
  toGQLNode: () => T;
};

export class Paginator<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>,
  Source extends PgTableWithColumns<any> = PgTableWithColumns<any>,
> {
  constructor(
    private source: Source,
    readonly params: PaginatorParams,
    private conn: DbConnection | DbTransaction,
  ) {}

  async hasPreviousPage(startCursor: Cursor) {
    if (!startCursor) return false;
    const idField = this.source._id;
    const result = await this.conn
      .select({ count: sql<number>`count(*)` })
      .from(this.source)
      .where(lt(idField, startCursor))
      .limit(1);
    return result[0].count > 0;
  }

  async hasNextPage(endCursor: Cursor | null) {
    if (!endCursor) return false;
    const idField = this.source._id;
    const result = await this.conn
      .select({ count: sql<number>`count(*)` })
      .from(this.source)
      .where(gt(idField, endCursor))
      .limit(1);
    return result[0].count > 0;
  }

  async validateParams() {
    const { first, last, before, after } = this.params;
    if (!first && !last) {
      throw new Error('Must use either first or last');
    }
    if (first && last) {
      throw new Error('Cannot use both first and last at the same time');
    }
    if (before && after) {
      throw new Error('Cannot use both before and after at the same time');
    }
  }

  getCursor<R extends PaginatorEntity<unknown, Identifier<unknown>>>(
    item: R,
  ): Cursor {
    return item.cursor || item._id;
  }

  getStartCursor<R extends PaginatorEntity<unknown, Identifier<unknown>>>(
    items: R[],
  ): Cursor {
    const first = items[0];
    return first ? this.getCursor(first) : null;
  }

  getEndCursor<R extends PaginatorEntity<unknown, Identifier<unknown>>>(
    items: R[],
  ): Cursor {
    const last = items[items.length - 1];
    return last ? this.getCursor(last) : null;
  }

  async createPaginatedResult<
    R extends PaginatorEntity<unknown, Identifier<unknown>>,
  >(nodes: R[]) {
    const newNodes = nodes.map((n) => n.toGQLNode()) as R[];
    const edges = newNodes.map((node) => ({
      node,
      cursor: this.getCursor(node),
    })) as Edge<R>[];

    const startCursor = this.getStartCursor(newNodes);
    const endCursor = this.getEndCursor(newNodes);
    const hasPreviousPage = await this.hasPreviousPage(endCursor);
    const hasNextPage = await this.hasNextPage(startCursor);

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

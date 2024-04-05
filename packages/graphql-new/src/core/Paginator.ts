import { SQL, and, asc, desc, gt, lt } from 'drizzle-orm';
import { PgColumn, PgTableWithColumns } from 'drizzle-orm/pg-core';
import { db } from '~/infra/database/Db';
import { Entity } from './Entity';
import { Identifier } from './Identifier';

export type PaginatorParams = {
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
};

type Cursor = string | number;

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

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export class Paginator<Source extends PgTableWithColumns<any>> {
  private maxId!: Cursor;

  constructor(
    private source: Source,
    private params: PaginatorParams,
  ) {}

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async getQueryPaginationConfig<T extends SQL<any>>(_lastSql?: T) {
    const { source, params } = this;
    const { first, after, before, last } = params;
    const idField = source._id as PgColumn;
    const order = first ? asc : desc;
    const whereBy = first ? gt : lt;
    const cursor = after || before;
    const limit = first || last;

    // Query last id required for reverse pagination
    const [lastItem] = last
      ? await db
          .connection()
          .select()
          .from(source)
          .orderBy(desc(idField))
          .limit(1)
      : [{ _id: 0 }];

    return {
      idField,
      order,
      whereBy,
      cursor,
      limit,
      limitQuery: Number(limit) + 1,
      maxId: lastItem._id,
    };
  }

  async getPaginatedResult<S extends SQL<unknown>>(
    config: Awaited<ReturnType<typeof this.getQueryPaginationConfig>>,
    customWhere?: S,
  ) {
    const { idField, order, whereBy, cursor, limit, maxId } = config;
    this.maxId = maxId;

    let query = db
      .connection()
      .select()
      .from(this.source)
      .orderBy(order(idField))
      .$dynamic();

    if (cursor) {
      const cursorWhere = whereBy(idField, Number(cursor));
      query = customWhere
        ? query.where(and(cursorWhere, customWhere))
        : query.where(cursorWhere);
    }
    if (!cursor && customWhere) {
      query = query.where(customWhere);
    }

    return query.limit(Number(limit) + 1);
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
    return first ? first._id.value() : 0;
  }
  getEndCursor<T extends Entity<unknown, Identifier<Cursor>>>(items: T[]) {
    const last = items[items.length - 1];
    return last ? last._id.value() : null;
  }

  createPaginatedResult<T, R extends { id: Edge<T>['cursor'] }>(
    items: T[],
    startCursor: Cursor,
    endCursor: Cursor | null,
    iterator: (node: T) => R,
  ): PaginatedResults<R> {
    const { first, last } = this.params;
    const limit = (first || last) ?? 1;
    const nodes = items.slice(0, limit).map((item) => item);
    const newNodes = nodes.map(iterator);
    const newEdges = newNodes.map((node) => ({
      node,
      cursor: node.id,
    }));

    const hasNextPage = first
      ? items.length > limit
      : this.compareCursor(endCursor ?? 0, this.maxId.toString()) < 0;
    const hasPreviousPage = first
      ? this.compareCursor(startCursor.toString(), '1') > 0
      : items.length > limit;

    return {
      nodes: newNodes,
      edges: newEdges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        endCursor,
        startCursor,
      },
    };
  }

  private compareCursor(cursor: Cursor, other: Cursor | null) {
    return `${other}`.localeCompare(`${cursor}`, undefined, { numeric: true });
  }
}

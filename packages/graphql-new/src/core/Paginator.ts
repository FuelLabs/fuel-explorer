import { SQL, and, asc, desc, gt, lt, sql } from 'drizzle-orm';
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

export type PaginatedResults<T> = {
  nodes: T[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: number;
    endCursor: number | null;
  };
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export class Paginator<Source extends PgTableWithColumns<any>> {
  private maxId!: number;

  constructor(
    private source: Source,
    private params: PaginatorParams,
  ) {}

  async getQueryPaginationConfig() {
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
          .select({
            last_id: sql<number>`max(${idField})`,
          })
          .from(source)
          .limit(1)
      : [{ last_id: 0 }];

    return {
      idField,
      order,
      whereBy,
      cursor,
      limit,
      limitQuery: Number(limit) + 1,
      maxId: lastItem.last_id,
    };
  }

  async getPaginatedResult<S extends SQL<unknown>>(customWhere?: S) {
    const config = await this.getQueryPaginationConfig();
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

  getStartCursor<T extends Entity<unknown, Identifier<number>>>(items: T[]) {
    const first = items[0];
    return first ? first._id.value() : 0;
  }
  getEndCursor<T extends Entity<unknown, Identifier<number>>>(items: T[]) {
    const last = items[items.length - 1];
    return last ? last._id.value() : null;
  }

  createPaginatedResult<T extends Entity<unknown, Identifier<number>>, R = T>(
    items: T[],
    startCursor: number,
    endCursor: number | null,
    iterator: (node: T) => R = (node) => node as unknown as R,
  ): PaginatedResults<R> {
    const { maxId } = this;
    const { first, last } = this.params;
    const limit = (first || last) ?? 1;
    const nodes = items.slice(0, limit).map((item) => item);
    const hasNextPage = first ? limit < items.length : startCursor < maxId;
    const hasPreviousPage = first ? startCursor > 1 : limit < items.length;
    const newNodes = nodes.map(iterator);

    return {
      nodes: newNodes,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        endCursor,
        startCursor,
      },
    };
  }
}

import { SQL, and, asc, desc, gt, lt } from 'drizzle-orm';
import { PgTableWithColumns } from 'drizzle-orm/pg-core';
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
  constructor(
    private source: Source,
    private params: PaginatorParams,
  ) {}

  async getQueryPaginationConfig() {
    const { source, params } = this;
    const { first, after, before, last } = params;
    const idField = source._id;
    const order = first ? asc : desc;
    const whereBy = first ? gt : lt;
    const cursor = after || before;
    const limit = first || last;

    return {
      idField,
      order,
      whereBy,
      cursor,
      limit,
    };
  }

  async hasPreviousPage(startCursor: Cursor): Promise<boolean> {
    const idField = this.source._id;

    const total = await db
      .connection()
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

    const total = await db
      .connection()
      .select({
        [idField.name]: idField,
      })
      .from(this.source)
      .where(gt(idField, endCursor))
      .limit(1);

    return total.length > 0;
  }

  getPaginatedResult<S extends SQL<unknown>>(
    config: Awaited<ReturnType<typeof this.getQueryPaginationConfig>>,
    customWhere?: S,
  ) {
    const { idField, order, whereBy, cursor, limit } = config;

    let query = db
      .connection()
      .select()
      .from(this.source)
      .orderBy(order(idField))
      .$dynamic();

    if (cursor) {
      const cursorWhere = whereBy(idField, cursor);
      query = customWhere
        ? query.where(and(cursorWhere, customWhere))
        : query.where(cursorWhere);
    }

    if (!cursor && customWhere) {
      query = query.where(customWhere);
    }

    if (limit) {
      query = query.limit(limit);
    }

    return query;
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

  async createPaginatedResult<T, R extends { id: Edge<T>['cursor'] }>(
    nodes: T[],
    startCursor: Cursor,
    endCursor: Cursor | null,
    iterator: (node: T) => R,
  ): Promise<PaginatedResults<R>> {
    const { last } = this.params;

    const sorted = last ? nodes.reverse() : nodes;
    const newNodes = sorted.map(iterator);
    const edges = newNodes.map((node) => ({
      node,
      cursor: node.id,
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

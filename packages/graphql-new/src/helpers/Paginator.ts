import { SQL, and, asc, desc, gt, lt, sql } from 'drizzle-orm';
import { PgColumn, PgTableWithColumns } from 'drizzle-orm/pg-core';
import { db } from '~/infra/database/Db';

export type PaginatorParams = {
  first: number;
  last: number;
  after: string;
  before: string;
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

    const items = await query.limit(Number(limit) + 1);
    return { items, maxId };
  }

  async queryPaginated() {
    const result = await this.getPaginatedResult();
    return this.createPaginatedResult(result);
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

  async createPaginatedResult({
    items,
    maxId,
  }: Awaited<ReturnType<typeof this.getPaginatedResult>>) {
    const { first, last } = this.params;
    const limit = first || last;
    const nodes = items.slice(0, limit).map((item) => item.data);
    const startCursor = items[0]?._id ?? 0;
    const endCursor = items[nodes.length - 1]?._id || null;
    const hasNextPage = first ? limit < items.length : startCursor < maxId;
    const hasPreviousPage = first ? startCursor > 1 : limit < items.length;

    return {
      nodes,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        endCursor,
        startCursor,
      },
    };
  }
}

import { type SQL, and, asc, desc, gt, lt, sql } from 'drizzle-orm';
import type { PgTableWithColumns } from 'drizzle-orm/pg-core';
import type { Paginator } from '~/core/Paginator';
import type { DbConnection, DbTransaction } from '~/infra/database/Db';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export abstract class BaseStatements<Source extends PgTableWithColumns<any>> {
  constructor(protected readonly conn: DbConnection | DbTransaction) {}

  protected abstract get tableName(): string;
  protected abstract get table(): Source;

  protected findMany() {
    const byFirstWithCursor = this.findManyByFirstAndCursor();
    const byLastWithCursor = this.findManyByLastAndCursor();
    const byFirstNoCursor = this.findManyByFirst();
    const byLastNoCursor = this.findManyByLast();

    return (paginator: Paginator<Source>) => {
      const params = this.getPaginatorParams(paginator);
      const hasCursor = params.cursor !== undefined;
      const isFirst = paginator.params.first !== undefined;

      let exec:
        | ReturnType<BaseStatements<Source>['findManyByFirst']>
        | ReturnType<BaseStatements<Source>['findManyByLast']>
        | ReturnType<BaseStatements<Source>['findManyByFirstAndCursor']>
        | ReturnType<BaseStatements<Source>['findManyByLastAndCursor']>;

      if (isFirst) {
        exec = hasCursor ? byFirstWithCursor : byFirstNoCursor;
      } else {
        exec = hasCursor ? byLastWithCursor : byLastNoCursor;
      }

      return {
        execute: () => exec.execute(params),
      };
    };
  }

  public findManyByFirst<S extends SQL<unknown>>(where?: S) {
    let query = this.conn
      .select()
      .from(this.table)
      .orderBy(asc(this.table._id))
      .limit(sql.placeholder('limit'))
      .$dynamic();

    if (where) {
      query = query.where(where);
    }
    return query.prepare(`${this.tableName}.findManyByFirst`);
  }

  public findManyByLast<S extends SQL<unknown>>(where?: S) {
    let query = this.conn
      .select()
      .from(this.table)
      .orderBy(desc(this.table._id))
      .limit(sql.placeholder('limit'))
      .$dynamic();

    if (where) {
      query = query.where(where);
    }
    return query.prepare(`${this.tableName}.findManyByLast`);
  }

  public findManyByFirstAndCursor<S extends SQL<unknown>>(where?: S) {
    const cursorWhere = gt(this.table._id, sql.placeholder('cursor'));
    return this.conn
      .select()
      .from(this.table)
      .orderBy(asc(this.table._id))
      .limit(sql.placeholder('limit'))
      .$dynamic()
      .where(where ? and(cursorWhere, where) : cursorWhere)
      .prepare(`${this.tableName}.findManyByFirstAndCursor`);
  }

  public findManyByLastAndCursor<S extends SQL<unknown>>(where?: S) {
    const cursorWhere = lt(this.table._id, sql.placeholder('cursor'));
    return this.conn
      .select()
      .from(this.table)
      .orderBy(desc(this.table._id))
      .limit(sql.placeholder('limit'))
      .$dynamic()
      .where(where ? and(cursorWhere, where) : cursorWhere)
      .prepare(`${this.tableName}.findManyByLastAndCursor`);
  }

  public getPaginatorParams(paginator: Paginator<Source>) {
    const { first, last, after, before } = paginator.params;
    return first
      ? { cursor: after, limit: first }
      : { cursor: before, limit: last };
  }
}

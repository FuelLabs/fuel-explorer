import { type SQL, asc, desc, gt, lt, sql } from 'drizzle-orm';
import type { PgTableWithColumns } from 'drizzle-orm/pg-core';
import type { Paginator, PaginatorParams } from '~/core/Paginator';
import type { DbConnection, DbTransaction } from '~/infra/database/Db';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export abstract class BaseStatements<Source extends PgTableWithColumns<any>> {
  placeholders = {
    first: sql.placeholder('first'),
    last: sql.placeholder('last'),
    after: sql.placeholder('after'),
    before: sql.placeholder('before'),
  };

  selectors = {
    first: this.getWhere('first'),
    last: this.getWhere('last'),
  };

  constructor(protected readonly conn: DbConnection | DbTransaction) {}

  protected abstract get tableName(): string;
  protected abstract get table(): Source;

  protected findMany() {
    const methods = this.buildMethods();
    return (paginator: Paginator<Source>) => {
      const exec = this.selectExec(methods, paginator.params);
      return {
        execute: async () => {
          const { first, last, before, after } = paginator.params;
          const res = await exec.execute(paginator.params);
          if (first && before) return res?.reverse();
          if (last && after) return res?.reverse();
          return res ?? [];
        },
      };
    };
  }

  public selectExec(
    methods: ReturnType<BaseStatements<Source>['buildMethods']>,
    params: PaginatorParams,
  ) {
    const { first, last, before, after } = params;
    if (first && !before && !after) {
      return methods.findManyByFirst;
    }
    if (first && after) {
      return methods.findManyByFirstAndAfter;
    }
    if (first && before) {
      return methods.findManyByFirstAndBefore;
    }
    if (last && !before && !after) {
      return methods.findManyByLast;
    }
    if (last && before) {
      return methods.findManyByLastAndBefore;
    }
    return methods.findManyByLastAndAfter;
  }

  public buildMethods<S extends SQL<unknown>>(where?: S) {
    const findManyByFirst = this.findManyByFirst(where);
    const findManyByFirstAndAfter = this.findManyByFirstAndAfter(where);
    const findManyByFirstAndBefore = this.findManyByFirstAndBefore(where);
    const findManyByLast = this.findManyByLast(where);
    const findManyByLastAndBefore = this.findManyByLastAndBefore(where);
    const findManyByLastAndAfter = this.findManyByLastAndAfter(where);
    return {
      findManyByFirst,
      findManyByFirstAndBefore,
      findManyByFirstAndAfter,
      findManyByLast,
      findManyByLastAndBefore,
      findManyByLastAndAfter,
    };
  }

  public findManyByFirst<S extends SQL<unknown>>(customWhere?: S) {
    return this.buildQuery({
      method: 'findManyByFirst',
      customWhere,
    });
  }

  public findManyByFirstAndAfter<S extends SQL<unknown>>(customWhere?: S) {
    return this.buildQuery({
      method: 'findManyByFirstAndAfter',
      customWhere,
    });
  }

  public findManyByFirstAndBefore<S extends SQL<unknown>>(customWhere?: S) {
    return this.buildQuery({
      method: 'findManyByFirstAndBefore',
      customWhere,
    });
  }

  public findManyByLast<S extends SQL<unknown>>(customWhere?: S) {
    return this.buildQuery({
      method: 'findManyByLast',
      customWhere,
    });
  }

  public findManyByLastAndBefore<S extends SQL<unknown>>(customWhere?: S) {
    return this.buildQuery({
      method: 'findManyByLastAndBefore',
      customWhere,
    });
  }

  public findManyByLastAndAfter<S extends SQL<unknown>>(customWhere?: S) {
    return this.buildQuery({
      method: 'findManyByLastAndAfter',
      customWhere,
    });
  }

  private buildQuery({
    method,
    customWhere,
  }: {
    method: string;
    customWhere?: SQL<unknown> | null;
  }) {
    let query = this.conn.select().from(this.table).$dynamic();
    const placeholder = sql.placeholder;
    const has = (val: string) => method.includes(val);
    const id = this.table._id;
    const cursor = placeholder(method.includes('Before') ? 'before' : 'after');
    const limit = placeholder(method.includes('First') ? 'first' : 'last');

    if (has('First') && !has('After') && !has('Before')) {
      query = query.limit(limit);
      query = query.orderBy(asc(id));
    }
    if (has('First') && has('After')) {
      query = query.limit(limit);
      query = query.orderBy(asc(id));
      query = query.where(gt(id, cursor));
    }
    if (has('First') && has('Before')) {
      query = query.limit(limit);
      query = query.orderBy(desc(id));
      query = query.where(lt(id, cursor));
    }

    if (has('Last') && !has('After') && !has('Before')) {
      query = query.limit(limit);
      query = query.orderBy(desc(id));
    }
    if (has('Last') && has('Before')) {
      query = query.limit(limit);
      query = query.orderBy(desc(id));
      query = query.where(lt(id, cursor));
    }
    if (has('Last') && has('After')) {
      query = query.limit(limit);
      query = query.orderBy(asc(id));
      query = query.where(gt(id, cursor));
    }

    if (customWhere) {
      query = query.where(customWhere);
    }

    const preparedQuery = query.prepare(`${this.tableName}.${method}`);
    return preparedQuery;
  }

  private getWhere(dir?: 'first' | 'last') {
    if (!dir) return null;
    const id = this.table._id;
    const cursor = sql.placeholder(dir);
    return dir === 'first' ? gt(id, cursor) : lt(id, cursor);
  }
}

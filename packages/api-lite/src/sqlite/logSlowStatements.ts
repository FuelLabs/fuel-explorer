import type Database from 'better-sqlite3';

const SLOW_MS = 1000;

const sqlLabel = (sql: string) => sql.replace(/\s+/g, ' ').trim().slice(0, 160);

// Every better-sqlite3 call runs synchronously on the event loop; a call that
// takes SLOW_MS or longer is logged with its duration and SQL.
export function logSlowStatements(db: Database.Database, label: string) {
  const timed = <F extends (...args: any[]) => any>(what: string, fn: F): F =>
    ((...args: Parameters<F>) => {
      const t = performance.now();
      try {
        return fn(...args);
      } finally {
        const ms = Math.round(performance.now() - t);
        if (ms >= SLOW_MS)
          console.log(`slow sqlite (${label}) ${ms}ms: ${what}`);
      }
    }) as F;

  const prepare = db.prepare.bind(db);
  db.prepare = ((sql: string) => {
    const stmt = prepare(sql);
    const what = sqlLabel(sql);
    stmt.run = timed(what, stmt.run.bind(stmt));
    stmt.get = timed(what, stmt.get.bind(stmt));
    stmt.all = timed(what, stmt.all.bind(stmt));
    return stmt;
  }) as unknown as typeof db.prepare;

  const exec = db.exec.bind(db);
  db.exec = ((sql: string) =>
    timed(sqlLabel(sql), exec)(sql)) as unknown as typeof db.exec;

  const pragma = db.pragma.bind(db);
  db.pragma = ((sql: string, opts?: Database.PragmaOptions) =>
    timed(`pragma ${sql}`, pragma)(sql, opts)) as unknown as typeof db.pragma;

  const transaction = db.transaction.bind(db);
  db.transaction = ((fn: (...args: unknown[]) => unknown) => {
    const tx = transaction(fn);
    const what = `transaction ${fn.name || '(anonymous)'}`;
    return Object.assign(timed(what, tx), {
      deferred: timed(what, tx.deferred),
      immediate: timed(what, tx.immediate),
      exclusive: timed(what, tx.exclusive),
    });
  }) as unknown as typeof db.transaction;
}

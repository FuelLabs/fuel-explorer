import Database from 'better-sqlite3';

const SCHEMA = `
CREATE TABLE IF NOT EXISTS cosmos_responses(
  _id INTEGER PRIMARY KEY AUTOINCREMENT,
  block_height INTEGER,
  tx_hash TEXT UNIQUE,
  data TEXT,
  timestamp TEXT
);
CREATE INDEX IF NOT EXISTS cosmos_responses_block_height ON cosmos_responses(block_height);
CREATE TABLE IF NOT EXISTS cosmos_events(
  _id INTEGER PRIMARY KEY AUTOINCREMENT,
  cosmos_response_id INTEGER,
  type TEXT,
  key TEXT,
  value TEXT,
  "index" INTEGER
);
CREATE INDEX IF NOT EXISTS cosmos_events_type_key_value ON cosmos_events(type, key, value);
CREATE INDEX IF NOT EXISTS cosmos_events_response_type_key_index ON cosmos_events(cosmos_response_id, type, key, "index");
CREATE TABLE IF NOT EXISTS cosmos_index(id INTEGER PRIMARY KEY CHECK(id=1), block_height INTEGER);
INSERT OR IGNORE INTO cosmos_index(id, block_height) VALUES (1, NULL);
`;

const DEFAULT_QUERY_LIMIT = 1000;

export type CosmosResponseRow = {
  blockHeight: number;
  txHash: string;
  data: string | null;
  timestamp: string | null;
};

export type CosmosEventInput = {
  type: string;
  key: string;
  value: string;
  index: number;
};

export type CosmosEventRow = CosmosEventInput & {
  id: number;
  cosmosResponseId: number;
  blockHeight: number;
  txHash: string;
  timestamp: string | null;
};

export type CosmosEventQuery = {
  type?: string;
  key?: string;
  value?: string;
  fromHeight?: number;
  toHeight?: number;
  limit?: number;
};

export type CosmosStakingQueryItem = {
  id: number;
  tx_hash: string;
  block_height: number;
  timestamp: string | null;
  event_index: number;
  event_type: string;
  event_key: string;
  event_value: string;
};

export class CosmosIndex {
  private readonly db: Database.Database;
  private readonly stmts;

  constructor(path: string) {
    this.db = new Database(path);
    if (path !== ':memory:') {
      this.db.pragma('journal_mode = WAL');
      this.db.pragma('synchronous = NORMAL');
    }
    // Up to three connections (Index, L1Index, CosmosIndex) write the same
    // index.db; WAL allows one writer at a time, so busy_timeout keeps a
    // concurrent write waiting instead of failing with SQLITE_BUSY.
    this.db.pragma('busy_timeout = 5000');
    this.db.exec(SCHEMA);
    this.stmts = {
      cursor: this.db.prepare(
        'SELECT block_height FROM cosmos_index WHERE id = 1',
      ),
      setCursor: this.db.prepare(
        'UPDATE cosmos_index SET block_height = ? WHERE id = 1',
      ),
      insertResponse: this.db.prepare(
        'INSERT OR IGNORE INTO cosmos_responses(block_height, tx_hash, data, timestamp) VALUES (?, ?, ?, ?)',
      ),
      insertEvent: this.db.prepare(
        'INSERT INTO cosmos_events(cosmos_response_id, type, key, value, "index") VALUES (?, ?, ?, ?, ?)',
      ),
    };
  }

  cursor(): number | null {
    const row = this.stmts.cursor.get() as
      | { block_height: number | null }
      | undefined;
    return row?.block_height ?? null;
  }

  setCursor(height: number): void {
    this.stmts.setCursor.run(height);
  }

  // Idempotent on tx_hash; a duplicate response is skipped along with its
  // events, since cosmos_events has no unique key of its own.
  insertResponse(row: CosmosResponseRow, events: CosmosEventInput[]): void {
    const run = this.db.transaction(() => {
      const info = this.stmts.insertResponse.run(
        row.blockHeight,
        row.txHash,
        row.data,
        row.timestamp,
      );
      if (info.changes === 0) return;
      const responseId = info.lastInsertRowid as number;
      for (const event of events) {
        this.stmts.insertEvent.run(
          responseId,
          event.type,
          event.key,
          event.value,
          event.index,
        );
      }
    });
    run();
  }

  queryEvents(query: CosmosEventQuery): CosmosEventRow[] {
    const clauses: string[] = [];
    const args: unknown[] = [];
    if (query.type != null) {
      clauses.push('ce.type = ?');
      args.push(query.type);
    }
    if (query.key != null) {
      clauses.push('ce.key = ?');
      args.push(query.key);
    }
    if (query.value != null) {
      clauses.push('ce.value = ?');
      args.push(query.value);
    }
    if (query.fromHeight != null) {
      clauses.push('cr.block_height >= ?');
      args.push(query.fromHeight);
    }
    if (query.toHeight != null) {
      clauses.push('cr.block_height <= ?');
      args.push(query.toHeight);
    }
    const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
    args.push(query.limit ?? DEFAULT_QUERY_LIMIT);
    const rows = this.db
      .prepare(
        `SELECT
          ce._id AS id,
          ce.cosmos_response_id AS cosmosResponseId,
          ce.type AS type,
          ce.key AS key,
          ce.value AS value,
          ce."index" AS "index",
          cr.block_height AS blockHeight,
          cr.tx_hash AS txHash,
          cr.timestamp AS timestamp
        FROM cosmos_events ce
        JOIN cosmos_responses cr ON cr._id = ce.cosmos_response_id
        ${where}
        ORDER BY cr.block_height ASC, ce.cosmos_response_id ASC, ce."index" ASC, ce._id ASC
        LIMIT ?`,
      )
      .all(...args) as CosmosEventRow[];
    return rows;
  }

  // sqlite's two-arg TRIM(X,Y) strips the chars in Y from both ends, same as
  // Postgres's TRIM(BOTH '"' FROM X).
  blockSyncedAfter(ethBlockHeight: number): boolean {
    const sql = `
      SELECT EXISTS(
        SELECT 1 FROM cosmos_events ce
        JOIN cosmos_responses cr ON cr._id = ce.cosmos_response_id
        WHERE ce.type = 'fuelsequencer.bridge.EventEthereumBlockSynced'
          AND ce.key = 'block_number'
          AND CAST(TRIM(ce.value, '"') AS INTEGER) > @height
      ) AS found
    `;
    const row = this.db.prepare(sql).get({ height: ethBlockHeight }) as {
      found: number;
    };
    return row.found === 1;
  }

  // `value` is bound as given: some callers pass a JSON-quoted string
  // (`"0xabc..."`), others an unquoted one -- both are load-bearing as-is.
  queryEventsSyncedToEthBlock(
    ethBlockHeight: number,
    eventQueries: Array<{ type: string; key: string; value: string }>,
  ): CosmosStakingQueryItem[] {
    if (eventQueries.length === 0) return [];
    const typeClauses = eventQueries
      .map((_, i) => `ce.type = @type${i}`)
      .join(' OR ');
    const matchClauses = eventQueries
      .map(
        (_, i) =>
          `(ce3.type = @type${i} AND ce3.key = @key${i} AND LOWER(ce3.value) = LOWER(@value${i}))`,
      )
      .join(' OR ');
    const params: Record<string, unknown> = {
      ethHeight: `"${ethBlockHeight}"`,
    };
    eventQueries.forEach((q, i) => {
      params[`type${i}`] = q.type;
      params[`key${i}`] = q.key;
      params[`value${i}`] = q.value;
    });
    const sql = `
      SELECT
        cr._id AS id,
        cr.tx_hash AS tx_hash,
        cr.block_height AS block_height,
        cr.timestamp AS timestamp,
        ce."index" AS event_index,
        ce.type AS event_type,
        ce.key AS event_key,
        ce.value AS event_value
      FROM cosmos_responses cr
      JOIN cosmos_events ce ON ce.cosmos_response_id = cr._id AND (${typeClauses})
      WHERE cr.block_height IN (
        SELECT cr2.block_height FROM cosmos_events ce2
        JOIN cosmos_responses cr2 ON cr2._id = ce2.cosmos_response_id
        WHERE ce2.type = 'fuelsequencer.bridge.EventEthereumBlockSynced'
          AND ce2.key = 'block_number'
          AND ce2.value = @ethHeight
      )
      AND cr._id IN (
        SELECT ce3.cosmos_response_id FROM cosmos_events ce3 WHERE ${matchClauses}
      )
      ORDER BY cr._id, ce."index"
    `;
    return this.db.prepare(sql).all(params) as CosmosStakingQueryItem[];
  }

  close(): void {
    this.db.close();
  }
}

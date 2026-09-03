import Database from 'better-sqlite3';
import { L1_CONTRACTS } from './contracts';

const SCHEMA = `
CREATE TABLE IF NOT EXISTS contract_l1_index(contract_hash TEXT PRIMARY KEY, block_height INTEGER NOT NULL, name TEXT NOT NULL, network TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS contract_l1_logs(_id INTEGER PRIMARY KEY AUTOINCREMENT, contract_hash TEXT, block_height INTEGER, tx_hash TEXT, event TEXT, signature TEXT, raw_log TEXT, decoded_args TEXT, decoded_data TEXT, timestamp TEXT, log_index INTEGER, UNIQUE(block_height, log_index, tx_hash));
CREATE INDEX IF NOT EXISTS contract_l1_logs_contract_event_idx ON contract_l1_logs(contract_hash, event);
CREATE INDEX IF NOT EXISTS contract_l1_logs_block_height_idx ON contract_l1_logs(block_height);
CREATE TABLE IF NOT EXISTS contract_l1_args(_id INTEGER PRIMARY KEY AUTOINCREMENT, contract_l1_log_id INTEGER, key TEXT, value TEXT, UNIQUE(contract_l1_log_id, key));
CREATE INDEX IF NOT EXISTS contract_l1_args_key_value_idx ON contract_l1_args(key, value);
CREATE INDEX IF NOT EXISTS contract_l1_args_log_id_idx ON contract_l1_args(contract_l1_log_id);
`;

export type L1LogRow = {
  contractHash: string;
  blockHeight: number;
  txHash: string;
  event: string;
  signature: string;
  rawLog: string;
  decodedArgs: string;
  decodedData: string;
  timestamp: string;
  logIndex: number;
  // Merged decoded event args + decodeMessage() fields; one contract_l1_args
  // row is written per key.
  args: Record<string, unknown>;
};

export type ContractCursor = {
  contract_hash: string;
  block_height: number;
  name: string;
  network: string;
};

export type QueryLogsOpts = {
  contractHash?: string;
  event?: string;
  argKey?: string;
  argValue?: string;
  fromBlock?: number;
  limit?: number;
};

const SENDER_SIGNATURES = [
  'Authorize(address,bytes)',
  'Withdraw(address,address,uint256)',
];
const DELEGATOR_SIGNATURES = [
  'Delegate(address,address,uint256)',
  'Redelegate(address,address,address,uint256)',
  'ClaimRewards(address,address)',
  'Unbond(address,address,uint256)',
];

function inList(values: string[]): string {
  return values.map((v) => `'${v}'`).join(',');
}

// "this log belongs to `address`'s staking history"
const STAKING_MATCH_CONDITION = `
  (
    l._id IN (SELECT DISTINCT contract_l1_log_id FROM contract_l1_args WHERE key = 'sender' AND value = @address)
    AND l.signature IN (${inList(SENDER_SIGNATURES)})
  ) OR (
    l._id IN (SELECT DISTINCT contract_l1_log_id FROM contract_l1_args WHERE key = 'delegator' AND value = @address)
    AND l.signature IN (${inList(DELEGATOR_SIGNATURES)})
  )
`;

export type StakingLogEventRow = {
  _id: number;
  tx_hash: string;
  signature: string;
  block_height: number;
  decoded_args: string;
  timestamp: string;
};

export type StakingLogEventById = StakingLogEventRow & {
  value: string | null;
};

export type ArgLogRow = {
  value: string;
  timestamp: string;
  txHash: string;
  blockHeight: number;
};

// better-sqlite3 throws on boolean bindings and on bigints beyond int64
// (a uint256 decoded arg routinely exceeds that), so every arg value is
// coerced to a string before it is bound.
function stringifyArgValue(value: unknown): string {
  if (typeof value === 'bigint') return value.toString();
  if (typeof value === 'boolean') return String(value);
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value, (_key, v) =>
      typeof v === 'bigint' ? v.toString() : v,
    );
  }
  return String(value);
}

export class L1Index {
  private readonly db: Database.Database;
  private readonly stmts: {
    seedInsert: Database.Statement;
    cursor: Database.Statement;
    advance: Database.Statement;
    insertLog: Database.Statement;
    insertArg: Database.Statement;
    contractsAll: Database.Statement;
    contractsByNetwork: Database.Statement;
  };

  constructor(path: string) {
    this.db = new Database(path);
    if (path !== ':memory:') {
      this.db.pragma('journal_mode = WAL');
      this.db.pragma('synchronous = NORMAL');
    }
    // Index writes to the same index.db file from up to three connections
    // (Index, L1Index, and cosmos' equivalent); WAL allows one writer at a
    // time, so a busy_timeout keeps a concurrent write waiting instead of
    // failing immediately with SQLITE_BUSY.
    this.db.pragma('busy_timeout = 5000');
    this.db.exec(SCHEMA);
    this.stmts = {
      seedInsert: this.db.prepare(
        'INSERT OR IGNORE INTO contract_l1_index(contract_hash, block_height, name, network) VALUES (?, ?, ?, ?)',
      ),
      cursor: this.db.prepare(
        'SELECT block_height FROM contract_l1_index WHERE contract_hash = ?',
      ),
      advance: this.db.prepare(
        'UPDATE contract_l1_index SET block_height = ? WHERE contract_hash = ?',
      ),
      insertLog: this.db.prepare(
        `INSERT INTO contract_l1_logs (contract_hash, block_height, tx_hash, event, signature, raw_log, decoded_args, decoded_data, timestamp, log_index)
         VALUES (@contractHash, @blockHeight, @txHash, @event, @signature, @rawLog, @decodedArgs, @decodedData, @timestamp, @logIndex)
         ON CONFLICT(block_height, log_index, tx_hash) DO NOTHING
         RETURNING _id`,
      ),
      insertArg: this.db.prepare(
        'INSERT INTO contract_l1_args (contract_l1_log_id, key, value) VALUES (?, ?, ?) ON CONFLICT(contract_l1_log_id, key) DO NOTHING',
      ),
      contractsAll: this.db.prepare(
        'SELECT contract_hash, block_height, name, network FROM contract_l1_index',
      ),
      contractsByNetwork: this.db.prepare(
        'SELECT contract_hash, block_height, name, network FROM contract_l1_index WHERE network = ?',
      ),
    };
  }

  // INSERT OR IGNORE: an already-seeded contract keeps its stored cursor; a
  // fresh one starts at `startBlockOverride` when given, else its
  // L1_CONTRACTS seed height.
  seed(network: 'mainnet' | 'testnet', startBlockOverride?: number): void {
    const run = this.db.transaction(() => {
      for (const c of L1_CONTRACTS.filter((c) => c.network === network)) {
        this.stmts.seedInsert.run(
          c.contractHash,
          startBlockOverride ?? c.blockHeight,
          c.name,
          c.network,
        );
      }
    });
    run();
  }

  cursor(contractHash: string): number | null {
    const row = this.stmts.cursor.get(contractHash) as
      | { block_height: number }
      | undefined;
    return row ? row.block_height : null;
  }

  advance(contractHash: string, height: number): void {
    this.stmts.advance.run(height, contractHash);
  }

  insertLogs(rows: L1LogRow[]): void {
    const run = this.db.transaction(() => {
      for (const row of rows) {
        const inserted = this.stmts.insertLog.get(row) as
          | { _id: number }
          | undefined;
        // undefined means the UNIQUE(block_height, log_index, tx_hash)
        // constraint hit an existing row; it's already indexed with its args.
        if (!inserted) continue;
        for (const [key, value] of Object.entries(row.args)) {
          this.stmts.insertArg.run(inserted._id, key, stringifyArgValue(value));
        }
      }
    });
    run();
  }

  queryLogs(opts: QueryLogsOpts) {
    let sql = 'SELECT DISTINCT l.* FROM contract_l1_logs l';
    const conditions: string[] = [];
    const args: unknown[] = [];
    if (opts.argKey !== undefined || opts.argValue !== undefined) {
      sql += ' JOIN contract_l1_args a ON a.contract_l1_log_id = l._id';
      if (opts.argKey !== undefined) {
        conditions.push('a.key = ?');
        args.push(opts.argKey);
      }
      if (opts.argValue !== undefined) {
        conditions.push('a.value = ?');
        args.push(opts.argValue);
      }
    }
    if (opts.contractHash) {
      conditions.push('l.contract_hash = ?');
      args.push(opts.contractHash);
    }
    if (opts.event) {
      conditions.push('l.event = ?');
      args.push(opts.event);
    }
    if (opts.fromBlock !== undefined) {
      conditions.push('l.block_height >= ?');
      args.push(opts.fromBlock);
    }
    if (conditions.length) sql += ` WHERE ${conditions.join(' AND ')}`;
    sql += ' ORDER BY l.block_height DESC, l.log_index DESC';
    if (opts.limit !== undefined) {
      sql += ' LIMIT ?';
      args.push(opts.limit);
    }
    return this.db.prepare(sql).all(...args) as Array<{
      _id: number;
      contract_hash: string;
      block_height: number;
      tx_hash: string;
      event: string;
      signature: string;
      raw_log: string;
      decoded_args: string;
      decoded_data: string;
      timestamp: string;
      log_index: number;
    }>;
  }

  contracts(network?: 'mainnet' | 'testnet'): ContractCursor[] {
    return (
      network
        ? this.stmts.contractsByNetwork.all(network)
        : this.stmts.contractsAll.all()
    ) as ContractCursor[];
  }

  queryStakingEvents(
    address: string,
    opts: {
      cursor: number | null;
      direction: 'after' | 'before';
      limit: number;
    },
  ): StakingLogEventRow[] {
    const cmp = opts.direction === 'before' ? '<' : '>';
    const order = opts.direction === 'before' ? 'DESC' : 'ASC';
    // Same-block events, and logs from independently-backfilling contracts,
    // can have an _id that doesn't track block_height. Paginate and order on
    // the (block_height, _id) tuple together -- not _id alone -- so a page
    // boundary can't fall between two rows sharing (or reordering) a height.
    const sql = `
      SELECT l._id AS _id, l.tx_hash AS tx_hash, l.signature AS signature,
        l.block_height AS block_height, l.decoded_args AS decoded_args, l.timestamp AS timestamp
      FROM contract_l1_logs l
      WHERE (${STAKING_MATCH_CONDITION})
        AND (
          @cursor IS NULL
          OR (l.block_height, l._id) ${cmp} (
            SELECT c.block_height, c._id FROM contract_l1_logs c WHERE c._id = @cursor
          )
        )
      ORDER BY l.block_height ${order}, l._id ${order}
      LIMIT @limit
    `;
    return this.db.prepare(sql).all({
      address,
      cursor: opts.cursor,
      limit: opts.limit,
    }) as StakingLogEventRow[];
  }

  // comparator is a fixed `<`/`>` against one boundary row's (block_height,
  // _id), not tied to page direction. See queryStakingEvents() for why the
  // comparison can't be on _id alone.
  hasStakingEventBeyond(
    address: string,
    id: number,
    comparator: '<' | '>',
  ): boolean {
    const sql = `
      SELECT EXISTS(
        SELECT 1 FROM contract_l1_logs l
        WHERE (${STAKING_MATCH_CONDITION}) AND (l.block_height, l._id) ${comparator} (
          SELECT c.block_height, c._id FROM contract_l1_logs c WHERE c._id = @id
        )
      ) AS found
    `;
    const row = this.db.prepare(sql).get({ address, id }) as { found: number };
    return row.found === 1;
  }

  stakingEventById(id: number): StakingLogEventById | undefined {
    const sql = `
      SELECT l.tx_hash AS tx_hash, l.signature AS signature, l._id AS _id,
        l.block_height AS block_height, l.decoded_args AS decoded_args, l.timestamp AS timestamp,
        arg.value AS value
      FROM contract_l1_logs l
      LEFT JOIN contract_l1_args arg ON (
        l._id = arg.contract_l1_log_id AND (
          (arg.key = 'sender' AND l.signature IN (${inList(SENDER_SIGNATURES)}))
          OR (arg.key = 'delegator' AND l.signature IN (${inList(DELEGATOR_SIGNATURES)}))
        )
      )
      WHERE l._id = @id
        AND l.signature IN (${inList([...SENDER_SIGNATURES, ...DELEGATOR_SIGNATURES])})
    `;
    return this.db.prepare(sql).get({ id }) as StakingLogEventById | undefined;
  }

  recentArgLogs(argKey: string, limit: number): ArgLogRow[] {
    const sql = `
      SELECT ca.value AS value, l.timestamp AS timestamp, l.tx_hash AS txHash, l.block_height AS blockHeight
      FROM contract_l1_logs l
      JOIN contract_l1_args ca ON ca.contract_l1_log_id = l._id AND ca.key = @argKey
      ORDER BY l.timestamp DESC
      LIMIT @limit
    `;
    return this.db.prepare(sql).all({ argKey, limit }) as ArgLogRow[];
  }

  firstArgLogAtOrAfter(
    argKey: string,
    minValue: number,
  ): ArgLogRow | undefined {
    const sql = `
      SELECT ca.value AS value, l.timestamp AS timestamp, l.tx_hash AS txHash, l.block_height AS blockHeight
      FROM contract_l1_logs l
      JOIN contract_l1_args ca ON ca.contract_l1_log_id = l._id
        AND ca.key = @argKey AND CAST(ca.value AS INTEGER) >= @minValue
      ORDER BY l.timestamp ASC
      LIMIT 1
    `;
    return this.db.prepare(sql).get({ argKey, minValue }) as
      | ArgLogRow
      | undefined;
  }

  close(): void {
    this.db.close();
  }
}

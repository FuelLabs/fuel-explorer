import { setTimeout } from 'node:timers/promises';
import type { ethers } from 'ethers';
import { env } from '~/config';
import { logger } from '~/core/Logger';
import { DatabaseConnection } from '~/infra/database/DatabaseConnection';
import { createL1Provider } from './createL1Provider';

type RecentLogRow = {
  block_height: number;
  stored_hash: string | null;
  contract_hash: string;
};

export default class L1ReorgSentinel {
  protected createProvider(): ethers.JsonRpcProvider {
    return createL1Provider();
  }

  // Sample up to this many most-recent rows per contract. Covers one-batch bursts
  // on busy contracts (e.g. FuelMessagePortal) without over-sampling quiet ones.
  // 20 rows × 7 active contracts ≈ 140 unique (block_height, contract) pairs per cycle.
  protected readonly rowsPerContract = 20;

  async checkOnce(): Promise<void> {
    const connection = DatabaseConnection.getInstance();
    const network = env.get('FUEL_CHAIN') || '';
    // Per-contract sample, scoped to active contracts for the current network.
    // Prevents (a) one busy contract monopolizing a global LIMIT window and
    // (b) false positives from stale/inactive/cross-network rows in the table.
    const rows = (await connection.query(
      `select ranked.block_height, ranked.stored_hash, ranked.contract_hash
         from (
           select l.block_height,
                  l.raw_log->>'blockHash' as stored_hash,
                  l.contract_hash,
                  row_number() over (partition by l.contract_hash order by l._id desc) as rn
             from indexer.contract_l1_logs l
             join indexer.contract_l1_index i
               on i.contract_hash = l.contract_hash
            where i.status = 'active' and i.network = $1
         ) ranked
        where ranked.rn <= $2`,
      [network, this.rowsPerContract],
    )) as RecentLogRow[];

    if (rows.length === 0) return;

    const provider = this.createProvider();
    // Bucket by (contract_hash, block_height) so we fetch each canonical block
    // once even when a contract emits multiple logs at the same height.
    const byHeight = new Map<number, RecentLogRow[]>();
    for (const row of rows) {
      const bucket = byHeight.get(row.block_height) ?? [];
      bucket.push(row);
      byHeight.set(row.block_height, bucket);
    }

    for (const [height, group] of byHeight) {
      let canonicalHash: string | null = null;
      try {
        const block = await provider.getBlock(height);
        canonicalHash = block?.hash ?? null;
      } catch (error: any) {
        logger.debug(
          'L1ReorgSentinel',
          `Failed to fetch canonical block ${height}: ${error.message}`,
        );
        continue;
      }
      // Provider returned null for a block we have stored rows for. For a
      // finalized-depth height this is itself suspicious — a truly absent
      // block would mean the stored row references an orphaned chain. Upgrade
      // severity from silent-skip to explicit warn so ops can spot it.
      if (!canonicalHash) {
        const storedHashes = group
          .map((r) => r.stored_hash)
          .filter((h): h is string => Boolean(h));
        if (storedHashes.length > 0) {
          logger.warn(
            'L1ReorgSentinel',
            `Provider returned no block at finalized-depth height ${height}; stored rows reference: ${storedHashes.join(', ')}`,
          );
        }
        continue;
      }

      for (const row of group) {
        if (!row.stored_hash) continue;
        if (row.stored_hash.toLowerCase() === canonicalHash.toLowerCase())
          continue;
        // Loud alert. Log routing / on-call tooling should key on the
        // [L1_REORG_ALERT] literal or the "L1ReorgSentinel" tag.
        logger.error(
          'L1ReorgSentinel',
          '[L1_REORG_ALERT] Stored L1 block hash diverges from canonical',
          {
            block_height: row.block_height,
            stored_hash: row.stored_hash,
            canonical_hash: canonicalHash,
            contract_hash: row.contract_hash,
          },
        );
      }
    }
  }

  async execute(): Promise<void> {
    while (true) {
      try {
        await this.checkOnce();
      } catch (error: any) {
        logger.debug('L1ReorgSentinel', `checkOnce threw: ${error.message}`);
      }
      await setTimeout(60000);
    }
  }
}

import { setTimeout } from 'node:timers/promises';
import type { ethers } from 'ethers';
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

  async checkOnce(): Promise<void> {
    const connection = DatabaseConnection.getInstance();
    const rows = (await connection.query(
      `select block_height,
              raw_log->>'blockHash' as stored_hash,
              contract_hash
       from indexer.contract_l1_logs
       order by _id desc
       limit 20`,
      [],
    )) as RecentLogRow[];

    if (rows.length === 0) return;

    const provider = this.createProvider();
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
      if (!canonicalHash) continue;

      for (const row of group) {
        if (!row.stored_hash) continue;
        if (row.stored_hash.toLowerCase() === canonicalHash.toLowerCase())
          continue;
        logger.error('L1ReorgSentinel', 'Reorg detected', {
          block_height: row.block_height,
          stored_hash: row.stored_hash,
          canonical_hash: canonicalHash,
          contract_hash: row.contract_hash,
        });
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

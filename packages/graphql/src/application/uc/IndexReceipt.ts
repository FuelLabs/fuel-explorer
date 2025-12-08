import { BN, Interface } from 'fuels';
import { logger } from '~/core/Logger';
import ReceiptsParser from '~/domain/Transaction/ReceiptsParser';
import type { GQLReceipt } from '~/graphql/generated/sdk';
import { bridgeAbi } from '~/infra/abi/BridgeAbi';
import type Transaction from '~/infra/dao/Transaction';
import { DatabaseConnection } from '~/infra/database/DatabaseConnection';

/** Parsed receipt from ReceiptsParser with indent metadata */
interface ParsedReceipt {
  indent: number;
  arrow: string;
  type: string;
  data: GQLReceipt;
}

/** Row returned from INSERT...RETURNING */
interface InsertedReceiptRow {
  _id: string;
  receipt_rb?: string | null;
  receipt_data?: string | null;
  receipt_id?: string | null;
  receipt_type?: string | null;
}

// PostgreSQL parameter limits
// Each receipt has 32 params, limit ~65k params → ~2000 receipts per batch
// Using conservative 1000 for safety margin
const PARAMS_PER_RECEIPT = 32;
const MAX_PARAMS = 32000;
const MAX_RECEIPTS_PER_BATCH = Math.floor(MAX_PARAMS / PARAMS_PER_RECEIPT);

// Bridge contract addresses for log decoding
const BRIDGE_CONTRACTS = [
  '0xd02112ef9c39f1cea7c8527c26242ca1f5d26bcfe8d1564bee054d3b04175471', // testnet
  '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8', // mainnet
];

export default class IndexReceipts {
  async execute(transaction: Transaction) {
    const connection = DatabaseConnection.getInstance();
    const parser = new ReceiptsParser();
    const contract = new Interface(bridgeAbi);
    const receipts = parser.parse(transaction.data.status.receipts);

    if (receipts.length === 0) {
      logger.debug(
        'IndexReceipts',
        `No receipts for tx ${transaction.transactionHash}`,
      );
      return;
    }

    logger.debug(
      'IndexReceipts',
      `Processing ${receipts.length} receipts for tx ${transaction.transactionHash}`,
    );

    // Process receipts in batches to avoid PostgreSQL parameter limits
    const allInsertedRows: InsertedReceiptRow[] = [];
    const batchCount = Math.ceil(receipts.length / MAX_RECEIPTS_PER_BATCH);

    for (let i = 0; i < receipts.length; i += MAX_RECEIPTS_PER_BATCH) {
      const batchNum = Math.floor(i / MAX_RECEIPTS_PER_BATCH) + 1;
      const batch = receipts.slice(i, i + MAX_RECEIPTS_PER_BATCH);

      if (batchCount > 1) {
        logger.debug(
          'IndexReceipts',
          `Inserting batch ${batchNum}/${batchCount} (${batch.length} receipts)`,
        );
      }

      const insertedRows = await this.insertReceiptsBatch(
        connection,
        transaction,
        batch,
      );
      allInsertedRows.push(...insertedRows);
    }

    logger.debug(
      'IndexReceipts',
      `Inserted ${allInsertedRows.length} receipts for tx ${transaction.transactionHash}`,
    );

    // Process bridge contract logs (also batched)
    await this.processBridgeLogs(connection, contract, allInsertedRows);
  }

  private async insertReceiptsBatch(
    connection: DatabaseConnection,
    transaction: Transaction,
    receipts: ParsedReceipt[],
  ): Promise<InsertedReceiptRow[]> {
    // Build placeholders using base offset pattern
    const placeholders = receipts
      .map((_, idx) => {
        const base = idx * PARAMS_PER_RECEIPT;
        const params = Array.from(
          { length: PARAMS_PER_RECEIPT },
          (_, i) => `$${base + i + 1}`,
        );
        return `(${params.join(', ')})`;
      })
      .join(', ');

    // Flatten all values
    const values: (string | number | null | undefined)[] = [];
    for (const receipt of receipts) {
      values.push(
        transaction.blockId,
        transaction.id,
        transaction.transactionHash,
        receipt.indent,
        receipt.data.amount,
        receipt.data.assetId,
        receipt.data.contractId,
        receipt.data.data,
        receipt.data.digest,
        receipt.data.gas,
        receipt.data.gasUsed,
        receipt.data.id,
        receipt.data.is,
        receipt.data.len,
        receipt.data.nonce,
        receipt.data.param1,
        receipt.data.param2,
        receipt.data.pc,
        receipt.data.ptr,
        receipt.data.ra,
        receipt.data.rb,
        receipt.data.rc,
        receipt.data.rd,
        receipt.data.reason,
        receipt.data.receiptType,
        receipt.data.recipient,
        receipt.data.result,
        receipt.data.sender,
        receipt.data.subId,
        receipt.data.to,
        receipt.data.toAddress,
        receipt.data.val,
      );
    }

    return connection.query(
      `INSERT INTO indexer.receipts (
        block_id, transaction_id, tx_hash, indent,
        receipt_amount, receipt_asset_id, receipt_contract_id, receipt_data,
        receipt_digest, receipt_gas, receipt_gas_used, receipt_id,
        receipt_is, receipt_len, receipt_nonce, receipt_param1,
        receipt_param2, receipt_pc, receipt_ptr, receipt_ra,
        receipt_rb, receipt_rc, receipt_rd, receipt_reason,
        receipt_type, receipt_recipient, receipt_result, receipt_sender,
        receipt_sub_id, receipt_to, receipt_to_address, receipt_val
      ) VALUES ${placeholders}
      ON CONFLICT DO NOTHING
      RETURNING _id, receipt_rb, receipt_data, receipt_id, receipt_type`,
      values,
    );
  }

  private async processBridgeLogs(
    connection: DatabaseConnection,
    contract: Interface,
    insertedRows: InsertedReceiptRow[],
  ): Promise<void> {
    // Collect all receipts_data entries
    const dataEntries: { receiptId: string; key: string; value: string }[] = [];

    for (const row of insertedRows) {
      if (
        row.receipt_data &&
        row.receipt_rb &&
        row.receipt_id &&
        (row.receipt_type === 'LOG' || row.receipt_type === 'LOG_DATA') &&
        BRIDGE_CONTRACTS.includes(row.receipt_id)
      ) {
        try {
          const [log] = contract.decodeLog(row.receipt_data, row.receipt_rb);
          const data = this.flattenObject(log);
          for (const key in data) {
            const val = data[key];
            if (val == null) continue;
            const value = Array.isArray(val)
              ? JSON.stringify(val)
              : String(val);
            dataEntries.push({
              receiptId: row._id,
              key,
              value,
            });
          }
        } catch (error: any) {
          logger.debug(
            'IndexReceipts',
            `Failed to decode bridge log for receipt ${row._id}: ${error.message}`,
          );
        }
      }
    }

    if (dataEntries.length === 0) return;

    logger.debug(
      'IndexReceipts',
      `Processing ${dataEntries.length} bridge log entries`,
    );

    // Batch insert receipts_data (3 params per entry)
    const PARAMS_PER_DATA_ENTRY = 3;
    const MAX_DATA_ENTRIES_PER_BATCH = Math.floor(
      MAX_PARAMS / PARAMS_PER_DATA_ENTRY,
    );

    for (let i = 0; i < dataEntries.length; i += MAX_DATA_ENTRIES_PER_BATCH) {
      const batch = dataEntries.slice(i, i + MAX_DATA_ENTRIES_PER_BATCH);

      const placeholders = batch
        .map((_, idx) => {
          const base = idx * PARAMS_PER_DATA_ENTRY;
          return `($${base + 1}, $${base + 2}, $${base + 3})`;
        })
        .join(', ');

      const values: string[] = [];
      for (const entry of batch) {
        values.push(entry.receiptId, entry.key, entry.value);
      }

      await connection.query(
        `INSERT INTO indexer.receipts_data (receipt_id, key, value) 
         VALUES ${placeholders}`,
        values,
      );
    }

    logger.debug(
      'IndexReceipts',
      `Inserted ${dataEntries.length} bridge log entries`,
    );
  }

  flattenObject(obj: any, prefix = ''): Record<string, any> {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value) &&
        !(value instanceof BN)
      ) {
        Object.assign(result, this.flattenObject(value, newKey));
      } else {
        if (value instanceof BN) {
          result[newKey] = value.toString();
        } else {
          result[newKey] = value;
        }
      }
    }
    return result;
  }
}

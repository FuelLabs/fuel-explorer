import { logger } from '~/core/Logger';
import ReceiptsParser from '~/domain/Transaction/ReceiptsParser';
import type { GQLReceipt } from '~/graphql/generated/sdk';
import type Transaction from '~/infra/dao/Transaction';
import { DatabaseConnection } from '~/infra/database/DatabaseConnection';

/** Parsed receipt from ReceiptsParser with indent metadata */
interface ParsedReceipt {
  indent: number;
  arrow: string;
  type: string;
  data: GQLReceipt;
}

// PostgreSQL parameter limits
// Each receipt has 32 params, limit ~65k params → ~2000 receipts per batch
const PARAMS_PER_RECEIPT = 32;
const MAX_PARAMS = 32000;
const MAX_RECEIPTS_PER_BATCH = Math.floor(MAX_PARAMS / PARAMS_PER_RECEIPT);

export default class IndexReceipts {
  async execute(transaction: Transaction) {
    const connection = DatabaseConnection.getInstance();
    const parser = new ReceiptsParser();
    const receipts = parser.parse(transaction.data.status.receipts);

    // Only persist MESSAGE_OUT receipts — the only type read by the API (BridgeDAO).
    // All other receipt types are stored in transactions.data JSONB and never queried
    // from the receipts table, saving ~99.99% of storage.
    const messageOutReceipts = receipts.filter(
      (r) => r.data.receiptType === 'MESSAGE_OUT',
    );

    if (messageOutReceipts.length === 0) return;

    logger.debug(
      'IndexReceipts',
      `Inserting ${messageOutReceipts.length} MESSAGE_OUT receipts for tx ${transaction.transactionHash}`,
    );

    for (
      let i = 0;
      i < messageOutReceipts.length;
      i += MAX_RECEIPTS_PER_BATCH
    ) {
      const batch = messageOutReceipts.slice(i, i + MAX_RECEIPTS_PER_BATCH);
      await this.insertReceiptsBatch(connection, transaction, batch);
    }
  }

  private async insertReceiptsBatch(
    connection: DatabaseConnection,
    transaction: Transaction,
    receipts: ParsedReceipt[],
  ): Promise<void> {
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

    await connection.query(
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
      ON CONFLICT DO NOTHING`,
      values,
    );
  }
}

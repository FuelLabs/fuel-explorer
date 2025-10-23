import { BN, Interface } from 'fuels';
import ReceiptsParser from '~/domain/Transaction/ReceiptsParser';
import { bridgeAbi } from '~/infra/abi/BridgeAbi';
import type Transaction from '~/infra/dao/Transaction';
import { DatabaseConnection } from '~/infra/database/DatabaseConnection';

export default class IndexReceipts {
  async execute(transaction: Transaction) {
    const connection = DatabaseConnection.getInstance();
    const parser = new ReceiptsParser();
    const contract = new Interface(bridgeAbi);
    const receipts = parser.parse(transaction.data.status.receipts);
    for (const receipt of receipts) {
      const [row] = await connection.query(
        `
            insert into indexer.receipts (
                block_id,
                transaction_id,
                tx_hash,
                indent,
                receipt_amount,
                receipt_asset_id,
                receipt_contract_id,
                receipt_data,
                receipt_digest,
                receipt_gas,
                receipt_gas_used,
                receipt_id,
                receipt_is,
                receipt_len,
                receipt_nonce,
                receipt_param1,
                receipt_param2,
                receipt_pc,
                receipt_ptr,
                receipt_ra,
                receipt_rb,
                receipt_rc,
                receipt_rd,
                receipt_reason,
                receipt_type,
                receipt_recipient,
                receipt_result,
                receipt_sender,
                receipt_sub_id,
                receipt_to,
                receipt_to_address,
                receipt_val
            ) VALUES (
                $1,  $2,  $3,  $4,  $5,  $6,  $7,  $8,  $9, $10, 
                $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
                $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, 
                $31, $32
            ) on conflict do nothing returning _id;
        `,
        [
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
        ],
      );
      const contracts = [
        '0xd02112ef9c39f1cea7c8527c26242ca1f5d26bcfe8d1564bee054d3b04175471', // testnet
        '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8', // mainnet
      ];
      if (
        receipt.data.data &&
        receipt.data.rb &&
        (receipt.type === 'LOG' || receipt.type === 'LOG_DATA') &&
        contracts.includes(receipt.data.id)
      ) {
        try {
          const [log] = contract.decodeLog(receipt.data.data, receipt.data.rb);
          const data = this.flattenObject(log);
          for (const key in data) {
            await connection.query(
              'insert into indexer.receipts_data (receipt_id, key, value) values ($1, $2, $3)',
              [row._id, key, data[key]],
            );
          }
        } catch (_: any) {}
      }
    }
  }

  flattenObject(obj: any, prefix = '') {
    const result: any = {};
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

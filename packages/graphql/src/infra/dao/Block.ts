import { Signer } from 'fuels';
import { Address } from '~/core/Address';
import { DateHelper } from '~/core/Date';
import { TransactionEntity } from '~/domain/Transaction/TransactionEntity';
import type { GQLBlock } from '~/graphql/generated/sdk-provider';

export default class Block {
  id: number;
  blockHash: string;
  data: any;
  producer: string | null;
  time: any;
  totalGasUsed: number;
  transactions: TransactionEntity[];
  timestamp: Date;

  constructor(block: any) {
    this.id = parseInt(block.data.header.height);
    this.blockHash = block.data.id;
    this.data = block.data;
    const date = DateHelper.tai64toDate(block.data.header.time);
    this.timestamp = date.toDate();
    this.time = {
      fromNow: date.fromNow(),
      full: date.format('DD MMM YYYY - HH:mm:ss A'),
      rawTai64: date.toString(),
      rawUnix: date.unix().toString(),
    };
    this.totalGasUsed = 0;
    for (const transaction of block.data.transactions) {
      this.totalGasUsed += parseInt(transaction.status.totalGas);
    }
    const blockSignature =
      block.data.consensus.__typename === 'PoAConsensus'
        ? block.data.consensus?.signature
        : null;
    this.producer = null;
    if (blockSignature) {
      const producerAddress = Signer.recoverAddress(
        block.data.id,
        blockSignature || '',
      ).toB256();
      this.producer = new Address(producerAddress).raw() || null;
    }
    this.transactions = block.data.transactions.map((t: any, i: any) =>
      TransactionEntity.createFromGQL(t, this.id, i),
    );
  }

  getTransactions() {
    return this.transactions.map((t) => t.toGQLNode());
  }

  toGQLNode(): GQLBlock {
    const data = this.data;
    return {
      ...data,
      _id: this.id,
      producer: this.producer,
      time: this.time,
      totalGasUsed: `${this.totalGasUsed}`,
      transactions: this.transactions.map((t) => t.toGQLNode()),
    };
  }

  toTPSNode() {
    const _data = this.data;
    return {
      blockNo: String(this.id),
      producer: this.producer,
      timestamp: this.time.rawUnix,
      gasUsed: `${this.totalGasUsed}`,
      tps: String(this.transactions.length),
    };
  }
}

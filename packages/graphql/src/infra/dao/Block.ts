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
  totalFee: number;
  transactions: TransactionEntity[];
  timestamp: Date;

  constructor(block: any) {
    this.id = Number.parseInt(block.data.header.height);
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

    const incomingFeeData = !!block.total_fee;
    const incomingBlockData = !!block.gas_used;
    this.totalFee = Number.parseInt(block.total_fee ?? 0);
    this.totalGasUsed = Number.parseInt(block.gas_used ?? 0);
    if (!incomingFeeData || !incomingBlockData) {
      for (const transaction of block.data.transactions) {
        if (!incomingFeeData)
          this.totalFee += Number.parseInt(transaction.status?.totalFee ?? '0');
        if (!incomingBlockData)
          this.totalGasUsed += Number.parseInt(
            transaction.status?.totalGas ?? '0',
          );
      }
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
      ).toString();
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
      totalFee: `${this.totalFee}`,
      transactions: this.transactions.map((t) => t.toGQLNode()),
    };
  }
}

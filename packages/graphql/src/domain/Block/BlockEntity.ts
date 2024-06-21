import { Hash256, Timestamp } from '~/application/vo';
import { ParsedTime } from '~/application/vo/ParsedTime';
import { Entity } from '~/core/Entity';
import type { GQLBlock } from '~/graphql/generated/sdk-provider';
import type { BlockItem } from './BlockModel';
import { BlockData } from './vo/BlockData';
import { BlockGasUsed } from './vo/BlockGasUsed';
import { BlockModelID } from './vo/BlockModelID';
import { BlockProducer } from './vo/BlockProducer';

import { TransactionEntity } from '../Transaction/TransactionEntity';
import type { TransactionItem } from '../Transaction/TransactionModel';

type BlockInputProps = {
  blockHash: Hash256;
  data: BlockData;
  producer: BlockProducer;
  time: ParsedTime;
  totalGasUsed: BlockGasUsed;
  transactions: TransactionEntity[];
};

export class BlockEntity extends Entity<BlockInputProps, BlockModelID> {
  static create(
    block: BlockItem,
    producerId: string | null,
    transactions: TransactionItem[],
  ) {
    const item = block.data;
    if (!item) {
      throw new Error('item is required');
    }

    const id = BlockModelID.create(item);
    const blockHash = Hash256.create(item.id);
    const data = BlockData.create(item);
    const timestamp = Timestamp.create(item.header.time);
    const time = ParsedTime.create(item.header.time);
    const totalGasUsed = BlockGasUsed.create(item);
    const producer = BlockProducer.create(producerId);

    const props = {
      blockHash,
      data,
      totalGasUsed,
      time,
      timestamp,
      producer,
      transactions: transactions.map((t) => TransactionEntity.create(t)),
    };

    return new BlockEntity(props, id);
  }

  static toDBItem(block: GQLBlock, producerId: string | null): BlockItem {
    return {
      _id: Number(block.header.height),
      blockHash: block.id,
      data: block,
      producer: producerId,
      timestamp: Timestamp.create(block.header.time).value(),
      totalGasUsed: BlockGasUsed.create(block).value(),
    };
  }

  get blockHash() {
    return this.props.blockHash.value();
  }

  get data() {
    return this.props.data.value();
  }

  get producer() {
    return this.props.producer.value()?.raw() ?? null;
  }

  get time() {
    return this.props.time.value();
  }

  get totalGasUsed() {
    return this.props.totalGasUsed.value();
  }

  get transactions() {
    return this.props.transactions.map((t) => t.toGQLNode());
  }

  toGQLNode(): GQLBlock {
    const data = this.data;
    return {
      ...data,
      producer: this.producer,
      time: this.time,
      totalGasUsed: this.totalGasUsed,
      transactions: this.transactions,
    };
  }
}
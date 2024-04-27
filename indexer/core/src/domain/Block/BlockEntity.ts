import { Hash256, Timestamp } from '@core/application/vo';
import { ParsedTime } from '@core/application/vo/ParsedTime';
import type { GQLBlock } from '@core/generated/gql-types';
import { Entity } from '@core/shared/Entity';
import type { NodeItem } from '../Node/NodeModel';
import { TransactionEntity } from '../Transaction/TransactionEntity';
import type { BlockItem, BlockPayload } from './BlockModel';
import { BlockGasUsed } from './vo/BlockGasUsed';
import { BlockModelID } from './vo/BlockModelID';
import { BlockNodeRef } from './vo/BlockNodeRef';
import { BlockProducer } from './vo/BlockProducer';

type BlockInputProps = {
  blockHash: Hash256;
  data: BlockNodeRef;
  producer: BlockProducer;
  time: ParsedTime;
  totalGasUsed: BlockGasUsed;
  transactions: TransactionEntity[];
};

export class BlockEntity extends Entity<BlockInputProps, BlockModelID> {
  static create(payload: BlockPayload | null) {
    if (!payload) {
      throw new Error('Payload is required for create BlockEntity');
    }

    const data = BlockNodeRef.create(payload.node);
    const block = data.value();
    const id = BlockModelID.create(block);
    const blockHash = Hash256.create(block.id);
    const timestamp = Timestamp.create(block.header.time);
    const time = ParsedTime.create(block.header.time);
    const totalGasUsed = BlockGasUsed.create(block);
    const producer = BlockProducer.create(block);
    const props = {
      blockHash,
      data,
      totalGasUsed,
      time,
      timestamp,
      producer,
      transactions: payload.transactions.map((tx) =>
        TransactionEntity.create(tx),
      ),
    };

    return new BlockEntity(props, id);
  }

  static toDBItem(node: NodeItem): BlockItem {
    const block = node.data as GQLBlock;
    return {
      _id: BlockModelID.create(block).value(),
      blockHash: Hash256.create(block.id).value(),
      nodeRef: BlockNodeRef.create(node).id(),
      producer: BlockProducer.create(block).value()?.toB256() ?? null,
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
    return this.props.producer.value()?.toB256() ?? null;
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

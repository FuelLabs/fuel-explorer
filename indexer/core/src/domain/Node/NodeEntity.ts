import type { GQLBlock, GQLTransaction } from '@core/generated/gql-types';
import { Entity } from '@core/shared/Entity';
import type { NodeItem } from './NodeModel';
import { NodeData } from './vo/NodeData';
import { NodeID } from './vo/NodeID';
import { NodeType, type NodeTypeEnum } from './vo/NodeType';

export type GQLNodeType = GQLBlock | GQLTransaction;
type NodeProps = {
  id: NodeID;
  type: NodeType;
  data: NodeData;
};

export class NodeEntity extends Entity<NodeProps, NodeID> {
  static create(node: NodeItem) {
    const id = NodeID.create(node.id);
    const type = NodeType.create(node.type);
    const data = NodeData.create(node.data, type);
    return new NodeEntity({ id, type, data }, id);
  }

  static toDBItem(
    node: GQLNodeType,
    type: keyof typeof NodeTypeEnum,
  ): NodeItem {
    return {
      type,
      status: 'not_synced',
      id: node.id,
      data: node,
    };
  }

  get blockData() {
    return this.props.data.value() as GQLBlock;
  }
  get transactionData() {
    return this.props.data.value() as GQLTransaction;
  }
  get data() {
    return this.props.data;
  }
  get type() {
    return this.props.type;
  }
  get id() {
    return this.props.id;
  }
  get isBlock() {
    return this.type.is('Block');
  }
  get isTransaction() {
    return this.type.is('Transaction');
  }

  toNodeItem(): NodeItem {
    return NodeEntity.toDBItem(this.props.data.value(), this.type.value());
  }
}

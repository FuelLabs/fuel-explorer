import { type NodeItem, NodesTable } from '@core/domain/Node/NodeModel';
import type { GQLTransaction } from '@core/generated/gql-types';
import { ValueObject } from '@core/shared/ValueObject';
import { varchar } from 'drizzle-orm/pg-core';

interface Props {
  value: GQLTransaction;
  node: NodeItem;
}

export class TransactionNodeRef extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return varchar('node_data_id', { length: 66 })
      .notNull()
      .references(() => NodesTable.id);
  }

  static create(node?: NodeItem | null) {
    if (!node) {
      throw new Error('Node is required for create TransactionNodeRef');
    }

    const value = node.data;
    return new TransactionNodeRef({ value, node });
  }

  value() {
    return this.props.value;
  }
  id() {
    return this.props.node.id;
  }
}

import type { GQLBlock, GQLTransaction } from '@core/generated/gql-types';
import { ValueObject } from '@core/shared/ValueObject';
import { jsonb } from 'drizzle-orm/pg-core';
import { type NodeType, NodeTypeEnum } from './NodeType';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Value = any;
interface Props {
  value: Value;
}

export class NodeData extends ValueObject<Props> {
  private constructor(
    props: Props,
    private readonly type: NodeType,
  ) {
    super(props);
  }

  static type() {
    return jsonb('data').notNull().$type<Value>();
  }

  static create(value: Value, type: NodeType) {
    return new NodeData({ value }, type);
  }

  value() {
    if (this.type.value() === NodeTypeEnum.Block) {
      return this.props.value as GQLBlock;
    }
    return this.props.value as GQLTransaction;
  }
}

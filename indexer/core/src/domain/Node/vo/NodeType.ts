import { ValueObject } from '@core/shared/ValueObject';
import { pgEnum } from 'drizzle-orm/pg-core';

export enum NodeTypeEnum {
  Block = 'Block',
  Transaction = 'Transaction',
}

interface Props {
  value: NodeTypeEnum;
}

export const typeEnum = pgEnum('type', ['Block', 'Transaction']);

export class NodeType extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return typeEnum('type').notNull();
  }

  static create(type: string) {
    const value =
      type === 'Block' ? NodeTypeEnum.Block : NodeTypeEnum.Transaction;
    return new NodeType({ value });
  }

  value() {
    return this.props.value;
  }

  is(type: keyof typeof NodeTypeEnum) {
    return this.props.value === NodeTypeEnum[type];
  }
}

import { ValueObject } from '@core/shared/ValueObject';
import { pgEnum } from 'drizzle-orm/pg-core';

export enum NodeStatusEnum {
  NotSynced = 'not_synced',
  Synced = 'synced',
  Dirty = 'dirty',
}

export const statusEnum = pgEnum('status', ['not_synced', 'synced', 'dirty']);

interface Props {
  value: NodeStatusEnum;
}

export class NodeStatus extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return statusEnum('status').default('not_synced');
  }

  static create(value: NodeStatusEnum) {
    return new NodeStatus({ value });
  }

  value() {
    return this.props.value;
  }
}

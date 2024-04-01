import { integer } from 'drizzle-orm/pg-core';
import { ValueObject } from '~/core/ValueObject';
import { BridgeBlocksTable } from '~/domain/BridgeBlock/BridgeBlockModel';

interface Props {
  value: number;
}

export class BridgeContractLogBlockNumber extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return integer('block_number')
      .notNull()
      .references(() => BridgeBlocksTable.number);
  }

  static create(value: number) {
    return new BridgeContractLogBlockNumber({ value });
  }

  value() {
    return this.props.value;
  }
}

import { ValueObject } from '~/core/ValueObject';
import type { TxID } from './TransactionModelID';

interface Props {
  value: TxID;
}

export class TransactionRef extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static create(value: TxID) {
    return new TransactionRef({ value });
  }

  value() {
    return this.props.value;
  }
}

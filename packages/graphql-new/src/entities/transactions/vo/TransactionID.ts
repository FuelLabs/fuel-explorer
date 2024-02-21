import { integer } from 'drizzle-orm/pg-core';
import { getBytesCopy } from 'ethers';
import { TxPointerCoder } from 'fuels';
import { GQLTransaction } from '~/generated/types';
import { ValueObject } from '~/shared/domain/ValueObject';

interface Props {
  value: number;
}

export class TransactionID extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return integer('_id').primaryKey();
  }

  static create(transaction: GQLTransaction) {
    const rawPayload = transaction.rawPayload;
    const encoded = getBytesCopy(rawPayload);
    const [decoded, _offset] = new TxPointerCoder().decode(encoded, 0);
    return new TransactionID({ value: decoded.txIndex });
  }

  get() {
    return this.props.value;
  }
}

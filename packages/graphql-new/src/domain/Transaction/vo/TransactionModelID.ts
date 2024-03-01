import { integer } from 'drizzle-orm/pg-core';
import { getBytesCopy } from 'ethers';
import { TxPointerCoder } from 'fuels';
import { Identifier } from '~/core/Identifier';
import { GQLTransaction } from '~/graphql/generated/sdk';

export class TransactionModelID extends Identifier<number> {
  private constructor(id: number) {
    super(id);
  }

  static type() {
    return integer('_id').primaryKey();
  }

  static create(transaction: GQLTransaction) {
    const rawPayload = transaction.rawPayload;
    const encoded = getBytesCopy(rawPayload);
    const [decoded, _offset] = new TxPointerCoder().decode(encoded, 0);
    return new TransactionModelID(decoded.txIndex);
  }
}

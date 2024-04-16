import { type BN, getGasUsedFromReceipts, processGqlReceipt } from 'fuels';
import { ValueObject } from '~/core/ValueObject';
import type { GQLTransaction } from '~/graphql/generated/sdk';

interface Props {
  value: BN;
}

export class GasUsed extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static create(transaction: GQLTransaction) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const receipts = (transaction.receipts ?? []) as any[];
    const decodedReceipts = receipts.map(processGqlReceipt);
    const value = getGasUsedFromReceipts(decodedReceipts);
    return new GasUsed({ value });
  }

  value() {
    return this.props.value;
  }
}

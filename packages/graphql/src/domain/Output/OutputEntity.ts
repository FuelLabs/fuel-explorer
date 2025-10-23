import { SerialID } from '~/application/vo';
import { Entity } from '~/core/Entity';
import type { GQLOutput } from '~/graphql/generated/sdk-provider';
import type { TxID } from '../Transaction/vo/TransactionModelID';
import { OutputData } from './vo/OutputData';

type OutputProps = {
  id: SerialID | null | undefined;
  data: OutputData;
};

export class OutputEntity extends Entity<
  OutputProps,
  SerialID | null | undefined
> {
  static create(output: any, outputId?: number) {
    if (!output?.data) {
      throw new Error('Output data is required');
    }

    const id = outputId ? SerialID.create(outputId) : null;
    const data = OutputData.create(output.data);
    return new OutputEntity({ id, data }, id);
  }

  static toDBItem(output: GQLOutput, transactionId: TxID): any {
    return {
      data: output,
      transactionId,
    };
  }

  get cursor() {
    return this.props.id?.value();
  }

  get data() {
    return this.props.data.value();
  }
}

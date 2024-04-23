import { SerialID } from '@core/application/vo';
import type { GQLOutput } from '@core/generated/gql-types';
import { Entity } from '@core/shared/Entity';
import type { TxID } from '../Transaction/vo/TransactionModelID';
import type { OutputItem, OutputPayload } from './OutputModel';
import { OutputData } from './vo/OutputData';

type OutputProps = {
  data: OutputData;
};

export class OutputEntity extends Entity<
  OutputProps,
  SerialID | null | undefined
> {
  static create(output: OutputPayload, outputId?: number) {
    if (!output?.data) {
      throw new Error('Output data is required');
    }

    const id = outputId ? SerialID.create(outputId) : null;
    const data = OutputData.create(output.data);
    return new OutputEntity({ data }, id);
  }

  static toDBItem(
    output: GQLOutput,
    transactionId: TxID,
  ): Omit<OutputItem, '_id'> {
    const data = OutputData.create(output).value();
    return { data, transactionId };
  }

  get data() {
    return this.props.data.value();
  }
}

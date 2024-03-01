import { SerialID } from '~/application/vo';
import { Entity } from '~/core/Entity';
import { GQLOutput } from '~/generated/types';
import { OutputItem } from './OutputModel';
import { OutputData } from './vo/OutputData';

type OutputProps = {
  data: OutputData;
};

export class OutputEntity extends Entity<OutputProps, SerialID> {
  private constructor(id: SerialID, props: OutputProps) {
    super(id, props);
  }

  static create(output: OutputItem) {
    const id = SerialID.create(output._id);
    const data = OutputData.create(output.data);
    return new OutputEntity(id, { data });
  }

  static toDBItem(output: GQLOutput, transactionId: number) {
    const data = OutputData.create(output).value();
    return { data, transactionId };
  }

  get data() {
    return this.props.data.value();
  }
}

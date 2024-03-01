import { SerialID } from '~/application/vo';
import { Entity } from '~/core/Entity';
import { GQLInput } from '~/graphql/generated/sdk';
import { InputItem } from './InputModel';
import { InputData } from './vo/InputData';

type InputProps = {
  data: InputData;
};

export class InputEntity extends Entity<InputProps, SerialID> {
  private constructor(id: SerialID, props: InputProps) {
    super(id, props);
  }

  static create(input: InputItem) {
    const id = SerialID.create(input._id);
    const data = InputData.create(input.data);
    return new InputEntity(id, { data });
  }

  static toDBItem(input: GQLInput, transactionId: number) {
    const data = InputData.create(input).value();
    return { data, transactionId };
  }

  get data() {
    return this.props.data.value();
  }
}

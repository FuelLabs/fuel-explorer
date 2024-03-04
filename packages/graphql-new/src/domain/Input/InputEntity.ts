import { SerialID } from '~/application/vo';
import { Entity } from '~/core/Entity';
import { GQLInput } from '~/graphql/generated/sdk';
import { InputItem, InputPayload } from './InputModel';
import { InputData } from './vo/InputData';

type InputProps = {
  data: InputData;
};

export class InputEntity extends Entity<
  InputProps,
  SerialID | null | undefined
> {
  static create(input: InputPayload, inputId?: number) {
    if (!input?.data) {
      throw new Error('Input data is required');
    }

    const id = inputId ? SerialID.create(inputId) : null;
    const data = InputData.create(input.data);
    return new InputEntity({ data }, id);
  }

  static toDBItem(
    input: GQLInput,
    transactionId: number,
  ): Omit<InputItem, '_id'> {
    const data = InputData.create(input).value();
    return { data, transactionId };
  }

  get data() {
    return this.props.data;
  }
}

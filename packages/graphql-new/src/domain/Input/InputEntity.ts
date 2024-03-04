import { SerialID } from '~/application/vo';
import { Entity } from '~/core/Entity';
import {
  GQLInput,
  GQLInputCoin,
  GQLInputMessage,
} from '~/graphql/generated/sdk';
import { InputItem, InputPayload } from './InputModel';
import { InputData } from './vo/InputData';
import { InputType } from './vo/InputType';

type InputProps = {
  data: InputData;
  type: InputType;
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
    const type = InputType.create(input.data);
    return new InputEntity({ data, type }, id);
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

  get type() {
    return this.props.type;
  }

  get isCoin() {
    return this.type.is('InputCoin');
  }

  get isMessage() {
    return this.type.is('InputMessage');
  }

  get isContract() {
    return this.type.is('InputContract');
  }

  getPredicateData() {
    if (!this.isCoin && !this.isMessage) return;
    const bytecode = this.getPredicateBytecode();
    const address = this.getPredicateAddress() as string;
    return { bytecode, address };
  }

  private getPredicateAddress() {
    const data = this.data.value();
    if (this.isCoin) return (data as GQLInputCoin).owner;
    return (data as GQLInputMessage).sender;
  }

  private getPredicateBytecode() {
    const data = this.data.value() as GQLInputCoin | GQLInputMessage;
    return data.predicate;
  }
}

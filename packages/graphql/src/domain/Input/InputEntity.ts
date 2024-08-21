import { SerialID } from '~/application/vo';
import { Entity } from '~/core/Entity';
import type { GQLInput } from '~/graphql/generated/sdk-provider';
import type { TxID } from '../Transaction/vo/TransactionModelID';
import { InputData } from './vo/InputData';
import { InputPredicateData } from './vo/InputPredicateData';
import { InputType } from './vo/InputType';

type InputProps = {
  id: SerialID | null | undefined;
  data: InputData;
  type: InputType;
  predicateData: InputPredicateData;
};

export class InputEntity extends Entity<
  InputProps,
  SerialID | null | undefined
> {
  static create(input: any, inputId?: number) {
    if (!input?.data) {
      throw new Error('Input data is required');
    }

    const id = inputId ? SerialID.create(inputId) : null;
    const data = InputData.create(input.data);
    const type = InputType.create(input.data);
    const predicateData = InputPredicateData.create(input.data);
    return new InputEntity({ id, data, type, predicateData }, id);
  }

  static toDBItem(input: GQLInput, transactionId: TxID): any {
    return {
      data: input,
      transactionId,
    };
  }

  get cursor() {
    return this.props.id?.value();
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

  get predicateData() {
    return this.props.predicateData.value();
  }

  get hasPredicate() {
    const data = this.data.value();
    if ('predicate' in data) {
      return !!data.predicate && data.predicate !== '0x';
    }

    return false;
  }
}

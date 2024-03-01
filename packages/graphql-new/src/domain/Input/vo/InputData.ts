import { jsonb } from 'drizzle-orm/pg-core';
import { ValueObject } from '~/core/ValueObject';
import {
  GQLInput,
  GQLInputCoin,
  GQLInputMessage,
} from '~/graphql/generated/sdk';

interface Props {
  value: GQLInput;
}

export class InputData extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return jsonb('data').notNull().$type<GQLInput>();
  }

  static create(value: GQLInput) {
    return new InputData({ value });
  }

  value() {
    return this.props.value;
  }

  get isCoin() {
    return this.value().__typename === 'InputCoin';
  }

  get isMessage() {
    return this.value().__typename === 'InputMessage';
  }

  get isContract() {
    return this.value().__typename === 'InputContract';
  }

  get predicate() {
    if (!this.isCoin && !this.isMessage) return null;
    const bytecode = this.predicateBytecode;
    const address = this.predicateAddress as string;
    return { bytecode, address };
  }

  get predicateAddress() {
    const data = this.props.value;
    if (this.isCoin) return (data as GQLInputCoin).owner;
    return (data as GQLInputMessage).sender;
  }

  get predicateBytecode() {
    const data = this.props.value as GQLInputCoin | GQLInputMessage;
    return data.predicate;
  }
}

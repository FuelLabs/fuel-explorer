import { jsonb } from 'drizzle-orm/pg-core';
import { ValueObject } from '~/core/ValueObject';
import type { GQLInput } from '~/graphql/generated/sdk-provider';

interface Props {
  value: GQLInput['__typename'];
}

export class InputType extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return jsonb('data').notNull().$type<GQLInput>();
  }

  static create(value: GQLInput) {
    return new InputType({ value: value.__typename });
  }

  value() {
    return this.props.value;
  }

  is(type: GQLInput['__typename']) {
    return this.value() === type;
  }

  get isCoin() {
    return this.is('InputCoin');
  }

  get isMessage() {
    return this.is('InputMessage');
  }

  get isContract() {
    return this.is('InputContract');
  }
}

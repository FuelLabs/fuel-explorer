import { ValueObject } from '../../../core/ValueObject';
interface Props {
  value: number;
}

export class AccountRef extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static create(id: number) {
    return new AccountRef({ value: id });
  }

  value() {
    return this.props.value;
  }
}

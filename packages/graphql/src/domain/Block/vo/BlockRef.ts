import { ValueObject } from '~/core/ValueObject';

interface Props {
  value: number;
}

export class BlockRef extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static create(id: number) {
    return new BlockRef({ value: id });
  }

  value() {
    return this.props.value;
  }
}

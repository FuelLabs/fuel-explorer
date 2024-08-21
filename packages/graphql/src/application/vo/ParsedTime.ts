import { DateHelper } from '~/core/Date';
import { ValueObject } from '~/core/ValueObject';
import type { GQLParsedTime } from '~/graphql/generated/sdk-provider';

type Typename = GQLParsedTime['__typename'];
interface Props {
  value: GQLParsedTime;
}

export class ParsedTime extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static create(timestamp?: string | null) {
    if (!timestamp) {
      return new ParsedTime({
        value: {
          __typename: 'ParsedTime' as Typename,
          fromNow: null,
          full: null,
          rawTai64: null,
          rawUnix: null,
        },
      });
    }

    const date = DateHelper.tai64toDate(timestamp);
    const value = {
      __typename: 'ParsedTime' as Typename,
      fromNow: date.fromNow(),
      full: date.format('DD MMM YYYY - HH:mm:ss A'),
      rawTai64: timestamp.toString(),
      rawUnix: date.unix().toString(),
    };
    return new ParsedTime({ value });
  }

  value() {
    return this.props.value;
  }
}

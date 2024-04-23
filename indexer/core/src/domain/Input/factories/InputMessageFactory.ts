import type {
  GQLGroupedInputMessage,
  GQLInput,
  GQLInputMessage,
} from '@core/generated/gql-types';
import { GQLNode } from '@core/shared/GQLNode';

type Source = GQLInputMessage;
type Typename = GQLGroupedInputMessage['__typename'];
export type InputMessageGroupedEntry = GQLGroupedInputMessage;

export class InputMessageFactory {
  value: InputMessageGroupedEntry[];
  private constructor(data: GQLInput[]) {
    const inputs = GQLNode.filterByType(data, 'InputMessage');
    this.value = this.entriesFromInputs(inputs as Source[]);
  }

  static create(inputsData: GQLInput[]) {
    return new InputMessageFactory(inputsData);
  }

  private entriesFromInputs(inputs: Source[]) {
    return inputs.map((input) => {
      const sender = input.sender;
      const recipient = input.recipient;
      const data = input.data;
      return {
        __typename: 'GroupedInputMessage' as Typename,
        sender,
        recipient,
        data,
        inputs: [input],
      };
    });
  }
}

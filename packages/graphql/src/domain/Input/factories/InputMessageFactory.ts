import { GQLNode } from '~/core/GQLNode';
import {
  type GQLGroupedInputMessage,
  GQLGroupedInputType,
  type GQLInput,
  type GQLInputMessage,
} from '~/graphql/generated/sdk-provider';

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
        type: GQLGroupedInputType.InputMessage,
        sender,
        recipient,
        data,
        inputs: [input],
      };
    });
  }
}

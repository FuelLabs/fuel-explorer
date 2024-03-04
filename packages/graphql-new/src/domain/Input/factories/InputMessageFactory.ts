import { GQLNode } from '~/core/GQLNode';
import { GQLInput, GQLInputMessage } from '~/graphql/generated/sdk';
type Source = GQLInputMessage;
export type InputMessageGroupedEntry = {
  type: 'InputMessage';
  sender: string;
  recipient: string;
  data: string;
  inputs: Source[];
};

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
      const type = input.__typename;
      const sender = input.sender;
      const recipient = input.recipient;
      const data = input.data;
      return { type, sender, recipient, data, inputs: [input] };
    });
  }
}

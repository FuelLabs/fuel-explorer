import { GQLInput, GQLInputMessage } from '~/graphql/generated/sdk';

export type InputMessageGroupedEntry = {
  type: 'InputMessage';
  sender: string;
  recipient: string;
  data: string;
  inputs: GQLInputMessage[];
};

export class InputMessageFactory {
  entries: InputMessageGroupedEntry[];
  private constructor(inputsData: GQLInput[]) {
    const inputs = inputsData.filter(
      (input) => input.__typename === 'InputMessage',
    ) as GQLInputMessage[];

    this.entries = this.entriesFromInputs(inputs);
  }

  static create(inputsData: GQLInput[]) {
    return new InputMessageFactory(inputsData);
  }

  value() {
    return this.entries;
  }

  private entriesFromInputs(inputs: GQLInputMessage[]) {
    return inputs.map((input) => {
      const type = input.__typename;
      const sender = input.sender;
      const recipient = input.recipient;
      const data = input.data;
      return { type, sender, recipient, data, inputs: [input] };
    });
  }
}

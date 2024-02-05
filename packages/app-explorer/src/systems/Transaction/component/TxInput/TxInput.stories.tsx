import { VStack } from "@fuels/ui";
import type { Meta, StoryObj } from "@storybook/react";

import {
  GROUPED_INPUT_ASSET,
  GROUPED_INPUT_ASSET_UNKNOWN,
  GROUPED_INPUT_MESSAGE,
} from "../../__mocks__/tx";

import { TxInput } from "./TxInput";

const meta: Meta<typeof TxInput> = {
  title: "Transaction/TxInput",
  component: TxInput,
};

export default meta;
type Story = StoryObj<typeof TxInput>;

export const Asset: Story = {
  render: () => (
    <VStack className="w-[600px]">
      <TxInput input={GROUPED_INPUT_ASSET} />
      <TxInput input={GROUPED_INPUT_ASSET_UNKNOWN} />
    </VStack>
  ),
};

export const Message: Story = {
  render: () => <TxInput className="w-[600px]" input={GROUPED_INPUT_MESSAGE} />,
};

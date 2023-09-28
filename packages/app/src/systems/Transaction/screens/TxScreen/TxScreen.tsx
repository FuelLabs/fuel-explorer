'use client';

import type {
  GroupedInput,
  GroupedOutput,
  Maybe,
} from '@fuel-explorer/graphql';
import { Flex, Heading, Icon, VStack } from '@fuels/ui';
import { IconArrowDown } from '@tabler/icons-react';
import { EmptyCard } from '~/systems/Core/components/EmptyCard/EmptyCard';

import { TxBreadcrumb } from '../../component/TxBreadcrumb/TxBreadcrumb';
import { TxInput } from '../../component/TxInput/TxInput';
import { TxOutput } from '../../component/TxOutput/TxOutput';
import { TxSummary } from '../../component/TxSummary/TxSummary';
import type { TransactionNode } from '../../types';

type TxScreenProps = {
  transaction?: Maybe<TransactionNode>;
};

export function TxScreen({ transaction: tx }: TxScreenProps) {
  if (!tx) return null;
  const hasInputs = tx.groupedInputs?.length ?? 0 > 0;
  const hasOutputs = tx.groupedOutputs?.length ?? 0 > 0;

  return (
    <VStack gap="6">
      <TxBreadcrumb transaction={tx} />
      <Heading>Transaction Details</Heading>
      <TxSummary transaction={tx}>
        <TxSummary.Details />
        <TxSummary.Params />
      </TxSummary>
      <VStack>
        <VStack>
          <Heading as="h2" size="4">
            Inputs
          </Heading>
          {hasInputs ? (
            tx.groupedInputs?.map((input) => (
              <TxInput
                key={getInputId(input as GroupedInput)}
                input={input as GroupedInput}
              />
            ))
          ) : (
            <EmptyCard>
              <EmptyCard.Title>No Inputs</EmptyCard.Title>
              <EmptyCard.Description>
                This transaction does not have any inputs.
              </EmptyCard.Description>
            </EmptyCard>
          )}
        </VStack>
        <Flex justify="center">
          <Icon icon={IconArrowDown} size={40} />
        </Flex>
        <VStack>
          <Heading as="h2" size="4">
            Outputs
          </Heading>
          {hasOutputs ? (
            tx.groupedOutputs?.map((output) => (
              <TxOutput
                key={getOutputId(output as GroupedOutput)}
                output={output as GroupedOutput}
              />
            ))
          ) : (
            <EmptyCard>
              <EmptyCard.Title>No Outputs</EmptyCard.Title>
              <EmptyCard.Description>
                This transaction does not have any outputs.
              </EmptyCard.Description>
            </EmptyCard>
          )}
        </VStack>
      </VStack>
    </VStack>
  );
}

function getInputId(input?: Maybe<GroupedInput>) {
  if (!input) return 0;
  if (input.type === 'InputCoin') return input.assetId;
  if (input.type === 'InputContract') return input.contractId;
  return input.sender;
}

function getOutputId(output?: Maybe<GroupedOutput>) {
  if (!output) return 0;
  if (output.type === 'ContractOutput') return output.inputIndex;
  if (output.type === 'ContractCreated') return output.contract?.id ?? 0;
  if (output.type === 'MessageOutput') return output.recipient;
  return output.assetId;
}

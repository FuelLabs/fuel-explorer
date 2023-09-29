'use client';

import type {
  GroupedInput,
  GroupedOutput,
  Maybe,
} from '@fuel-explorer/graphql';
import { Badge, Box, Flex, Grid, Heading, Icon, VStack } from '@fuels/ui';
import { IconArrowDown } from '@tabler/icons-react';
import { bn } from 'fuels';
import { EmptyCard } from '~/systems/Core/components/EmptyCard/EmptyCard';

import { TxBreadcrumb } from '../../component/TxBreadcrumb/TxBreadcrumb';
import { TxInfo } from '../../component/TxInfo/TxInfo';
import { TxInput } from '../../component/TxInput/TxInput';
import { TxOutput } from '../../component/TxOutput/TxOutput';
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
      <TxBreadcrumb transactionId={tx.id} />
      <Grid columns="6" gap={'6'}>
        <Box className="col-span-2">
          <VStack>
            <TxInfo name={'Status'}>
              <Badge color={'green'} size="1" variant="solid">
                Success
              </Badge>
            </TxInfo>
            <TxInfo name={'Timestamp'} description={tx.time?.full}>
              {tx.time?.fromNow}
            </TxInfo>
            <TxInfo name={'Block'}>#{tx.blockHeight}</TxInfo>
            <TxInfo
              name={'Gas spent'}
              description={`Gas limit: ${bn(tx.gasLimit).format()}`}
            >
              {bn(tx.gasUsed).format()}
            </TxInfo>
          </VStack>
        </Box>
        <Box className="col-span-4">
          <VStack>
            <VStack>
              <Heading as="h2" size="5">
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
              <Heading as="h2" size="5">
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
        </Box>
      </Grid>
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

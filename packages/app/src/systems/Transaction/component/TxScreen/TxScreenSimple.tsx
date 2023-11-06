'use client';

import type {
  GroupedInput,
  GroupedOutput,
  Maybe,
} from '@fuel-explorer/graphql';
import {
  Badge,
  Box,
  EntityItem,
  Flex,
  Grid,
  HStack,
  Heading,
  Icon,
  VStack,
} from '@fuels/ui';
import { IconArrowDown } from '@tabler/icons-react';
import { bn } from 'fuels';
import { EmptyCard } from '~/systems/Core/components/EmptyCard/EmptyCard';

import { CardInfo } from '../../../Core/components/CardInfo/CardInfo';
import { TxInput } from '../../component/TxInput/TxInput';
import { TxOutput } from '../../component/TxOutput/TxOutput';
import type { TransactionNode, TxStatus } from '../../types';
import { TX_INTENT_MAP, TxIcon } from '../TxIcon/TxIcon';
import { TxScripts } from '../TxScripts/TxScripts';

type TxScreenProps = {
  transaction: TransactionNode;
};

export function TxScreenSimple({ transaction: tx }: TxScreenProps) {
  const hasInputs = tx.groupedInputs?.length ?? 0 > 0;
  const hasOutputs = tx.groupedOutputs?.length ?? 0 > 0;
  const title = tx.title as string;
  return (
    <Grid columns="6" gap="9">
      <Box className="col-span-2">
        <VStack>
          <CardInfo>
            <EntityItem>
              <EntityItem.Slot>
                <TxIcon
                  status={tx.isPredicate ? 'Info' : (tx.statusType as TxStatus)}
                  type={title}
                  size="lg"
                />
              </EntityItem.Slot>
              <EntityItem.Info title={title}>
                <HStack gap="1">
                  {tx.isPredicate && (
                    <Badge color="blue" variant="ghost">
                      Predicate
                    </Badge>
                  )}
                  <Badge
                    color={TX_INTENT_MAP[tx.statusType as string]}
                    variant="ghost"
                  >
                    {tx.statusType}
                  </Badge>
                </HStack>
              </EntityItem.Info>
            </EntityItem>
          </CardInfo>
          <CardInfo name={'Timestamp'} description={tx.time?.full}>
            {tx.time?.fromNow}
          </CardInfo>
          {tx.blockHeight && (
            <CardInfo name={'Block'}>#{tx.blockHeight}</CardInfo>
          )}
          <CardInfo
            name={'Gas spent'}
            description={`Gas limit: ${bn(tx.gasLimit).format()}`}
          >
            {bn(tx.gasUsed).format()}
          </CardInfo>
        </VStack>
      </Box>
      <Box className="col-span-4">
        <VStack>
          <VStack>
            <Heading as="h2" size="5" className="leading-none">
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
              <EmptyCard hideImage>
                <EmptyCard.Title>No Inputs</EmptyCard.Title>
                <EmptyCard.Description>
                  This transaction does not have any inputs.
                </EmptyCard.Description>
              </EmptyCard>
            )}
          </VStack>
          <Flex justify="center">
            <Icon icon={IconArrowDown} size={30} color="text-muted" />
          </Flex>
          <TxScripts tx={tx} />
          <Flex justify="center">
            <Icon icon={IconArrowDown} size={30} color="text-muted" />
          </Flex>
          <VStack>
            <Heading as="h2" size="5" className="leading-none">
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
              <EmptyCard hideImage>
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

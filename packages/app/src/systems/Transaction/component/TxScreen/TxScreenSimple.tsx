'use client';

import type { GroupedInput, GroupedOutput } from '@fuel-explorer/graphql';
import {
  Badge,
  Box,
  EntityItem,
  Flex,
  Grid,
  HStack,
  Heading,
  Icon,
  Link,
  VStack,
} from '@fuels/ui';
import { IconArrowDown } from '@tabler/icons-react';
import { bn } from 'fuels';
import NextLink from 'next/link';
import { EmptyCard } from '~/systems/Core/components/EmptyCard/EmptyCard';
import { formatZeroUnits } from '~/systems/Core/utils/format';

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
    <Grid className="grid-cols-1 gap-10 laptop:grid-cols-[300px_1fr] laptop:items-start">
      <Box className="grid grid-cols-1 gap-4 tablet:grid-cols-2 tablet:gap-6 laptop:grid-cols-1">
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
          <CardInfo name={'Block'}>
            <Link
              as={NextLink}
              href={`/block/${tx.blockHeight}`}
              className="text-link"
            >
              #{tx.blockHeight}
            </Link>
          </CardInfo>
        )}
        <CardInfo
          name={'Network Fee'}
          description={
            <>
              Gas used: {formatZeroUnits(tx.gasUsed || '')}
              {/* TODO: return this after having this field on GraphQL */}
              {/* <br /> */}
              {/* Gas limit: {formatZeroUnits(tx.gasLimit || '')} */}
            </>
          }
        >
          {bn(tx.fee).format()} ETH
        </CardInfo>
      </Box>
      <VStack>
        <VStack>
          <Heading as="h2" size="5" className="leading-none">
            Inputs
          </Heading>
          {hasInputs ? (
            tx.groupedInputs?.map((input, i) => (
              // here we use only index as key because this component will not change
              <TxInput key={i} input={input as GroupedInput} />
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
            tx.groupedOutputs?.map((output, i) => (
              <TxOutput
                // here we use only index as key because this component will not change
                key={i}
                tx={tx}
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
    </Grid>
  );
}

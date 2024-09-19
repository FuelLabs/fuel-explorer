'use client';

import type { GQLTransactionItemFragment } from '@fuel-explorer/graphql';
import {
  Address,
  Badge,
  Box,
  Card,
  EntityItem,
  Flex,
  Grid,
  HStack,
  Heading,
  HelperIcon,
  Icon,
  Link,
  LoadingBox,
  LoadingWrapper,
  Text,
  VStack,
} from '@fuels/ui';
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';
import { bn } from 'fuels';
import NextLink from 'next/link';
import { tv } from 'tailwind-variants';
import { Routes } from '~/routes';
import { Amount } from '~/systems/Core/components/Amount/Amount';
import { EmptyCard } from '~/systems/Core/components/EmptyCard/EmptyCard';
import { formatZeroUnits } from '~/systems/Core/utils/format';

import { AssetItem } from '~/systems/Asset/components/AssetItem/AssetItem';
import { CardInfo } from '../../../Core/components/CardInfo/CardInfo';
import { TxInput } from '../../component/TxInput/TxInput';
import { TxOutput } from '../../component/TxOutput/TxOutput';
import type { TransactionNode, TxIconType, TxStatus } from '../../types';
import { TX_INTENT_MAP, TxIcon } from '../TxIcon/TxIcon';
import { TxScripts } from '../TxScripts/TxScripts';

type TxScreenProps =
  | {
      transaction: TransactionNode;
      isLoading?: false;
    }
  | {
      transaction?: TransactionNode;
      isLoading: true;
    };

export function TxScreenSimple({ transaction: tx, isLoading }: TxScreenProps) {
  const title = tx?.title as string;
  const isMint = Boolean(tx?.isMint);
  const classes = styles({ isMint });

  const cards = [
    <CardInfo key="type">
      <EntityItem>
        <EntityItem.Slot>
          <LoadingWrapper
            isLoading={isLoading}
            loadingEl={<LoadingBox className="w-11 h-11 rounded-full" />}
            regularEl={
              <TxIcon
                type={title as TxIconType}
                size="lg"
                status={
                  tx?.hasPredicate ? 'Info' : (tx?.statusType as TxStatus)
                }
              />
            }
          />
        </EntityItem.Slot>
        <EntityItem.Info
          title={
            (
              <LoadingWrapper
                isLoading={isLoading}
                loadingEl={<LoadingBox className="w-20 h-6" />}
                regularEl={title}
              />
            ) as any
          }
        >
          <HStack gap="1">
            {tx?.hasPredicate && (
              <Badge color="blue" variant="ghost">
                Predicate
              </Badge>
            )}
            <LoadingWrapper
              isLoading={isLoading}
              loadingEl={<LoadingBox className="w-20 h-6" />}
              regularEl={
                <Badge
                  color={
                    TX_INTENT_MAP[tx?.statusType as keyof typeof TX_INTENT_MAP]
                  }
                  variant="ghost"
                >
                  {tx?.statusType}
                </Badge>
              }
            />
          </HStack>
        </EntityItem.Info>
      </EntityItem>
    </CardInfo>,
    <CardInfo
      key="timestamp"
      name={'Timestamp'}
      description={
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={<LoadingBox className="w-40 h-5 mt-1" />}
          regularEl={tx?.time?.full}
        />
      }
    >
      <LoadingWrapper
        isLoading={isLoading}
        loadingEl={<LoadingBox className="w-24 h-6" />}
        regularEl={tx?.time?.fromNow}
      />
    </CardInfo>,
    (tx?.blockHeight || isLoading) && (
      <CardInfo key="block" name={'Block'}>
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={<LoadingBox className="w-28 h-6" />}
          regularEl={
            <Link
              as={NextLink}
              href={`/block/${tx?.blockHeight}/simple`}
              className="text-link"
            >
              #{tx?.blockHeight}
            </Link>
          }
        />
      </CardInfo>
    ),
    <CardInfo
      key={'fee'}
      name={'Network Fee'}
      description={
        <LoadingWrapper
          isLoading={isLoading}
          regularEl={
            <>Gas used: {formatZeroUnits(tx?.gasCosts?.gasUsed || '')}</>
          }
          loadingEl={
            <>
              <LoadingBox className="w-28 h-5 mt-2" />
              <LoadingBox className="w-28 h-5 mt-1" />
            </>
          }
        />
      }
    >
      <LoadingWrapper
        isLoading={isLoading}
        loadingEl={<LoadingBox className="w-36 h-6" />}
        regularEl={`${bn(tx?.gasCosts?.fee ?? 0).format()} ETH`}
      />
    </CardInfo>,
  ];

  return (
    <Grid className={classes.wrapper()}>
      <Box className={classes.cards()}>{cards}</Box>
      <ContentMain tx={tx} isLoading={isLoading} />
    </Grid>
  );
}

function ContentMain({
  tx,
  isLoading,
}: {
  tx: TransactionNode | undefined;
  isLoading?: boolean;
}) {
  const hasInputs = tx?.groupedInputs?.length ?? 0 > 0;
  const hasOutputs = tx?.outputs?.length ?? 0 > 0;

  return (
    <VStack>
      <VStack>
        <LoadingWrapper
          isLoading={isLoading}
          repeatLoader={2}
          noItems={!hasInputs}
          loadingEl={
            <Card className="py-4 px-4 flex flex-row items-center justify-between">
              <LoadingBox className="rounded-full w-[38px] h-[38px]" />
              <LoadingBox className="w-24 h-6" />
            </Card>
          }
          regularEl={
            <>
              <Heading as="h2" size="5" className="leading-none">
                Inputs
              </Heading>
              {tx?.inputs?.map((input, i) => (
                // here we use index as key because this component will not change
                <TxInput
                  key={`${i}-${input?.__typename}`}
                  input={
                    input as
                      | NonNullable<
                          GQLTransactionItemFragment['inputs']
                        >[number]
                      | undefined
                  }
                />
              ))}
            </>
          }
          noItemsEl={
            <EmptyCard hideImage>
              <EmptyCard.Title>No Inputs</EmptyCard.Title>
              <EmptyCard.Description>
                This transaction does not have any inputs.
              </EmptyCard.Description>
            </EmptyCard>
          }
        />
      </VStack>
      <Flex justify="center">
        <Icon icon={IconArrowDown} size={30} color="text-muted" />
      </Flex>
      <TxScripts tx={tx} isLoading={isLoading} />
      <Flex justify="center">
        <Icon icon={IconArrowDown} size={30} color="text-muted" />
      </Flex>
      <VStack>
        {tx?.isMint ? (
          <MintOutputs tx={tx} isLoading={Boolean(isLoading)} />
        ) : (
          <LoadingWrapper
            isLoading={isLoading}
            repeatLoader={2}
            noItems={!hasOutputs}
            loadingEl={
              <Card className="py-4 px-4 flex flex-row items-center justify-between">
                <LoadingBox className="rounded-full w-[38px] h-[38px]" />
                <LoadingBox className="w-24 h-6" />
              </Card>
            }
            regularEl={
              <>
                <Heading as="h2" size="5" className="leading-none">
                  Outputs
                </Heading>
                {tx?.outputs?.map((output, i) => (
                  <TxOutput
                    // here we use only index as key because this component will not change
                    key={i}
                    output={output}
                  />
                ))}
              </>
            }
            noItemsEl={
              <EmptyCard hideImage>
                <EmptyCard.Title>No Outputs</EmptyCard.Title>
                <EmptyCard.Description>
                  This transaction does not have any outputs.
                </EmptyCard.Description>
              </EmptyCard>
            }
          />
        )}
      </VStack>
    </VStack>
  );
}

function MintOutputs({
  tx,
  isLoading,
}: {
  tx: TransactionNode;
  isLoading: boolean;
}) {
  const classes = styles();
  const inputContractId = tx.inputContract?.contractId;
  const hasInputContract = Boolean(inputContractId);
  const amount = bn(tx.mintAmount);

  const content = (
    <VStack>
      <Heading as="h2" size="5" className="leading-none">
        Minted Assets
      </Heading>
      <Card className="pb-3">
        <Card.Header className={classes.header()}>
          {tx.mintAssetId && (
            <AssetItem assetId={tx.mintAssetId} prefix="Asset:">
              <Address
                prefix="Id:"
                value={tx.mintAssetId}
                linkProps={{
                  as: NextLink,
                  href: Routes.accountAssets(tx.mintAssetId),
                }}
              />
            </AssetItem>
          )}
          <HStack className="hidden tablet:flex items-center gap-2">
            <Icon color="text-success" icon={IconArrowUp} />
            <Amount
              hideSymbol
              hideIcon
              assetId={tx.mintAssetId}
              value={amount}
            />
            <HelperIcon message="This is the amount minted in the transaction" />
          </HStack>
        </Card.Header>
        <Card.Body className="flex flex-col gap-1 border-t border-border pt-3">
          {hasInputContract && (
            <HStack>
              <Text as="span" className="text-sm">
                Input Contract
              </Text>
              <Address
                value={inputContractId}
                linkProps={{
                  as: NextLink,
                  href: Routes.accountAssets(inputContractId!),
                }}
              />
            </HStack>
          )}
          {tx.txPointer && (
            <HStack>
              <Text as="span" className="text-sm">
                Tx Pointer
              </Text>
              <Address full value={tx.txPointer} />
            </HStack>
          )}
        </Card.Body>
      </Card>
    </VStack>
  );

  return (
    <LoadingWrapper
      isLoading={isLoading}
      regularEl={content}
      loadingEl={
        <Card className="py-4 px-4 flex flex-col gap-2">
          <HStack>
            <LoadingBox className="w-20 h-6" />
            <LoadingBox className="w-40 h-6" />
          </HStack>
          <HStack>
            <LoadingBox className="w-20 h-6" />
            <LoadingBox className="w-40 h-6" />
          </HStack>
          <HStack>
            <LoadingBox className="w-20 h-6" />
            <LoadingBox className="w-40 h-6" />
          </HStack>
        </Card>
      }
    />
  );
}

const styles = tv({
  slots: {
    header: 'group flex flex-row gap-4 justify-between items-center',
    wrapper: [
      'grid-cols-1 gap-10 laptop:grid-cols-[300px_1fr] laptop:items-start',
    ],
    cards: [
      'grid grid-cols-1 gap-4 tablet:grid-cols-2 tablet:gap-6 laptop:grid-cols-1',
    ],
  },
  variants: {
    isMint: {
      true: {
        wrapper: [''],
        cards: [''],
      },
    },
  },
});

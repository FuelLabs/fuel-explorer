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
  Tooltip,
  VStack,
} from '@fuels/ui';
import { IconArrowDown, IconArrowUp, IconCoins } from '@tabler/icons-react';
import { DECIMAL_FUEL, bn } from 'fuels';

import { tv } from 'tailwind-variants';
import { Routes } from '~/routes';
import { EmptyCard } from '~/systems/Core/components/EmptyCard/EmptyCard';

import { formatZeroUnits } from 'app-commons';
import { useCallback } from 'react';
import { AssetItem } from '~/systems/Asset/components/AssetItem/AssetItem';
import type { InputContract } from '~/systems/Transaction/component/TxInput/TxInputContract/types';

import { TxFullDateTimestamp } from '~/systems/Transaction/component/TxFullDateTimestamp/TxFullDateTimestamp';
import { TxTimeAgoTimestamp } from '~/systems/Transaction/component/TxTimeAgoTimestamp/TxTimeAgoTimestamp';
import { useFormatBalance } from '~staking/systems/Core/hooks/useFormatBalance';
import { CardInfo } from '../../../Core/components/CardInfo/CardInfo';
import { TxInput } from '../../component/TxInput/TxInput';
import { TxOutput } from '../../component/TxOutput/TxOutput';
import type { TransactionNode, TxIconType, TxStatus } from '../../types';
import { TX_INTENT_MAP, TxIcon } from '../TxIcon/TxIcon';
import { TxItemLoader } from '../TxItemLoader';
import { TxPolicies } from '../TxPolicies/TxPolicies';
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

export function TxScreenStandard({
  transaction: tx,
  isLoading,
}: TxScreenProps) {
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
            <LoadingWrapper
              isLoading={isLoading}
              loadingEl={<LoadingBox className="w-20 h-6" />}
              regularEl={title}
            />
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
          regularEl={
            <TxFullDateTimestamp timeStamp={tx?.time?.rawUnix as any} />
          }
        />
      }
    >
      <LoadingWrapper
        isLoading={isLoading}
        loadingEl={<LoadingBox className="w-24 h-6" />}
        regularEl={
          <TxTimeAgoTimestamp
            timeStamp={tx?.time?.rawUnix as any}
            loading={<LoadingBox className="w-24 h-6" />}
          />
        }
      />
    </CardInfo>,
    (tx?.blockHeight || isLoading) && (
      <CardInfo key="block" name={'Block'}>
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={<LoadingBox className="w-28 h-6" />}
          regularEl={
            <Link
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
          loadingEl={<LoadingBox className="w-28 h-4 mt-2" />}
        />
      }
    >
      <LoadingWrapper
        isLoading={isLoading}
        loadingEl={<LoadingBox className="w-36 h-6" />}
        regularEl={
          <HStack align="center">
            <Text className="text-primary text-base" as="div">
              {tx?.gasCosts?.feeInUsd}
            </Text>
            <Text className="text-secondary" as="div" size="2">
              ({bn(tx?.gasCosts?.fee ?? 0).format()} ETH)
            </Text>
          </HStack>
        }
      />
    </CardInfo>,
    <TxPolicies key="policies" transaction={tx} isLoading={isLoading} />,
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
  const hasInputs = !!tx?.groupedInputs?.length;
  const hasOutputs = !!tx?.outputs?.length;

  const getContractByIndex = useCallback(
    (index: number) => {
      return tx?.inputs?.[index] as InputContract | undefined;
    },
    [tx?.inputs],
  );

  return (
    <VStack>
      <VStack>
        <Heading as="h2" size="5" className="leading-none">
          Inputs
        </Heading>
        <LoadingWrapper
          isLoading={isLoading}
          repeatLoader={2}
          noItems={!hasInputs}
          loadingEl={<TxItemLoader />}
          regularEl={tx?.inputs?.map((input, i) => (
            <TxInput
              key={`${i}-${input?.__typename}`}
              input={
                input as
                  | NonNullable<GQLTransactionItemFragment['inputs']>[number]
                  | undefined
              }
            />
          ))}
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
          <>
            <Heading as="h2" size="5" className="leading-none">
              Outputs
            </Heading>
            <LoadingWrapper
              isLoading={isLoading}
              repeatLoader={2}
              noItems={!hasOutputs}
              loadingEl={<TxItemLoader />}
              regularEl={tx?.outputs?.map((output, i) => (
                <TxOutput
                  // here we use only index as key because this component will not change
                  key={i}
                  output={output}
                  getContractByIndex={getContractByIndex}
                  txStatus={tx?.statusType}
                />
              ))}
              noItemsEl={
                <EmptyCard hideImage>
                  <EmptyCard.Title>No Outputs</EmptyCard.Title>
                  <EmptyCard.Description>
                    This transaction does not have any outputs.
                  </EmptyCard.Description>
                </EmptyCard>
              }
            />
          </>
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

  const { formatted, original } = useFormatBalance(amount, DECIMAL_FUEL);

  const content = (
    <VStack>
      <Heading as="h2" size="5" className="leading-none">
        Minted Assets
      </Heading>
      <Card className="pb-3">
        <Card.Header className={classes.header()}>
          {tx.mintAssetId && tx.mintedAsset && (
            <AssetItem
              assetId={tx.mintAssetId}
              prefix="Asset:"
              asset={tx.mintedAsset}
            >
              <Address
                prefix="Id:"
                value={tx.mintAssetId}
                linkProps={{
                  href: Routes.accountAssets(tx.mintAssetId),
                }}
              />
            </AssetItem>
          )}
          <HStack className="flex items-center gap-2">
            <Flex className="items-center gap-2 flex-col tablet:flex-row">
              <HStack className="items-center gap-1 tablet:gap-2">
                <Icon color="text-success" icon={IconArrowUp} />
                <Icon icon={IconCoins} size={18} />
                <span className="text-primary">{tx.mintAmountUsd}</span>
              </HStack>
              <HStack className="items-center gap-1 flex-row-reverse tablet:gap-2 tablet:flex-row">
                <Tooltip content={`${original.display} ETH`}>
                  <span className="text-muted">({formatted.display} ETH)</span>
                </Tooltip>
                <HelperIcon message="This is the amount minted in the transaction" />
              </HStack>
            </Flex>
          </HStack>
        </Card.Header>
        <Card.Body className="flex flex-col gap-1 border-t border-border pt-3">
          {hasInputContract && (
            <HStack>
              <Text as="span" className="text-sm">
                Input Contract
              </Text>
              <Address
                value={inputContractId || ''}
                linkProps={{
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

import { bn, format } from '@fuel-ts/math';
import {
  Address,
  Badge,
  Box,
  Card,
  HStack,
  LoadingBox,
  LoadingWrapper,
  Text,
  VStack,
} from '@fuels/ui';
import { BlockieAvatar } from '@fuels/ui';
import {
  IconArrowRight,
  IconCheck,
  IconClock,
  IconX,
} from '@tabler/icons-react';
import clsx from 'clsx';
import { AddressType } from 'fuels';

import { Routes } from '~/routes';
import { Amount } from '~/systems/Core/components/Amount/Amount';
import type { TransactionNode } from '../../types';
import { TxContractIcon } from '../TxContractIcon/TxContractIcon';
import { TxFullDateTimestamp } from '../TxFullDateTimestamp/TxFullDateTimestamp';
import { TxTimeAgoTimestamp } from '../TxTimeAgoTimestamp/TxTimeAgoTimestamp';

type TxScreenProps =
  | {
      transaction: TransactionNode;
      isLoading?: false;
    }
  | {
      transaction?: TransactionNode;
      isLoading: true;
    };

const detailsLink: Record<AddressType, typeof Routes.accountAssets> = {
  [AddressType.contract]: Routes.contractMintedAssets,
  [AddressType.account]: Routes.accountAssets,
};

export function TxScreenSimple({ transaction, isLoading }: TxScreenProps) {
  if (!transaction && !isLoading) return null;

  return (
    <VStack>
      {/* Header section - always visible structure */}
      <HStack className="mobile:max-tablet:flex-col">
        <HStack>
          <LoadingWrapper
            isLoading={isLoading}
            loadingEl={<LoadingBox className="w-20 h-6 rounded" />}
            regularEl={
              <Badge color="blue" leftIcon={IconArrowRight}>
                Transfer
              </Badge>
            }
          />

          <LoadingWrapper
            isLoading={isLoading}
            loadingEl={<LoadingBox className="w-16 h-6 rounded" />}
            regularEl={
              <>
                {transaction?.status?.__typename === 'SuccessStatus' && (
                  <Badge color="green" leftIcon={IconCheck}>
                    Success
                  </Badge>
                )}

                {transaction?.status?.__typename === 'FailureStatus' && (
                  <Badge color="red" leftIcon={IconX}>
                    Failed
                  </Badge>
                )}

                {transaction?.status?.__typename === 'SubmittedStatus' && (
                  <Badge color="yellow" leftIcon={IconClock}>
                    Pending
                  </Badge>
                )}

                {transaction?.status?.__typename === 'SqueezedOutStatus' && (
                  <Badge color="red" leftIcon={IconX}>
                    Squeezed Out
                  </Badge>
                )}
              </>
            }
          />
        </HStack>

        <HStack>
          <LoadingWrapper
            isLoading={isLoading}
            loadingEl={<LoadingBox className="w-16 h-5" />}
            regularEl={
              <Text>
                <TxTimeAgoTimestamp
                  timeStamp={
                    transaction?.time?.rawUnix != null &&
                    Number.isFinite(Number(transaction.time.rawUnix))
                      ? Number(transaction.time.rawUnix)
                      : null
                  }
                  loading={null}
                />
              </Text>
            }
          />
          <LoadingWrapper
            isLoading={isLoading}
            loadingEl={<LoadingBox className="w-32 h-5" />}
            regularEl={
              <Text className="text-muted">
                <TxFullDateTimestamp
                  timeStamp={
                    transaction?.time?.rawUnix != null &&
                    Number.isFinite(Number(transaction.time.rawUnix))
                      ? Number(transaction.time.rawUnix)
                      : null
                  }
                />
              </Text>
            }
          />
        </HStack>
      </HStack>

      <Card className="px-4 mt-8 relative">
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={
            <VStack gap="0" className="mb-2">
              <VStack gap="0">
                <HStack>
                  <LoadingBox className="w-8 h-8 rounded-full" />
                  <LoadingBox className="w-40 h-5" />
                </HStack>

                <VStack gap="0" className="py-3">
                  <Box className="border-l-2 border-l-gray-8 ml-4 py-3">
                    <HStack className="ml-8 mobile:max-tablet:flex-col mobile:max-tablet:items-start">
                      <LoadingBox className="w-20 h-6 rounded" />
                      <LoadingBox className="w-32 h-6" />
                    </HStack>
                  </Box>
                  <Box className="border-l-2 border-l-gray-8 ml-4 py-3">
                    <HStack className="ml-8 mobile:max-tablet:flex-col mobile:max-tablet:items-start">
                      <LoadingBox className="w-20 h-6 rounded" />
                      <LoadingBox className="w-40 h-6" />
                    </HStack>
                  </Box>
                </VStack>

                <HStack className="items-center">
                  <LoadingBox className="w-8 h-8 rounded-full" />
                  <LoadingBox className="w-4 h-4" />
                  <LoadingBox className="w-40 h-5" />
                </HStack>
              </VStack>
            </VStack>
          }
          regularEl={transaction?.summary?.map((operation, index) => (
            <VStack
              key={`${operation.from?.address}-${operation.to?.address}-${operation.name}`}
              gap="0"
              className={clsx({
                'mb-8': index + 1 < (transaction.summary?.length || 0),
                'mb-2': index + 1 === (transaction.summary?.length || 0),
              })}
            >
              <HStack>
                <TxContractIcon
                  contractId={operation.from?.address || ''}
                  size="32px"
                >
                  <BlockieAvatar
                    address={operation.from?.address || ''}
                    size={32}
                  />
                </TxContractIcon>
                {operation.from && (
                  <Address
                    value={operation.from.address}
                    linkProps={{
                      href: detailsLink[operation.from.type](
                        operation.from.address,
                      ),
                    }}
                    isAccount={operation.from.type === AddressType.account}
                  />
                )}
              </HStack>
              <VStack gap="0" className="py-3">
                {operation.assetsSent?.map((assetSent) => (
                  <Box
                    className="border-l-2 border-l-gray-8 ml-4 py-3"
                    key={assetSent.assetId}
                  >
                    <HStack className="ml-8 mobile:max-tablet:flex-col mobile:max-tablet:items-start">
                      <Badge color="blue" leftIcon={IconArrowRight}>
                        Transfer
                      </Badge>
                      <HStack className="flex items-center">
                        <Amount
                          className="text-heading font-semibold"
                          assetId={assetSent.assetId}
                          value={bn(assetSent.amount)}
                          decimals={assetSent.asset?.decimals?.toString()}
                          asset={assetSent.asset}
                        />
                        {assetSent.asset?.amountInUsd && (
                          <Text as="div" className="text-secondary" size="2">
                            ({assetSent.asset?.amountInUsd})
                          </Text>
                        )}
                      </HStack>
                    </HStack>
                  </Box>
                ))}
              </VStack>
              <HStack className="items-center">
                <TxContractIcon
                  contractId={operation.to?.address || ''}
                  size="32px"
                >
                  <BlockieAvatar
                    address={operation.to?.address || ''}
                    size={32}
                  />
                </TxContractIcon>

                <Text>to</Text>

                {operation.to && (
                  <Address
                    value={operation.to.address}
                    linkProps={{
                      href: detailsLink[operation.to.type](
                        operation.to.address,
                      ),
                    }}
                    isAccount={operation.to.type === AddressType.account}
                  />
                )}
              </HStack>
            </VStack>
          ))}
        />

        <VStack gap="2">
          <HStack className="ml-12">
            <LoadingWrapper
              isLoading={isLoading}
              loadingEl={<LoadingBox className="w-5 h-4" />}
              regularEl={<Text className="text-primary text-xs">Fee</Text>}
            />
            <LoadingWrapper
              isLoading={isLoading}
              loadingEl={<LoadingBox className="w-16 h-4" />}
              regularEl={
                <Text className="text-primary text-xs">
                  {transaction?.gasCosts?.feeInUsd}
                </Text>
              }
            />
            <LoadingWrapper
              isLoading={isLoading}
              loadingEl={<LoadingBox className="w-24 h-4" />}
              regularEl={
                <Text className="text-secondary text-xs">
                  ({format(bn(transaction?.gasCosts?.fee || 0))} ETH)
                </Text>
              }
            />
          </HStack>
        </VStack>
      </Card>
    </VStack>
  );
}

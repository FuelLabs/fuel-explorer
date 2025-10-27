import {
  Address as AddressUi,
  Box,
  HStack,
  LoadingBox,
  LoadingWrapper,
  Spinner,
  Text,
} from '@fuels/ui';
import { IconCheck, IconCircleMinus, IconX } from '@tabler/icons-react';

import { memo } from 'react';
import { tv } from 'tailwind-variants';
import { formatETA } from '~staking/systems/Core/utils/eta';
import { getTransactionLink } from '~staking/systems/Core/utils/getTransactionLink';
import type { StakingStatusDialogStepProps } from './types';

const completedIcon = <IconCheck size={18} className="text-gray-9" />;
const loadingIcon = <Spinner size={18} color="current" />;
const errorIcon = <IconCircleMinus size={18} className="text-red-8" />;
const canceledIcon = <IconX size={18} className="text-red-8" />;

export const StatusItem = memo(function StatusItem({
  step,
  isCompleted,
  isCurrent,
  statusInfo,
  eta,
  isContractPaused,
  isLoading,
  txHash,
  isActionNeeded,
  isProcessing,
}: StakingStatusDialogStepProps) {
  const formattedEta = formatETA(eta);
  const styles = responsiveDialogStyles({ active: isCurrent });

  const isError = !!statusInfo?.Error?.error;
  const isSkipped = !!statusInfo?.Skipped;

  return (
    <HStack
      gap="0"
      align="center"
      justify="between"
      className={styles.wrapper()}
    >
      <HStack gap="2" align="start" className="flex-1 min-w-0">
        <Box className="w-6 pt-0.5 flex-shrink-0">
          <LoadingWrapper
            isLoading={isLoading}
            loadingEl={<LoadingBox className="w-5 h-5" />}
            regularEl={
              <>
                {isCompleted && completedIcon}
                {isProcessing && !isSkipped && loadingIcon}
                {isCurrent && isError && errorIcon}
                {isCurrent && isSkipped && canceledIcon}
              </>
            }
          />
        </Box>
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={<LoadingBox className="w-40 h-5" />}
          regularEl={
            <div className="flex flex-col gap-1 min-w-0">
              <Text className={styles.label()}>{step.label}</Text>
              {isCurrent && step.description && (
                <Text className={styles.description()}>{step.description}</Text>
              )}
            </div>
          }
        />
      </HStack>
      <LoadingWrapper
        isLoading={isLoading}
        loadingEl={null}
        regularEl={
          <HStack gap="2" align="center" justify="end">
            {isCurrent && formattedEta && (
              <Text size="1" className={styles.labelAction()}>
                {formattedEta}
              </Text>
            )}
            {txHash && (
              <AddressUi
                value={txHash}
                hideCopyable
                linkProps={{
                  href: getTransactionLink(txHash, 'l1'),
                  target: '_blank',
                  rel: 'noopener noreferrer',
                }}
              />
            )}
            {isActionNeeded && !isContractPaused && (
              <Text className={styles.labelAction()}>Action needed</Text>
            )}
          </HStack>
        }
      />
    </HStack>
  );
});

export const responsiveDialogStyles = tv({
  slots: {
    wrapper: 'py-2.5 px-1 text-gray-9 w-full',
    label: 'text-sm',
    description: 'text-xs text-gray-10 leading-relaxed break-words',
    labelAction: 'text-xs font-medium',
  },
  variants: {
    active: {
      true: {
        wrapper: 'text-heading bg-gray-4 rounded-sm px-2.5',
        label: 'font-semibold',
      },
    },
  },
});

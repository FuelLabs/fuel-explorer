import {
  Button,
  HStack,
  Link,
  LoadingBox,
  LoadingWrapper,
  Separator,
  Text,
  VStack,
} from '@fuels/ui';
import { TokenBadge } from '@fuels/ui';
import { IconCheck, IconInfoCircle } from '@tabler/icons-react';
import { type BN, DECIMAL_FUEL } from 'fuels';
import { FormattedAmount } from '~staking/systems/Core/components/FormattedAmount/FormattedAmount';
import type { AssetFuelData } from '~staking/systems/Core/hooks/useIndexedAsset';

interface Props {
  balanceDifference?: BN | null;
  onClose: () => void;
  stFuelAsset?: AssetFuelData;
}

export function SuccessPage({
  balanceDifference,
  onClose,
  stFuelAsset,
}: Props) {
  // Calculate approximate stFUEL (assuming 1:1 ratio for now)
  const stFuelAmount = balanceDifference;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <HStack gap="2" align="center">
            <Text size="3" weight="medium">
              You have received
            </Text>
            <IconCheck size={20} className="text-green-11" />
          </HStack>
          <div className="flex items-center gap-2">
            <TokenBadge
              image={stFuelAsset?.icon}
              symbol={stFuelAsset?.symbol}
              size="small"
            />
            <LoadingWrapper
              loadingEl={<LoadingBox className="w-32 h-6" />}
              regularEl={
                <FormattedAmount
                  amount={stFuelAmount || undefined}
                  decimals={DECIMAL_FUEL}
                  symbol="stFUEL"
                  textProps={{
                    as: 'div',
                    size: '6',
                    weight: 'bold',
                    className:
                      'font-mono text-[24px] text-heading text-ellipsis',
                  }}
                />
              }
            />
          </div>
        </div>
        <Separator size="4" />
        <HStack gap="2" align="center">
          <IconInfoCircle size={24} className="shrink-0 text-blue-11" />
          <VStack gap="1">
            <Link
              href="https://rig.st/"
              target="_blank"
              isExternal
              className="text-heading no-underline hover:no-underline"
            >
              View your stake on rig.st
            </Link>
          </VStack>
        </HStack>
      </div>
      <Button
        type="button"
        className="rounded-md w-full"
        size="3"
        onClick={onClose}
      >
        Close
      </Button>
    </div>
  );
}

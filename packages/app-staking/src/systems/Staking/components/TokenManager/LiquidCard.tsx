import {
  Alert,
  BadgeAsset,
  Card,
  HStack,
  Text,
  Tooltip,
  VStack,
} from '@fuels/ui';
import type { Address } from 'viem';

import { useAnimatedCounter } from '~staking/systems/Core/hooks/useAnimatedCounter';
import { formatAnimatedBalance } from '~staking/systems/Core/utils/formatAnimatedBalance';
import { useFormatBalance } from '../../../Core/hooks/useFormatBalance';
import { useTokenBalance } from '../../services/useTokenBalance';
type LiquidCardProps = {
  version: string;
  decimals: number;
  symbol: string;
  token: Address;
  account: Address | undefined;
  actionEl?: React.ReactNode;
};

export const LiquidCard = ({
  version,
  symbol,
  token,
  decimals,
  account,
  actionEl,
}: LiquidCardProps) => {
  const { data: tokens, error } = useTokenBalance(token, account);
  const { formatted, original } = useFormatBalance(tokens, decimals);

  const tokensRef = useAnimatedCounter({
    to: formatted.display,
    format: (value) => {
      return formatAnimatedBalance({
        value,
        formatted,
      });
    },
  });

  if (error) {
    return (
      <Alert variant="outline" color="red" className="text-sm">
        {error.message}
      </Alert>
    );
  }

  return (
    <Card className="grow p-6">
      <Card.Body className="p-0">
        <VStack gap="4">
          <Text color="gray" size="2" weight="medium">
            Liquid {version} tokens
          </Text>

          <HStack gap="4" align="center" minWidth="0px">
            <Tooltip
              content={`${original.display} ${symbol}`}
              delayDuration={0}
            >
              <Text
                ref={tokensRef}
                className="font-mono whitespace-nowrap overflow-hidden text-ellipsis"
                size="6"
                weight="bold"
              >
                0
              </Text>
            </Tooltip>
            <BadgeAsset icon="/assets/fuel.png" variant="transparent">
              {symbol}
            </BadgeAsset>
            {actionEl || null}
          </HStack>
        </VStack>
      </Card.Body>
    </Card>
  );
};

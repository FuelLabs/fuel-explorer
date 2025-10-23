import { Box, Card, Flex, HStack, Tooltip, VStack } from '@fuels/ui';
import { IconInfoCircle } from '@tabler/icons-react';
import type { BN } from 'fuels';
import type React from 'react';
import { tv } from 'tailwind-variants';
import { FormattedAmount } from '~staking/systems/Core/components/FormattedAmount/FormattedAmount';

type AmountCardProps = {
  title: string;
  titleSuffix?: React.ReactNode;
  amount: BN;
  symbol?: string;
  decimals?: number;
  infoTooltip?: React.ReactNode;
  actions?: React.ReactNode;
  secondaryTitle?: string;
  secondaryAmount?: BN;
  secondaryInfoTooltip?: React.ReactNode;
};

export function AmountCard({
  title,
  titleSuffix,
  amount,
  symbol,
  decimals = 9,
  infoTooltip,
  actions,
  secondaryAmount,
  secondaryInfoTooltip,
  secondaryTitle,
}: AmountCardProps) {
  const classes = styles();

  return (
    <Card className={classes.card()}>
      <Card.Title size="1" className="flex items-center">
        {title}
        {infoTooltip ? (
          <Tooltip
            content={infoTooltip}
            delayDuration={0}
            className="text-center"
          >
            <IconInfoCircle size={16} className="hidden md:block" />
          </Tooltip>
        ) : null}
        {titleSuffix}
      </Card.Title>
      <Card.Body className={classes.cardBody()}>
        <HStack className="flex-1 self-start" align="center" justify="start">
          <VStack gap="2" align="start">
            <FormattedAmount
              amount={amount}
              decimals={decimals}
              symbol={symbol}
              textProps={{
                as: 'div',
                size: '6',
                weight: 'bold',
                className:
                  'font-mono whitespace-nowrap overflow-hidden text-ellipsis',
              }}
            />
          </VStack>
          <Box className="h-full flex flex-1 items-end justify-end">
            {actions}
          </Box>
        </HStack>
        {secondaryTitle && secondaryAmount != null && (
          <VStack gap="1">
            <Card.Title size="1" className="flex items-center">
              {secondaryTitle}
              {secondaryInfoTooltip ? (
                <Tooltip
                  content={secondaryInfoTooltip}
                  delayDuration={0}
                  className="text-center"
                >
                  <IconInfoCircle size={16} className="hidden md:block" />
                </Tooltip>
              ) : null}
            </Card.Title>
            <Flex align="center" justify="start">
              <FormattedAmount
                amount={secondaryAmount}
                decimals={decimals}
                symbol={symbol}
                textProps={{
                  as: 'div',
                  size: '2',
                  weight: 'bold',
                  className:
                    'font-mono whitespace-nowrap overflow-hidden text-ellipsis',
                }}
              />
            </Flex>
          </VStack>
        )}
      </Card.Body>
    </Card>
  );
}
export const styles = tv({
  slots: {
    card: 'p-4 px-5 flex-1 gap-2',
    cardBody: 'p-0 flex flex-col gap-6',
  },
});

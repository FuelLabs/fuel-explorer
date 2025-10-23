import { tv } from 'tailwind-variants';
import { Text } from '../Text';
import { TokenLogo } from '../TokenLogo';

const tokenBadge = tv({
  base: [
    'inline-flex',
    'flex-shrink-0',
    'items-center',
    'bg-[--gray-a4]',
    'rounded-full',
    'shadow-sm',
    'border',
    'border-[--gray-a5]',
  ],
  variants: {
    size: {
      small: 'gap-1 pl-1 pr-2 py-0.5',
      medium: 'gap-2 pl-1 pr-3 py-1',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

export interface TokenBadgeProps {
  image?: string;
  symbol?: string;
  size?: 'small' | 'medium';
}

export function TokenBadge({
  image,
  symbol,
  size = 'medium',
}: TokenBadgeProps) {
  if (!image || !symbol) return null;

  return (
    <div className={tokenBadge({ size })}>
      <TokenLogo src={image} size={size === 'small' ? 20 : 24} alt={symbol} />

      <Text size="2" weight="medium">
        {symbol}
      </Text>
    </div>
  );
}

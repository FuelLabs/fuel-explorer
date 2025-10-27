import { useContext } from 'react';
import { InputAmountSimpleContext } from '../InputAmountSimple/InputAmountSimpleContext';
import { TokenBadge } from '../TokenBadge';

export interface InputAmountTokenProps {
  symbol?: string;
  image?: string;
  name?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function InputAmountToken({
  symbol: propsSymbol,
  image: propsImage,
  name,
  onClick,
  disabled = false,
}: InputAmountTokenProps) {
  // Try to get values from context, fall back to props
  const ctx = useContext(InputAmountSimpleContext);
  const symbol = propsSymbol ?? ctx?.symbol ?? 'FUEL';
  const image = propsImage ?? ctx?.image ?? '/assets/fuel.png';

  // Use symbol as fallback for display
  const displaySymbol = name || symbol;

  // If no onClick, just display the token badge
  if (!onClick) {
    return <TokenBadge image={image} symbol={displaySymbol} size="small" />;
  }

  // If onClick is provided, wrap in a button
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="cursor-pointer hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <TokenBadge image={image} symbol={displaySymbol} size="small" />
    </button>
  );
}

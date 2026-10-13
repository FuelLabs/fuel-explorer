import { HStack, Square } from '@fuels/ui';
import { AnimatedError } from '~staking/systems/Core/components/AnimatedError/AnimatedError';

interface ErrorInlineProps {
  error?: string | null;
  className?: string;
}

export const ErrorInline = ({ error, className = '' }: ErrorInlineProps) => {
  if (!error) return null;

  return (
    <HStack gap="2" className={`mb-3 items-center ${className}`}>
      <Square kind="danger" className="mb-auto mt-[6px]" />
      <AnimatedError error={error} />
    </HStack>
  );
};

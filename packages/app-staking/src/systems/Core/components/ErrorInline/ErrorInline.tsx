import { HStack } from '@fuels/ui';
import { AnimatedError } from '~staking/systems/Core/components/AnimatedError/AnimatedError';

interface ErrorInlineProps {
  error?: string | null;
  className?: string;
}

export const ErrorInline = ({ error, className = '' }: ErrorInlineProps) => {
  if (!error) return null;

  return (
    <HStack gap="2" className={`mb-3 items-center ${className}`}>
      <span
        aria-hidden
        className="mb-auto mt-[6px] size-2 shrink-0 border border-[var(--red-10)] bg-[var(--red-10)]"
      />
      <AnimatedError error={error} />
    </HStack>
  );
};

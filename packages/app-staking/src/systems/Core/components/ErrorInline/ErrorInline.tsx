import { HStack } from '@fuels/ui';
import { IconSquareLetterX } from '@tabler/icons-react';
import { AnimatedError } from '~staking/systems/Core/components/AnimatedError/AnimatedError';

interface ErrorInlineProps {
  error?: string | null;
  className?: string;
}

export const ErrorInline = ({ error, className = '' }: ErrorInlineProps) => {
  if (!error) return null;

  return (
    <HStack gap="2" className={`mb-3 items-center ${className}`}>
      <IconSquareLetterX
        size={18}
        className="mt-[3px] mb-auto text-red-11 shrink-0"
      />
      <AnimatedError error={error} />
    </HStack>
  );
};

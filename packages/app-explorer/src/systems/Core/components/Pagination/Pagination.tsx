import { Button, HStack, cx } from '@fuels/ui';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

type PaginationProps = {
  hasPrev?: boolean;
  hasNext?: boolean;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
};

export function Pagination({
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  className,
}: PaginationProps) {
  return (
    <HStack
      gap="1"
      className={cx(
        'w-full tablet:w-auto grid grid-cols-[auto_1fr_auto]',
        className,
      )}
    >
      <Button
        size="2"
        variant="ghost"
        color="gray"
        disabled={!hasPrev}
        onClick={onPrev}
      >
        <IconArrowLeft size={14} />
      </Button>
      <Button
        size="2"
        variant="ghost"
        color="gray"
        disabled={!hasNext}
        onClick={onNext}
      >
        <IconArrowRight size={14} />
      </Button>
    </HStack>
  );
}

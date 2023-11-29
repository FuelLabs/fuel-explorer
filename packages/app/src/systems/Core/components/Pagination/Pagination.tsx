import type { BaseProps } from '@fuels/ui';
import { HStack, Button, cx } from '@fuels/ui';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

type PaginationProps = BaseProps<{
  page: number;
  onChange?: (page: number) => void;
}>;

export function Pagination({ page, onChange, ...props }: PaginationProps) {
  const hasPrev = page > 1;
  const hasNext = page < 10;

  return (
    <HStack
      gap="1"
      {...props}
      className={cx(
        'w-full tablet:w-auto grid grid-cols-[auto_1fr_auto]',
        props.className,
      )}
    >
      <Button
        size="2"
        variant="ghost"
        color="gray"
        disabled={!hasPrev}
        onClick={() => onChange?.(page - 1)}
      >
        <IconArrowLeft size={14} />
      </Button>
      <Button
        aria-readonly
        size="2"
        variant="ghost"
        color="gray"
        className="bg-gray-3"
      >
        Page {page}
      </Button>
      <Button
        size="2"
        variant="ghost"
        color="gray"
        disabled={!hasNext}
        onClick={() => onChange?.(page + 1)}
      >
        <IconArrowRight size={14} />
      </Button>
    </HStack>
  );
}

'use client';
import { GqlPageInfo } from '@fuel-ts/account/dist/providers/__generated__/operations';
import type { BaseProps } from '@fuels/ui';
import { Button, HStack, cx } from '@fuels/ui';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

type PaginationProps = BaseProps<{
  nextCursor?: string | null;
  prevCursor?: string | null;
  onChange?: (cursor: string, dir: 'after' | 'before') => void;
  pageInfo?: GqlPageInfo;
}>;

export function Pagination({
  onChange,
  prevCursor,
  nextCursor,
  pageInfo,
  ...props
}: PaginationProps) {
  return (
    <HStack
      gap="1"
      {...props}
      className={cx(
        'w-full tablet:w-auto grid grid-cols-[auto_1fr_auto]',
        props.className,
      )}
    >
      {pageInfo?.hasNextPage && (
        <Button
          size="2"
          variant="ghost"
          color="gray"
          onClick={() => onChange?.(prevCursor ?? '', 'after')}
        >
          <IconArrowLeft size={14} />
        </Button>
      )}
      {pageInfo?.hasPreviousPage && (
        <Button
          size="2"
          variant="ghost"
          color="gray"
          onClick={() => onChange?.(nextCursor ?? '', 'before')}
        >
          <IconArrowRight size={14} />
        </Button>
      )}
    </HStack>
  );
}

import type { GQLPageInfo } from '@fuel-explorer/graphql/sdkProvider';
import type { BaseProps } from '@fuels/ui';
import { Button, ButtonGroup, HStack, cx } from '@fuels/ui';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

type PaginationProps = BaseProps<{
  nextCursor?: string | null;
  prevCursor?: string | null;
  onChange?: (cursor: string, dir: 'after' | 'before') => void;
  pageInfo?: Omit<GQLPageInfo, '__typename'>;
}>;

export function Pagination({
  onChange,
  prevCursor,
  nextCursor,
  pageInfo,
  ...props
}: PaginationProps) {
  function format(num: number, digits: number) {
    const lookup = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'G' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' },
    ];
    const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
    const item = lookup.findLast((item) => num >= item.value);
    return item
      ? (num / item.value)
          .toFixed(digits)
          .replace(regexp, '')
          .concat(item.symbol)
      : '0';
  }

  return (
    <HStack
      gap="1"
      {...props}
      className={cx('w-full tablet:w-auto h-[40px]', props.className)}
    >
      {(pageInfo?.hasNextPage || pageInfo?.hasPreviousPage) && (
        <ButtonGroup>
          <Button
            size="2"
            variant="ghost"
            color="gray"
            onClick={() => onChange?.(prevCursor ?? '', 'after')}
            className="grow tablet:grow-0"
            {...{ disabled: !pageInfo?.hasNextPage }}
          >
            <IconArrowLeft size={14} />
          </Button>
          {pageInfo?.startCount &&
            pageInfo?.endCount &&
            pageInfo?.totalCount && (
              <Button disabled>
                {pageInfo.startCount} -{' '}
                {Math.min(pageInfo.endCount, pageInfo.totalCount)} of{' '}
                {format(pageInfo.totalCount, 1)}
              </Button>
            )}
          <Button
            size="2"
            variant="ghost"
            color="gray"
            onClick={() => onChange?.(nextCursor ?? '', 'before')}
            className="grow tablet:grow-0"
            {...{ disabled: !pageInfo?.hasPreviousPage }}
          >
            <IconArrowRight size={14} />
          </Button>
        </ButtonGroup>
      )}
    </HStack>
  );
}

import type { GQLPageInfo } from '@fuel-explorer/graphql/sdkProvider';
import type { BaseProps } from '@fuels/ui';
import { HStack, cx } from '@fuels/ui';
import { IconArrowLeft, IconArrowRight } from '@fuels/ui';
import { useTranslation } from 'react-i18next';

type PaginationProps = BaseProps<{
  nextCursor?: string | null;
  prevCursor?: string | null;
  onChange?: (cursor: string, dir: 'after' | 'before') => void;
  pageInfo?: Omit<GQLPageInfo, '__typename'>;
}>;

const ARROW =
  'grid size-10 shrink-0 grow cursor-pointer place-items-center border-0 bg-transparent p-0 text-heading tablet:grow-0 fuel-hover-fill focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--fuel-primary)] disabled:cursor-not-allowed disabled:text-[var(--fuel-element-disabled)] disabled:hover:bg-transparent motion-reduce:transition-none';

export function Pagination({
  onChange,
  prevCursor,
  nextCursor,
  pageInfo,
  ...props
}: PaginationProps) {
  const { t } = useTranslation();

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
        <div className="fuel-appear flex w-full items-stretch border border-[var(--fuel-line)] bg-[var(--fuel-background)] tablet:w-auto">
          <button
            type="button"
            aria-label={t('core.pagination.previous')}
            onClick={() => onChange?.(prevCursor ?? '', 'after')}
            disabled={!pageInfo?.hasNextPage}
            className={ARROW}
          >
            <IconArrowLeft size={14} />
          </button>
          {pageInfo?.startCount &&
            pageInfo?.endCount &&
            pageInfo?.totalCount && (
              <span className="fuel-label grid flex-1 place-items-center whitespace-nowrap border-[var(--fuel-line)] border-x border-y-0 border-solid px-4 tablet:flex-none">
                {t('core.pagination.range', {
                  start: pageInfo.startCount,
                  end: Math.min(pageInfo.endCount, pageInfo.totalCount),
                  total:
                    pageInfo.totalCount >= 1000
                      ? '1000+'
                      : format(pageInfo.totalCount, 1),
                })}
              </span>
            )}
          <button
            type="button"
            aria-label={t('core.pagination.next')}
            onClick={() => onChange?.(nextCursor ?? '', 'before')}
            disabled={!pageInfo?.hasPreviousPage}
            className={ARROW}
          >
            <IconArrowRight size={14} />
          </button>
        </div>
      )}
    </HStack>
  );
}

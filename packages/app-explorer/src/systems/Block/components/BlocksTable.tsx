import type { GQLBlocksQuery } from '@fuel-explorer/graphql';
import { GridTable, IconArrowRight, Link } from '@fuels/ui';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { InfoHint } from '~/systems/Core/components/InfoHint/InfoHint';
import BlockEfficiencyItem from './BlockEfficiencyItem';
import BlockHashItem from './BlockHashItem';
import BlockItem from './BlockItem';
import BlockTimeItem from './BlockTimeItem';
import BlockValidatorItem from './BlockValidatorItem';

const TOKENS = {
  line: 'var(--fuel-line)',
  low: 'var(--fuel-element-low-em)',
  high: 'var(--fuel-element-high-em)',
  muted: 'var(--fuel-muted)',
};

// Flat rows on hairlines. This replaces the grid table's default look.
const tableStyles = {
  tableWrapper: { style: { borderRadius: '0' } },
  table: { style: { backgroundColor: 'transparent' } },
  headRow: {
    style: {
      backgroundColor: 'transparent',
      borderBottom: `1px solid ${TOKENS.line}`,
      minHeight: '44px',
    },
  },
  headCells: {
    style: {
      backgroundColor: 'transparent',
      color: TOKENS.low,
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      fontWeight: '500',
      letterSpacing: '0.6px',
      textTransform: 'uppercase',
      textAlign: 'left',
    },
  },
  rows: {
    style: {
      backgroundColor: 'transparent',
      color: TOKENS.high,
      borderRadius: '0',
      marginBottom: '0',
      fontWeight: '400',
      transition: 'background-color 300ms',
      '&:not(:last-of-type)': {
        borderBottom: `1px solid ${TOKENS.line}`,
      },
      '&:hover': { backgroundColor: TOKENS.muted },
    },
  },
  cells: {
    style: {
      display: 'flex',
      justifyContent: 'flex-start',
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem',
      backgroundColor: 'transparent',
      color: TOKENS.high,
      fontWeight: '400',
    },
  },
};

// The grid table renders its own page links. These variants restyle them as
// hairline squares.
const PAGER = [
  '[&_.pagination_li]:m-0',
  '[&_.pagination]:gap-0 [&_.pagination]:border [&_.pagination]:border-[var(--fuel-line)] [&_.pagination]:w-fit [&_.pagination]:ml-auto [&_.pagination]:bg-[var(--fuel-background)]',
  '[&_.pagination_li_a]:block [&_.pagination_li_a]:rounded-none [&_.pagination_li_a]:bg-transparent [&_.pagination_li_a]:px-3 [&_.pagination_li_a]:py-2.5 [&_.pagination_li_a]:font-mono [&_.pagination_li_a]:text-[12px] [&_.pagination_li_a]:text-[var(--fuel-element-mid-em)] [&_.pagination_li_a]:transition-colors',
  '[&_.pagination_li_a:hover]:bg-[var(--fuel-muted)] [&_.pagination_li_a:hover]:text-[var(--fuel-element-high-em)]',
  '[&_.pagination_li.selected_a]:bg-[var(--fuel-primary)] [&_.pagination_li.selected_a]:text-[var(--fuel-primary-foreground)]',
  '[&_.pagination_li.previous_a]:px-3 [&_.pagination_li.next_a]:px-3',
  '[&_.pagination_li.disabled_a]:text-[var(--fuel-element-disabled)] [&_.pagination_li.disabled_a:hover]:bg-transparent',
].join(' ');

type BlocksTableProps = {
  blocks: GQLBlocksQuery['blocks'];
  onPageChanged: (pageNumber: number) => void;
  pageCount: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
};

function Head({ label, hint }: { label: string; hint?: string }) {
  return (
    <span className="flex items-center gap-1">
      {label}
      {hint && <InfoHint content={hint} />}
    </span>
  );
}

function BlocksTable({
  blocks,
  onPageChanged,
  pageCount,
  currentPage,
  setCurrentPage,
}: BlocksTableProps) {
  const { t, i18n } = useTranslation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: language changes the header strings
  const columns = useMemo(
    () => [
      {
        name: <Head label={t('block.col_block')} />,
        cell: (row: any) => (
          <BlockItem
            blockId={row.node.header.height}
            totalFee={Number(row.node.totalFee || 0)}
          />
        ),
        sortable: false,
      },
      {
        name: (
          <Head
            label={t('block.col_blockhash')}
            hint={t('block.col_blockhash_hint')}
          />
        ),
        cell: (row: any) => (
          <BlockHashItem hashAddress={row.node.id} width="108px" />
        ),
        sortable: false,
      },
      {
        name: <Head label={t('block.col_transactions')} />,
        cell: (row: any) => (
          <div className="font-mono text-heading text-sm">
            {row.node.header.transactionsCount}
          </div>
        ),
        sortable: false,
      },
      {
        name: (
          <Head
            label={t('block.col_rewards')}
            hint={t('block.col_rewards_hint')}
          />
        ),
        cell: (row: any) => {
          const mintTransaction = row.node.transactions.find(
            (trans: any) => trans.mintAmount != null,
          );
          return (
            <div className="flex w-full justify-start px-1 font-mono text-heading text-sm">
              {mintTransaction ? (
                mintTransaction.mintAmount
              ) : (
                <span
                  role="img"
                  aria-label={t('block.no_mint_amount')}
                  className="text-[var(--fuel-element-low-em)]"
                >
                  —
                </span>
              )}
            </div>
          );
        },
        sortable: false,
      },
      {
        name: <Head label={t('block.col_producer')} />,
        cell: (row: any) => (
          <div className="flex w-130 items-center">
            <BlockValidatorItem hashAddress={row.node.producer} />
          </div>
        ),
        sortable: false,
      },
      {
        name: (
          <Head
            label={t('block.col_efficiency')}
            hint={t('block.col_efficiency_hint')}
          />
        ),
        cell: (row: any) => (
          <div className="w-[6.8rem]">
            <BlockEfficiencyItem current={row.node.totalFee} total={30000000} />
          </div>
        ),
        sortable: false,
      },
      {
        name: <Head label={t('block.col_time')} />,
        cell: (row: any) => {
          const unixTimestamp = row.node.time.rawUnix;
          const date = new Date(unixTimestamp * 1000);

          return (
            <div className="w-[6.5rem]">
              <BlockTimeItem timeAgo={row.node.time.fromNow} time={date} />
            </div>
          );
        },
        sortable: false,
      },
      {
        name: '',
        cell: (row: any) => (
          <Link
            isExternal={false}
            href={`/block/${row.node.header.height}/simple`}
            className="fuel-eyebrow fuel-hover-fill flex items-center gap-2 border border-[var(--fuel-line)] px-3 py-2 text-[11px] text-heading no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fuel-primary)] motion-reduce:transition-none"
          >
            {t('block.view')}
            <IconArrowRight size={12} />
          </Link>
        ),
        sortable: false,
      },
    ],
    [t, i18n.language],
  );

  return (
    <div className={`fuel-appear ${PAGER}`}>
      <GridTable
        columns={columns}
        data={blocks.edges}
        customStyles={tableStyles as any}
        onPageChanged={onPageChanged}
        pageCount={pageCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        previousLabel={t('block.pager_previous')}
        nextLabel={t('block.pager_next')}
      />
    </div>
  );
}

export default BlocksTable;

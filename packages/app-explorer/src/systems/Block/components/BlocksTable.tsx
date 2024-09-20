import { GQLBlocksQuery } from '@fuel-explorer/graphql';
import { GridTable } from '@fuels/ui';
import { Link } from '@fuels/ui';
import NextLink from 'next/link';
import BlockEfficiencyItem from './BlockEfficiencyItem';
import BlockHashItem from './BlockHashItem';
import BlockItem from './BlockItem';
import BlockTimeItem from './BlockTimeItem';
import BlockValidatorItem from './BlockValidatorItem';

const columns = [
  {
    name: 'Block',
    cell: (row: any) => {
      const totalGasUsed = (
        parseFloat(row.node.totalGasUsed) /
        10 ** 9
      ).toString();
      return (
        <BlockItem blockId={row.node.header.height} ethValue={totalGasUsed} />
      );
    },
    sortable: false,
  },
  {
    name: 'Blockhash',
    cell: (row: any) => (
      <BlockHashItem hashAddress={row.node.id} width="100px" />
    ),
    sortable: false,
  },
  {
    name: 'Transactions',
    cell: (row: any) => (
      <div className="font-mono text-sm text-gray-9">
        {row.node.header.transactionsCount}
      </div>
    ),
    sortable: false,
  },
  {
    name: 'Rewards',
    cell: (row: any) => {
      const mintTransaction = row.node.transactions.find(
        (trans: any) => trans.mintAmount != null,
      );
      return (
        <div className="font-mono text-sm text-gray-9">
          {mintTransaction ? mintTransaction.mintAmount : 'No mint amount'}{' '}
        </div>
      );
    },
    sortable: false,
  },
  {
    name: 'Validator',
    cell: (row: any) => (
      <div className="flex items-center justify-center w-full">
        <BlockValidatorItem hashAddress={row.node.producer} />
      </div>
    ),
    sortable: false,
  },
  {
    name: 'Efficiency',
    cell: (row: any) => (
      <div className="w-[10rem]">
        <BlockEfficiencyItem current={row.node.totalGasUsed} total={30000000} />
      </div>
    ),
    sortable: false,
  },
  {
    name: 'Time',
    cell: (row: any) => {
      const unixTimestamp = row.node.time.rawUnix;
      const date = new Date(unixTimestamp * 1000);

      return <BlockTimeItem timeAgo={row.node.time.fromNow} time={date} />;
    },
    sortable: false,
  },
  {
    name: '',
    cell: (row: any) => (
      <Link
        as={NextLink}
        isExternal={false}
        href={`/block/${row.node.header.height}/simple`}
        className="px-4 py-[0.4rem] bg-gray-3 hover:bg-black hover:text-white dark:hover:bg-brand text-black dark:text-white rounded font-semibold font-mono"
      >
        View
      </Link>
    ),
    sortable: false,
  },
];

type BlocksTableProps = {
  blocks: GQLBlocksQuery['blocks'];
  onPageChanged: (pageNumber: number) => void;
  pageCount: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
};

function BlocksTable({
  blocks,
  onPageChanged,
  pageCount,
  currentPage,
  setCurrentPage,
}: BlocksTableProps) {
  const handlePageChanged = (pageNumber: number) => {
    onPageChanged(pageNumber);
  };

  return (
    <div>
      <GridTable
        columns={columns}
        data={blocks.edges}
        onPageChanged={handlePageChanged}
        pageCount={pageCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default BlocksTable;

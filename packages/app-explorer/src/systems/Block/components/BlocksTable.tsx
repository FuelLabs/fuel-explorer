import { GQLBlocksQuery } from '@fuel-explorer/graphql';
import { GridTable } from '@fuels/ui';
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
        parseFloat(row.node.totalGasUsed) *
        10 ** 9
      ).toString();
      return (
        <BlockItem blockId={row.node.header.height} ethValue={totalGasUsed} />
      );
    },
    sortable: true,
  },
  {
    name: 'BlockHash',
    cell: (row: any) => (
      <BlockHashItem hashAddress={row.node.id} width="100px" />
    ),
    sortable: true,
  },
  {
    name: 'Transactions',
    cell: (row: any) => (
      <div className="font-mono text-sm text-gray-9">
        {row.node.header.transactionsCount}
      </div>
    ),
    sortable: true,
  },
  {
    name: 'Rewards',
    cell: (row: any) => {
      const mintTransaction = row.node.transactions.find(
        (trans: any) => trans.mintAmount != null,
      );
      return (
        <div className="font-mono text-sm text-gray-9">
          {mintTransaction ? mintTransaction.mintAmount : 'No mint amount'}
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
    sortable: true,
  },
  {
    name: 'Efficiency',
    cell: (row: any) => (
      <div className="w-[10rem]">
        <BlockEfficiencyItem current={row.node.totalGasUsed} total={30000000} />
      </div>
    ),
    sortable: true,
  },
  {
    name: 'Time',
    cell: (row: any) => {
      const unixTimestamp = row.node.time.rawUnix;
      const date = new Date(unixTimestamp * 1000);

      return <BlockTimeItem timeAgo={row.node.time.fromNow} time={date} />;
    },
    sortable: true,
  },
  {
    name: '',
    cell: (row: any) => (
      <button
        type="button"
        onClick={() => console.log('Button clicked for:', row.name)}
        className="px-4 py-[0.4rem] bg-gray-3 hover:text-black hover:bg-brand text-black dark:text-white rounded font-semibold font-mono"
      >
        View
      </button>
    ),
    sortable: false,
  },
];

type BlocksTableProps = {
  blocks: GQLBlocksQuery['blocks'];
  onPageChanged: (pageNumber: number) => void;
  pageCount: number;
};

export function BlocksTable({
  blocks,
  onPageChanged,
  pageCount,
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
      />
    </div>
  );
}

export default BlocksTable;

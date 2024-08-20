import { GridTable } from '@fuels/ui';
import BlockEfficiencyItem from '../BlockEfficiencyItem/BlockEfficiencyItem';
import BlockHashItem from '../BlockHashItem/BlockHashItem';
import BlockItem from '../BlockItem/BlockItem';
import BlockValidatorItem from '../BlockValidatorItem/BlockValidatorItem';

export interface RowData {
  id: number;
  name: string;
  age: number;
  email: string;
  status: string;
}

export const data: RowData[] = [
  {
    id: 1,
    name: 'John Doe',
    age: 28,
    email: 'john.doe@example.com',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 34,
    email: 'jane.smith@example.com',
    status: 'Inactive',
  },
  {
    id: 3,
    name: 'Michael Johnson',
    age: 45,
    email: 'michael.johnson@example.com',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Emily Davis',
    age: 23,
    email: 'emily.davis@example.com',
    status: 'Pending',
  },
  {
    id: 5,
    name: 'William Brown',
    age: 39,
    email: 'william.brown@example.com',
    status: 'Active',
  },
  {
    id: 6,
    name: 'Olivia Taylor',
    age: 29,
    email: 'olivia.taylor@example.com',
    status: 'Inactive',
  },
  {
    id: 7,
    name: 'James Anderson',
    age: 32,
    email: 'james.anderson@example.com',
    status: 'Pending',
  },
  {
    id: 8,
    name: 'Sophia Thomas',
    age: 27,
    email: 'sophia.thomas@example.com',
    status: 'Active',
  },
  {
    id: 9,
    name: 'Isabella Lee',
    age: 31,
    email: 'isabella.lee@example.com',
    status: 'Inactive',
  },
  {
    id: 10,
    name: 'David Martinez',
    age: 36,
    email: 'david.martinez@example.com',
    status: 'Active',
  },
];

export const columns = [
  {
    name: 'Block',
    cell: () => <BlockItem />,
    sortable: true,
  },
  {
    name: 'BlockHash',
    cell: () => (
      <BlockHashItem
        hashAddress="sdasjasasnajsnaksnajsnsjansjansasnjansa"
        width="100px"
      />
    ),
    sortable: true,
  },
  {
    name: 'Transactions',
    cell: (row: RowData) => (
      <div className="font-mono text-sm text-gray-9">{row.age}</div>
    ),
    sortable: true,
  },
  {
    name: 'Rewards',
    cell: () => <div className="font-mono text-sm text-gray-9">12</div>,
    sortable: false,
  },
  {
    name: 'Validator',
    cell: () => (
      <div className="flex items-center justify-center w-full">
        <BlockValidatorItem hashAddress="asansjasnajsnajsnajsnajsnajsnajsnajsna" />
      </div>
    ),
    sortable: true,
  },
  {
    name: 'Efficiency',
    cell: () => <BlockEfficiencyItem current={10} progress={44} total={100} />,
    sortable: true,
  },
  {
    name: 'Time',
    selector: (row: RowData) => row.status,
    sortable: true,
  },
  {
    name: '',
    selector: (row: RowData) => row.status,
    sortable: true,
  },
];

function BlocksTable() {
  return (
    <div>
      <GridTable
        columns={columns}
        data={data}
        onPageChanged={() => {}}
        pageCount={2}
      />
    </div>
  );
}

export default BlocksTable;

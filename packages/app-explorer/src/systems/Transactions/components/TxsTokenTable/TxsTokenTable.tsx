import { GridTable } from '@fuels/ui';
import NFTHashItem from '../NFTHashItem/NFTHashItem';
import NFTProfileHolderIcon from '../NFTProfileHolderIcon/NFTProfileHolderIcon';
import NFTItem from '../NFTitem/NFTitem';

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
    name: 'Rank',
    cell: () => <div className="w-[12rem]">1 </div>,
    sortable: true,
  },
  {
    name: 'NFT Collection',
    cell: () => (
      <div className="w-[12rem]">
        <NFTProfileHolderIcon />
      </div>
    ),
    sortable: true,
  },
  {
    name: 'Mint Adderess',
    cell: () => (
      <div className="w-[12rem]">
        <NFTItem />
      </div>
    ),
    sortable: true,
  },
  {
    name: 'Floor Price',
    cell: () => <div className="font-mono text-sm w-[12rem]">22.00%</div>,
    sortable: false,
  },
  {
    name: 'Total Supply',
    cell: () => (
      <div className="w-[8rem]">
        <NFTHashItem
          hashAddress="sdasjasasnajsnaksnajsnsjansjansasnjansa"
          width="100px"
        />
      </div>
    ),
    sortable: true,
  },
  {
    name: 'Holders',
    cell: () => (
      <div className="w-[8rem]">
        <NFTHashItem
          hashAddress="sdasjasasnajsnaksnajsnsjansjansasnjansa"
          width="100px"
        />
      </div>
    ),
    sortable: true,
  },
];

export function TxsTokenTable() {
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

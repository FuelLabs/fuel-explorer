import { GridTable } from '@fuels/ui';
import NFTHashItem from '../NFTHashItem/NFTHashItem';
import NFTProfileIcon from '../NFTProfileIcon/NFTProfileIcon';
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
    name: 'Item',
    cell: () => <NFTProfileIcon />,
    sortable: true,
  },
  {
    name: 'Tx Hash',
    cell: () => <NFTItem />,
    sortable: true,
  },
  {
    name: 'Type',
    cell: () => (
      <div className="flex gap-2">
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_2315_3069)">
            <path
              d="M3.29309 6.40676C3.20021 6.3139 3.12653 6.20365 3.07626 6.08231C3.02599 5.96097 3.00011 5.83092 3.00011 5.69958C3.00011 5.56824 3.02599 5.43818 3.07626 5.31684C3.12653 5.1955 3.20021 5.08525 3.29309 4.99239L7.29309 0.99239C7.48065 0.804832 7.73503 0.699463 8.00028 0.699463C8.26552 0.699463 8.51991 0.804832 8.70746 0.99239C8.89502 1.17995 9.00039 1.43433 9.00039 1.69958C9.00039 1.96482 8.89502 2.21921 8.70746 2.40676L4.70746 6.40676C4.6146 6.49965 4.50435 6.57333 4.38301 6.6236C4.26167 6.67387 4.13162 6.69974 4.00028 6.69974C3.86893 6.69974 3.73888 6.67387 3.61754 6.6236C3.4962 6.57333 3.38595 6.49965 3.29309 6.40676ZM15.2075 7.49239C15.1146 7.39951 15.0044 7.32583 14.883 7.27556C14.7617 7.22529 14.6316 7.19942 14.5003 7.19942C14.3689 7.19942 14.2389 7.22529 14.1175 7.27556C13.9962 7.32583 13.8859 7.39951 13.7931 7.49239L9.79309 11.4924C9.7002 11.5852 9.62652 11.6955 9.57626 11.8168C9.52599 11.9382 9.50011 12.0682 9.50011 12.1996C9.50011 12.3309 9.52599 12.461 9.57626 12.5823C9.62652 12.7037 9.7002 12.8139 9.79309 12.9068C9.88595 12.9996 9.9962 13.0733 10.1175 13.1236C10.2389 13.1739 10.3689 13.1997 10.5003 13.1997C10.6316 13.1997 10.7617 13.1739 10.883 13.1236C11.0044 13.0733 11.1146 12.9996 11.2075 12.9068L15.2075 8.90676C15.3003 8.8139 15.374 8.70365 15.4243 8.58231C15.4746 8.46097 15.5004 8.33092 15.5004 8.19958C15.5004 8.06824 15.4746 7.93818 15.4243 7.81684C15.374 7.6955 15.3003 7.58525 15.2075 7.49239ZM13.0131 6.50489L9.69496 3.18676C9.67174 3.16352 9.64417 3.14508 9.61382 3.1325C9.58347 3.11992 9.55094 3.11344 9.51809 3.11344C9.48523 3.11344 9.4527 3.11992 9.42235 3.1325C9.392 3.14508 9.36443 3.16352 9.34121 3.18676L5.48746 7.04051C5.46422 7.06373 5.44578 7.0913 5.4332 7.12165C5.42062 7.152 5.41414 7.18454 5.41414 7.21739C5.41414 7.25024 5.42062 7.28277 5.4332 7.31312C5.44578 7.34347 5.46422 7.37105 5.48746 7.39426L6.43746 8.34614L1.79309 12.993C1.61347 13.1821 1.51481 13.4338 1.51815 13.6946C1.52149 13.9553 1.62656 14.2045 1.81096 14.3889C1.99536 14.5733 2.2445 14.6784 2.50526 14.6817C2.76603 14.685 3.01778 14.5864 3.20684 14.4068L7.85371 9.76239L8.80559 10.7143C8.82881 10.7375 8.85638 10.7559 8.88673 10.7685C8.91708 10.7811 8.94961 10.7876 8.98246 10.7876C9.01532 10.7876 9.04785 10.7811 9.0782 10.7685C9.10855 10.7559 9.13612 10.7375 9.15934 10.7143L13.0131 6.86051C13.0366 6.83726 13.0553 6.80957 13.068 6.77905C13.0808 6.74853 13.0874 6.71578 13.0874 6.6827C13.0874 6.64962 13.0808 6.61688 13.068 6.58635C13.0553 6.55583 13.0366 6.52814 13.0131 6.50489Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_2315_3069">
              <rect
                width="16"
                height="16"
                fill="white"
                transform="translate(0 0.199951)"
              />
            </clipPath>
          </defs>
        </svg>
        Bid
      </div>
    ),
    sortable: true,
  },
  {
    name: 'Block',
    cell: () => <div className="font-mono text-sm">#4540196</div>,
    sortable: false,
  },
  {
    name: 'From',
    cell: () => (
      <NFTHashItem
        hashAddress="sdasjasasnajsnaksnajsnsjansjansasnjansa"
        width="100px"
      />
    ),
    sortable: true,
  },
  {
    name: 'To',
    cell: () => (
      <NFTHashItem
        hashAddress="sdasjasasnajsnaksnajsnsjansjansasnjansa"
        width="100px"
      />
    ),
    sortable: true,
  },
  {
    name: 'Amount',
    cell: () => <div className="">1.14 ETH</div>,
    sortable: true,
  },
];

export function NFTsTable() {
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

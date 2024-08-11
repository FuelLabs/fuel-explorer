import { TableColumn } from 'react-data-table-component';

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

export const columns: TableColumn<RowData>[] = [
  {
    name: 'ID',
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Age',
    selector: (row) => row.age,
    sortable: true,
  },
  {
    name: 'Email',
    selector: (row) => row.email,
    sortable: false,
  },
  {
    name: 'Status',
    selector: (row) => row.status,
    sortable: true,
  },
];

// import type { Meta, StoryObj } from "@storybook/react";

// import { TableColumn } from "react-data-table-component";
// import { GridTable, GridTableProps } from "./GridTable";

// export interface RowData {
//   id: number;
//   name: string;
//   age: number;
//   email: string;
//   status: string;
// }

// const data: RowData[] = [
//   {
//     id: 1,
//     name: "John Doe",
//     age: 28,
//     email: "john.doe@example.com",
//     status: "Active",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     age: 34,
//     email: "jane.smith@example.com",
//     status: "Inactive",
//   },
//   {
//     id: 3,
//     name: "Michael Johnson",
//     age: 45,
//     email: "michael.johnson@example.com",
//     status: "Active",
//   },
//   {
//     id: 4,
//     name: "Emily Davis",
//     age: 23,
//     email: "emily.davis@example.com",
//     status: "Pending",
//   },
//   {
//     id: 5,
//     name: "William Brown",
//     age: 39,
//     email: "william.brown@example.com",
//     status: "Active",
//   },
//   {
//     id: 6,
//     name: "Olivia Taylor",
//     age: 29,
//     email: "olivia.taylor@example.com",
//     status: "Inactive",
//   },
//   {
//     id: 7,
//     name: "James Anderson",
//     age: 32,
//     email: "james.anderson@example.com",
//     status: "Pending",
//   },
//   {
//     id: 8,
//     name: "Sophia Thomas",
//     age: 27,
//     email: "sophia.thomas@example.com",
//     status: "Active",
//   },
//   {
//     id: 9,
//     name: "Isabella Lee",
//     age: 31,
//     email: "isabella.lee@example.com",
//     status: "Inactive",
//   },
//   {
//     id: 10,
//     name: "David Martinez",
//     age: 36,
//     email: "david.martinez@example.com",
//     status: "Active",
//   },
// ];

// const columns: TableColumn<RowData>[] = [
//   {
//     name: "Rank",
//     selector: (row) => row.id,
//     sortable: true,
//   },
//   {
//     name: "Token",
//     selector: (row) => row.name,
//     sortable: true,
//   },
//   {
//     name: "Price",
//     selector: (row) => row.age,
//     sortable: true,
//   },
//   {
//     name: "24H Change (%)",
//     selector: (row) => row.email,
//     sortable: false,
//   },
//   {
//     name: "Volume (24H)",
//     selector: (row) => row.status,
//     sortable: true,
//   },
// ];

// const meta: Meta<typeof GridTable> = {
//   title: "Home/GridTable",
//   component: GridTable,
//   parameters: {
//     layout: "fullscreen",
//   },
// };

// export default meta;
// type Story = StoryObj<GridTableProps<any>>;

// export const Desktop: Story = {
//   args: {
//     columns,
//     data: data.slice(0, 10),
//     totalRows: data.length,
//     rowsPerPage: 10,
//     pageCount: Math.ceil(data.length / 10),
//     onPageChanged: (selectedPage: number) =>
//       console.log(`Page changed to: ${selectedPage}`),
//   },
// };

// export const Tablet: Story = {
//   args: {
//     columns,
//     data: data.slice(0, 10),
//     totalRows: data.length,
//     rowsPerPage: 10,
//     pageCount: Math.ceil(data.length / 10),
//     onPageChanged: (selectedPage: number) =>
//       console.log(`Page changed to: ${selectedPage}`),
//   },
//   parameters: {
//     viewport: {
//       defaultViewport: "ipad",
//     },
//   },
// };

// export const Mobile: Story = {
//   args: {
//     columns,
//     data: data.slice(0, 10),
//     totalRows: data.length,
//     rowsPerPage: 10,
//     pageCount: Math.ceil(data.length / 10),
//     onPageChanged: (selectedPage: number) =>
//       console.log(`Page changed to: ${selectedPage}`),
//   },
//   parameters: {
//     viewport: {
//       defaultViewport: "iphonex",
//     },
//   },
// };

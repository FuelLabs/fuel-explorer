import { Table as RT } from '@radix-ui/themes';

import { createComponent, withNamespace } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type TableProps = PropsOf<typeof RT.Root>;
export type TableHeaderProps = PropsOf<typeof RT.Header>;
export type TableBodyProps = PropsOf<typeof RT.Body>;
export type TableRowProps = PropsOf<typeof RT.Row>;
export type TableCellProps = PropsOf<typeof RT.Cell>;
export type TableColumnHeaderCellProps = PropsOf<typeof RT.ColumnHeaderCell>;
export type TableRowHeaderCellProps = PropsOf<typeof RT.RowHeaderCell>;

export const TableRoot = createComponent<TableProps, typeof RT.Root>({
  id: 'Table',
  baseElement: RT.Root,
});

export const TableHeader = createComponent<TableHeaderProps, typeof RT.Header>({
  id: 'TableHeader',
  baseElement: RT.Header,
});

export const TableBody = createComponent<TableBodyProps, typeof RT.Body>({
  id: 'TableBody',
  baseElement: RT.Body,
});

export const TableRow = createComponent<TableRowProps, typeof RT.Row>({
  id: 'TableRow',
  baseElement: RT.Row,
});

export const TableCell = createComponent<TableCellProps, typeof RT.Cell>({
  id: 'TableCell',
  baseElement: RT.Cell,
});

export const TableColumnHeaderCell = createComponent<
  TableColumnHeaderCellProps,
  typeof RT.ColumnHeaderCell
>({
  id: 'TableColumnHeaderCell',
  baseElement: RT.ColumnHeaderCell,
});

export const TableRowHeaderCell = createComponent<
  TableRowHeaderCellProps,
  typeof RT.RowHeaderCell
>({
  id: 'TableRowHeaderCell',
  baseElement: RT.RowHeaderCell,
});

export const Table = withNamespace(TableRoot, {
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  ColumnHeaderCell: TableColumnHeaderCell,
  RowHeaderCell: TableRowHeaderCell,
});

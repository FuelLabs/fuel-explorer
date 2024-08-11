import React, { useState } from 'react';
import DataTable, { TableProps, TableColumn } from 'react-data-table-component';
import ReactPaginate from 'react-paginate';

export interface GridTableProps<T> extends TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  // totalRows: number;
  // rowsPerPage: number;
  pageCount: number;
  onPageChanged: (selectedItem: number) => void;
}

function GridTable<T>({
  columns,
  data,
  // totalRows,
  // rowsPerPage,
  pageCount,
  onPageChanged,
  ...props
}: GridTableProps<T>): React.JSX.Element {
  const [_currentPage, setCurrentPage] = useState(0);

  const Pagination: React.FC = () => {
    return (
      <ReactPaginate
        previousLabel={'Prev'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    );
  };

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
    onPageChanged(data.selected);
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      paginationComponent={Pagination}
      pagination
      dense
      {...props}
    />
  );
}

export default GridTable;

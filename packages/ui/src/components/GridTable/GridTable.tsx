'use client';
import React from 'react';
import DataTable, { TableProps, TableColumn } from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import './gridTable.css';

export interface GridTableProps<T> extends TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  pageCount: number;
  onPageChanged: (selectedItem: number) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}
export type GridTableColumn<T> = TableColumn<T>;

export const GridTable = <T,>({
  columns,
  data,
  pageCount,
  onPageChanged,
  setCurrentPage,
  currentPage,
  ...props
}: GridTableProps<T>): React.JSX.Element => {
  const customStyles = {
    tableWrapper: {
      style: {
        borderRadius: '7px',
      },
    },
    table: {
      style: {
        backgroundColor: 'transparent',
      },
    },
    headRow: {
      style: {
        backgroundColor: 'transparent',
        color: '#9f9f9f',
        fontWeight: '600',
      },
    },
    headCells: {
      style: {
        backgroundColor: 'transparent',
        color: '#9f9f9f',
        fontWeight: '600',
      },
    },
    rows: {
      style: {
        cursor: 'pointer',
        backgroundColor: 'transparent',
        fontWeight: '400',
        '&:hover': {
          backgroundColor: 'var(--gray-2)', // Change background color on hover
        },
      },
    },
    cells: {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
        color: 'var(--gray-table-text)',
        paddingTop: '0.9rem',
        paddingBottom: '0.9rem',
        backgroundColor: 'transparent',
        fontWeight: '400',
      },
    },
    pagination: {
      style: {
        backgroundColor: 'var(--gray-2)',
        color: '#f0f0f0',
      },
      pageButtonsStyle: {
        padding: '8px 16px',
        margin: '0 4px',
        color: '#f0f0f0',
        borderRadius: '4px',
        backgroundColor: 'var(--gray-2)',
        '&.selected': {
          backgroundColor: 'var(--gray-3)',
          fontWeight: 'bold',
        },
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
      },
    },
  };

  const Pagination: React.FC = () => {
    return (
      <ReactPaginate
        previousLabel={<span>&#x2190; Previous</span>} // Left Arrow
        nextLabel={<span>Next &#x2192;</span>} // Right Arrow
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(page) => handlePagination(page)}
        containerClassName={'pagination'}
        activeClassName={'selected'}
        disabledClassName={'disabled'}
        pageLinkClassName={'page-link'}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
      />
    );
  };

  const handlePagination = (page: any) => {
    setCurrentPage(page.selected + 1);
    onPageChanged(page.selected + 1);
  };

  return (
    <div style={customStyles.tableWrapper.style}>
      <DataTable
        customStyles={customStyles}
        columns={columns}
        data={data}
        paginationComponent={Pagination}
        pagination
        dense
        {...props}
      />
    </div>
  );
};

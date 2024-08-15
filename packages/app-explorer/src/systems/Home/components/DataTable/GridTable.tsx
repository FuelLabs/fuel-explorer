import React, { useState } from 'react';
import DataTable, { TableProps, TableColumn } from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import './gridTable.css';

export interface GridTableProps<T> extends TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  pageCount: number;
  onPageChanged: (selectedItem: number) => void;
}

function GridTable<T>({
  columns,
  data,
  pageCount,
  onPageChanged,
  ...props
}: GridTableProps<T>): React.JSX.Element {
  const [_currentPage, setCurrentPage] = useState(0);

  const customStyles = {
    tableWrapper: {
      style: {
        borderRadius: '7px',
        overflow: 'hidden',
      },
    },
    table: {
      style: {
        backgroundColor: 'rgb(32, 32, 32)',
      },
    },
    headRow: {
      style: {
        backgroundColor: 'rgb(32, 32, 32)',
        borderBottom: '1px solid black',
        color: '#9f9f9f',
        fontWeight: '600',
      },
    },
    headCells: {
      style: {
        backgroundColor: 'rgb(32, 32, 32)',
        color: '#9f9f9f',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingTop: '1.2rem',
        paddingBottom: '1.2rem',
        fontWeight: '600',
      },
    },
    rows: {
      style: {
        backgroundColor: 'rgb(32, 32, 32)',
        fontWeight: '400',
      },
    },
    cells: {
      style: {
        paddingLeft: '1rem',
        paddingRight: '1rem',
        color: '#ffffff',
        paddingTop: '1.2rem',
        paddingBottom: '1.2rem',
        backgroundColor: 'rgb(32, 32, 32)',
        borderBottom: '1px solid black',
        fontWeight: '400',
      },
    },
    pagination: {
      style: {
        backgroundColor: 'rgb(32, 32, 32)',
        color: '#f0f0f0',
      },
      pageButtonsStyle: {
        padding: '8px 16px',
        margin: '0 4px',
        color: '#f0f0f0',
        borderRadius: '4px',
        backgroundColor: 'rgb(32, 32, 32)',
        '&.selected': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          fontWeight: 'bold',
        },
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.2)', // Slight hover effect
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
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'selected'}
        disabledClassName={'disabled'} // Handles styling for disabled state
        pageLinkClassName={'page-link'} // Ensures consistent page link styling
      />
    );
  };

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
    onPageChanged(data.selected);
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
}

export default GridTable;

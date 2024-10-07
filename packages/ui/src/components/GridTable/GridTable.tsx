'use client';
import React from 'react';
import DataTable, { TableProps, TableColumn } from 'react-data-table-component';
import ReactPaginate from 'react-paginate';

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
        borderRadius: '0',
        padding: '2px',
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
        textAlign: 'left',
        justifyContent: 'left',
        borderBottom: 'none',
      },
    },
    headCells: {
      style: {
        backgroundColor: 'transparent',
        color: '#9f9f9f',
        fontWeight: '600',
        fontSize: '16px',
        textAlign: 'left',
        justifyContent: 'left',
      },
    },
    rows: {
      style: {
        cursor: 'pointer',
        backgroundColor: 'var(--gray-13)',
        fontWeight: '400',
        borderRadius: '12px',
        border: '1px solid var(--gray-5)',
        margin: '0.7rem 0',
        '&:not(:last-of-type)': {
          borderBottomColor: 'tranparent',
        },
      },
    },
    cells: {
      style: {
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
        color: 'var(--gray-table-text)',
        paddingTop: '0.6rem',
        paddingBottom: '0.6rem',
        backgroundColor: 'transparent',
        fontWeight: '400',
      },
    },
    pagination: {
      style: {
        backgroundColor: 'var(--gray-3)',
        color: 'var(--gray-2)',
      },
      pageButtonsStyle: {
        padding: '8px 16px',
        margin: '0 2px',
        color: 'var(--gray-2)',
        borderRadius: '4px',
        backgroundColor: 'var(--gray-4)',
        '&.selected': {
          backgroundColor: 'var(--gray-4)',
          fontWeight: 'bold',
        },
        '&:hover': {
          backgroundColor: 'var(--gray-4)',
        },
      },
    },
  };

  const Pagination: React.FC = () => {
    return (
      <ReactPaginate
        previousLabel={
          <>
            {currentPage > 1 && (
              <button
                type="button"
                data-accent-color="gray"
                className="rt-reset rt-BaseButton rt-r-size-2 rt-variant-soft rt-Button fuel-Button fuel-Button cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="tabler-icon tabler-icon-arrow-left"
                >
                  <path d="M5 12l14 0" />
                  <path d="M5 12l6 6" />
                  <path d="M5 12l6 -6" />
                </svg>
              </button>
            )}
            <button
              type="button"
              data-accent-color="gray"
              className=" ml-1 rt-reset rt-BaseButton rt-r-size-2 rt-variant-soft rt-Button fuel-Button fuel-Button cursor-pointer"
            >
              Page {currentPage} of {pageCount}
            </button>
          </>
        }
        nextLabel={
          <button
            type="button"
            data-accent-color="gray"
            className="rt-reset rt-BaseButton rt-r-size-2 rt-variant-soft rt-Button fuel-Button fuel-Button cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="tabler-icon tabler-icon-arrow-right"
            >
              <path d="M5 12l14 0" />
              <path d="M13 18l6 -6" />
              <path d="M13 6l6 6" />
            </svg>
          </button>
        }
        breakLabel={''}
        pageCount={pageCount}
        marginPagesDisplayed={0}
        pageRangeDisplayed={0}
        onPageChange={(page) => handlePagination(page)}
        containerClassName={'pagination'}
        activeClassName={'selected'}
        disabledClassName={'disabled'}
        previousLinkClassName={'previous-link'}
        nextLinkClassName={'next-link'}
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
      <style>{`
        .pagination span{
          padding: 8px 16px;
          color: var(--white-2);
          background-color: var(--gray-2);
          font-weight: bold;
          border-radius: 7px;
          cursor: pointer;
          text-decoration: none;
        }

        .pagination .selected,
        .pagination .page-link {
          display: none !important;
        }

        .pagination {
          display: flex;
          justify-content: end;
          align-items: center;
          list-style: none;
          padding: 0;
          margin: 1rem 0;
        }
        .pagination li {
          margin: 0 2px;
        }
        .pagination li a {
          padding: 8px 16px;
          color: var(--white-2);
          background-color: var(--gray-3);
          border-radius: 7px;
          cursor: pointer;
          text-decoration: none;
        }
        .pagination li.selected a {
          background-color: var(--gray-7);
          font-weight: bold;
        }
        .pagination li a:hover {
          background-color: var(--gray-5);
        }
        .pagination li.previous a,
        .pagination li.next a {
          background-color: transparent;
          padding: 0;
        }
        .pagination li.disabled a {
          color: #888;
          cursor: not-allowed;
        }
        .pagination li.disabled a:hover {
          background-color: transparent;
        }
           @media (max-width: 640px) { 
          .rdt_TableHead {
            display: none; 
          }
        }
      `}</style>
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

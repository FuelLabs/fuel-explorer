import type React from 'react';
import DataTable, {
  type TableProps,
  type TableColumn,
} from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import { useBreakpoints } from '../../hooks/useBreakpoints';
import { IconChevronLeft, IconChevronRight } from '../Icons';

export interface GridTableProps<T> extends TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  pageCount: number;
  onPageChanged: (selectedItem: number) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  previousLabel?: string;
  nextLabel?: string;
}
export type GridTableColumn<T> = TableColumn<T>;

export const GridTable = <T,>({
  columns,
  data,
  pageCount,
  onPageChanged,
  setCurrentPage,
  currentPage,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  ...props
}: GridTableProps<T>): React.JSX.Element => {
  const { isMobile } = useBreakpoints();
  const customStyles = {
    tableWrapper: {
      style: {
        borderRadius: '0',
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
        color: 'var(--fuel-element-low-em)',
        fontWeight: '600',
        textAlign: 'left',
      },
    },
    headCells: {
      style: {
        backgroundColor: 'transparent',
        color: 'var(--fuel-element-low-em)',
        fontWeight: '600',
        fontSize: '16px',
        textAlign: 'left',
      },
    },
    rows: {
      style: {
        cursor: 'pointer',
        backgroundColor: 'var(--fuel-card)',
        fontWeight: '400',
        borderRadius: '0',
        marginBottom: '8px',
        '&:hover': {
          backgroundColor: 'var(--fuel-muted)',
        },
      },
    },
    cells: {
      style: {
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
        color: 'var(--fuel-element-mid-em)',
        paddingTop: '0.4rem',
        paddingBottom: '0.4rem',
        backgroundColor: 'transparent',
        fontWeight: '400',
      },
    },
    pagination: {
      style: {
        backgroundColor: 'var(--fuel-card)',
        color: 'var(--fuel-element-high-em)',
      },
      pageButtonsStyle: {
        padding: '8px 16px',
        margin: '0 4px',
        color: 'var(--fuel-element-high-em)',
        borderRadius: '0',
        backgroundColor: 'var(--fuel-card)',
        '&.selected': {
          backgroundColor: 'var(--fuel-muted)',
          fontWeight: 'bold',
        },
        '&:hover': {
          backgroundColor: 'var(--fuel-muted)',
        },
      },
    },
  };

  const Pagination: React.FC = () => {
    return (
      <ReactPaginate
        previousLabel={
          <span className="inline-flex items-center gap-1">
            <IconChevronLeft size={14} />
            {previousLabel}
          </span>
        }
        nextLabel={
          <span className="inline-flex items-center gap-1">
            {nextLabel}
            <IconChevronRight size={14} />
          </span>
        }
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={isMobile ? 1 : 2}
        pageRangeDisplayed={isMobile ? 1 : 5}
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
      <style>{`
        .pagination {
          display: flex;
          justify-content: end;
          align-items: center;
          list-style: none;
          padding: 0;
          margin: 1rem 0;
        }
        .pagination li {
          margin: 0 8px;
        }
        .pagination li a {
          padding: 8px 16px;
          color: var(--fuel-element-high-em);
          background-color: var(--fuel-card);
          border-radius: 0;
          cursor: pointer;
          text-decoration: none;
        }
        .pagination li.selected a {
          background-color: var(--fuel-muted);
          font-weight: bold;
        }
        .pagination li a:hover {
          background-color: var(--fuel-muted);
        }
        .pagination li.previous a,
        .pagination li.next a {
          background-color: transparent;
          padding: 0;
        }
        .pagination li.disabled a {
          color: var(--fuel-element-low-em);
          cursor: not-allowed;
        }
        .pagination li.disabled a:hover {
          background-color: transparent;
        }
      `}</style>
      <DataTable
        customStyles={customStyles as any}
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

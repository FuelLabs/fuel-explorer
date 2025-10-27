import { LoadingBox, LoadingWrapper } from '@fuels/ui';

export function BlocksTableLoader() {
  return (
    <div className="rounded-none">
      <div className="table w-full bg-transparent">
        {/* Header */}
        <div className="table-header-group bg-transparent">
          <div className="table-row">
            <div className="table-cell text-left px-4 py-1 align-middle font-semibold text-[16px] text-gray-11">
              Block
            </div>
            <div className="table-cell text-left px-4 py-1 align-middle font-semibold text-[16px] text-gray-11">
              Blockhash
            </div>
            <div className="table-cell text-left px-4 py-1 align-middle font-semibold text-[16px] text-gray-11">
              Transactions
            </div>
            <div className="table-cell text-left px-4 py-1 align-middle font-semibold text-[16px] text-gray-11">
              Rewards
            </div>
            <div className="table-cell text-left px-4 py-1 align-middle font-semibold text-[16px] text-gray-11">
              Producer
            </div>
            <div className="table-cell text-left px-4 py-1 align-middle font-semibold text-[16px] text-gray-11">
              Efficiency
            </div>
            <div className="table-cell text-left px-4 py-1 align-middle font-semibold text-[16px] text-gray-11">
              Time
            </div>
            <div className="table-cell text-left px-4 py-1 align-middle font-semibold text-[16px] text-gray-11">
              {/* actions */}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="table-row-group">
          <LoadingWrapper
            isLoading={true}
            repeatLoader={8}
            loadingEl={<BlockRowSkeleton />}
          />
        </div>
      </div>

      {/* Pagination */}
      <div className="my-4">
        <div className="flex justify-end items-center list-none p-0">
          <LoadingBox className="h-8 w-20 mr-2" />
          <LoadingBox className="h-8 w-8 mx-1" />
          <LoadingBox className="h-8 w-8 mx-1" />
          <LoadingBox className="h-8 w-8 mx-1" />
          <LoadingBox className="h-8 w-12 mx-1" />
          <LoadingBox className="h-8 w-16 ml-2" />
        </div>
      </div>
    </div>
  );
}

function BlockRowSkeleton() {
  return (
    <div className="table-row cursor-pointer bg-gray-2 font-normal mb-2">
      <div className="table-cell px-2 py-[0.4rem] text-center align-middle text-[var(--gray-table-text)] bg-transparent">
        <LoadingBox className="h-6 w-16 my-5" />
      </div>
      <div className="table-cell px-2 py-[0.4rem] text-center align-middle text-[var(--gray-table-text)] bg-transparent">
        <LoadingBox className="h-6 w-[108px] my-5" />
      </div>
      <div className="table-cell px-2 py-[0.4rem] text-center align-middle text-[var(--gray-table-text)] bg-transparent">
        <LoadingBox className="h-6 w-8 my-5" />
      </div>
      <div className="table-cell px-2 py-[0.4rem] text-center align-middle text-[var(--gray-table-text)] bg-transparent">
        <LoadingBox className="h-6 w-24 my-5" />
      </div>
      <div className="table-cell px-2 py-[0.4rem] text-center align-middle text-[var(--gray-table-text)] bg-transparent">
        <div className="w-[130px]">
          <LoadingBox className="h-6 w-full my-5" />
        </div>
      </div>
      <div className="table-cell px-2 py-[0.4rem] text-center align-middle text-[var(--gray-table-text)] bg-transparent">
        <div className="w-[6.8rem]">
          <LoadingBox className="h-6 w-full my-5" />
        </div>
      </div>
      <div className="table-cell px-2 py-[0.4rem] text-center align-middle text-[var(--gray-table-text)] bg-transparent">
        <div className="w-[6.5rem]">
          <LoadingBox className="h-6 w-full my-5" />
        </div>
      </div>
      <div className="table-cell px-2 py-[0.4rem] text-center align-middle text-[var(--gray-table-text)] bg-transparent">
        <LoadingBox className="h-8 w-16 rounded my-5" />
      </div>
    </div>
  );
}

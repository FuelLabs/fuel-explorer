import type {
  GQLBlockFragment,
  GQLTransactionsByBlockIdQuery,
  Maybe,
} from '@fuel-explorer/graphql';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { BlockScreenAdvanced } from '~/systems/Block/components/BlockScreenAdvanced';
import { BlockScreenSimple } from '~/systems/Block/components/BlockScreenSimple';
import { ApiService } from '../services/api';

function BlockContent({
  block,
  txs,
  mode,
  producer,
}: {
  block: Maybe<GQLBlockFragment>;
  txs: GQLTransactionsByBlockIdQuery['transactionsByBlockId'];
  mode: string;
  producer?: Maybe<string>;
}) {
  switch (mode) {
    case 'simple':
      return <BlockScreenSimple block={block} txs={txs} producer={producer} />;
    case 'advanced':
      return <BlockScreenAdvanced block={block} isLoading={false} />;
    default:
      return <BlockScreenSimple block={block} txs={txs} producer={producer} />;
  }
}

function BlockLoadingContent({ mode, id }: { mode: string; id: string }) {
  switch (mode) {
    case 'simple':
      return <BlockScreenSimple id={id} isLoading={true} />;
    case 'advanced':
      return <BlockScreenAdvanced isLoading={true} />;
    default:
      return <BlockScreenSimple id={id} isLoading={true} />;
  }
}

function BlockNotFound() {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-semibold text-gray-600 mb-2">
        Block Not Found
      </h2>
      <p className="text-gray-500">The requested block could not be found.</p>
    </div>
  );
}

export function BlockPage() {
  const { id, mode = 'simple' } = useParams<{ id: string; mode?: string }>();
  const [searchParams] = useSearchParams();

  // Get pagination params
  const cursor = searchParams.get('cursor');
  const dir = (searchParams.get('dir') as 'after' | 'before') || 'after';

  // Redirect if no block ID
  if (!id) {
    return <Navigate to="/blocks" replace />;
  }

  // Validate mode and redirect if invalid
  const validModes = ['simple', 'advanced'];
  if (mode && !validModes.includes(mode)) {
    return <Navigate to={`/block/${id}/simple`} replace />;
  }

  // Fetch block data
  const {
    data: blockData,
    isLoading: blockLoading,
    error: blockError,
  } = useQuery({
    queryKey: ['block', id],
    queryFn: () => ApiService.fetchBlock(id),
    retry: (failureCount, error: Error) => {
      if (error?.message?.includes('404')) return false;
      return failureCount < 3;
    },
  });

  // Fetch block transactions (only for simple mode)
  const { data: transactionsData, isLoading: transactionsLoading } = useQuery({
    queryKey: ['block-transactions', id, cursor, dir],
    queryFn: () =>
      ApiService.getTransactionsByBlockId(id, {
        cursor: cursor || undefined,
        direction: dir === 'after' ? 'forward' : 'backward',
      }),
    enabled: mode === 'simple' && !!blockData?.block,
  });

  const isLoading = blockLoading || (mode === 'simple' && transactionsLoading);

  // Handle loading state
  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Loading Block - Fuel Explorer</title>
        </Helmet>
        <div className="block-page">
          <BlockLoadingContent mode={mode || 'simple'} id={id} />
        </div>
      </>
    );
  }

  // Handle not found
  if (!blockData?.block || blockError?.message?.includes('404')) {
    return (
      <>
        <Helmet>
          <title>Block Not Found - Fuel Explorer</title>
        </Helmet>
        <BlockNotFound />
      </>
    );
  }

  // Handle other errors
  if (blockError) {
    return (
      <>
        <Helmet>
          <title>Error - Fuel Explorer</title>
        </Helmet>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">Failed to load block details</p>
          <button
            onClick={() => window.location.reload()}
            type="button"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </>
    );
  }

  const block = blockData.block;
  const producer = blockData.producer;
  const txs = transactionsData?.transactionsByBlockId;

  return (
    <>
      <Helmet>
        <title>{`Block ${block.height} - Fuel Explorer`}</title>
        <meta
          name="description"
          content={`View details for block ${block.height} on the Fuel blockchain`}
        />
      </Helmet>

      <div className="block-page">
        <BlockContent
          block={block}
          txs={txs}
          mode={mode || 'simple'}
          producer={producer}
        />
      </div>
    </>
  );
}

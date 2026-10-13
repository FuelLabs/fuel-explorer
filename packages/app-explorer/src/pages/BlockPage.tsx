import type {
  GQLBlockFragment,
  GQLTransactionsByBlockIdQuery,
  Maybe,
} from '@fuel-explorer/graphql';
import { Button } from '@fuels/ui';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { BlockScreenAdvanced } from '~/systems/Block/components/BlockScreenAdvanced';
import { BlockScreenSimple } from '~/systems/Block/components/BlockScreenSimple';
import { PageState } from '~/systems/Core/components/PageState/PageState';
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
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('block.not_found_meta_title')}</title>
      </Helmet>
      <PageState
        title={t('block.not_found_title')}
        description={t('block.not_found_description')}
      />
    </>
  );
}

function BlockError() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('block.error_meta_title')}</title>
      </Helmet>
      <PageState
        title={t('block.error_title')}
        description={t('block.error_description')}
        action={
          <Button onClick={() => window.location.reload()}>
            {t('core.retry')}
          </Button>
        }
      />
    </>
  );
}

export function BlockPage() {
  const { id, mode = 'simple' } = useParams<{ id: string; mode?: string }>();
  const { t } = useTranslation();
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
          <title>{t('block.loading_meta_title')}</title>
        </Helmet>
        <div className="block-page">
          <BlockLoadingContent mode={mode || 'simple'} id={id} />
        </div>
      </>
    );
  }

  // Handle not found
  if (blockError?.message?.includes('404')) {
    return <BlockNotFound />;
  }

  // Handle other errors
  if (blockError) {
    return <BlockError />;
  }

  if (!blockData?.block) {
    return <BlockNotFound />;
  }

  const block = blockData.block;
  const producer = blockData.producer;
  const txs = transactionsData?.transactionsByBlockId;

  return (
    <>
      <Helmet>
        <title>{t('block.meta_title', { height: block.height })}</title>
        <meta
          name="description"
          content={t('block.meta_description', { height: block.height })}
        />
      </Helmet>

      <div className="block-page">
        {/* Keyed so a Simple/Advanced switch fades the new view in. */}
        <div key={mode} className="fuel-appear">
          <BlockContent
            block={block}
            txs={txs}
            mode={mode || 'simple'}
            producer={producer}
          />
        </div>
      </div>
    </>
  );
}

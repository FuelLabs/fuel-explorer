import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { matchPageMeta } from '~/systems/Core/pageMeta';

const PREVIEW_IMAGE = '/preview.png?v=ignition';

export function PageMeta() {
  const { pathname, search } = useLocation();
  const meta = matchPageMeta(pathname);
  const url =
    typeof window === 'undefined'
      ? ''
      : `${window.location.origin}${pathname}${search}`;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Fuel Explorer" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={PREVIEW_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
    </Helmet>
  );
}

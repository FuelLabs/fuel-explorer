import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { matchPageMeta } from '~/systems/Core/pageMeta';

const PREVIEW_IMAGE = '/preview.png?v=ignition';

export function PageMeta() {
  const { pathname, search } = useLocation();
  const { t } = useTranslation();
  const found = matchPageMeta(pathname);
  const meta = found.key
    ? {
        title: t(`meta.${found.key}.title`, {
          ...found.params,
          defaultValue: found.title,
        }),
        description: t(`meta.${found.key}.description`, {
          ...found.params,
          defaultValue: found.description,
        }),
      }
    : found;
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

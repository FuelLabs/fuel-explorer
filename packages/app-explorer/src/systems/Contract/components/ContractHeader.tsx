import { Address } from '@fuels/ui';
import { useTranslation } from 'react-i18next';

import { useContractMetadata } from '~/hooks/useApi';
import { MetadataLogo } from '~/systems/Core/components/MetadataLogo/MetadataLogo';
import { ContractLinks } from './ContractLinks';
import { ContractTabs } from './ContractTabs';

export function ContractHeader({ id }: { id: string }) {
  const { t } = useTranslation();
  const hasValidId = Boolean(id && id.length > 0);
  const { data, isLoading } = useContractMetadata(hasValidId ? id : null);

  const { metadata, project } = data || { metadata: null, project: null };

  if (!hasValidId) {
    return <div className="h-10 pb-6" />;
  }

  return (
    <>
      <header className="flex flex-wrap items-start justify-between gap-x-10 gap-y-4 pb-6">
        <div className="flex min-w-0 items-start gap-4">
          {/* The logo is a square here; MetadataLogo rounds its own image. */}
          <div className="shrink-0 [&_img]:rounded-none [&_svg]:rounded-none [&>*]:rounded-none">
            <MetadataLogo
              type="ContractCall"
              name={!isLoading && metadata?.name}
              image={!isLoading && project?.image}
            />
          </div>
          <div className="flex min-w-0 flex-col gap-2">
            <h1 className="m-0 font-medium text-heading text-[32px] leading-[36px] tracking-[-1.28px]">
              {metadata?.name
                ? t('contract.title_named', { name: metadata.name })
                : t('contract.title')}
            </h1>
            <Address value={id} full={true} />
            {metadata?.description && (
              <p className="m-0 max-w-[720px] text-[14px] leading-[20px] text-[var(--fuel-element-low-em)]">
                {metadata.description}
              </p>
            )}
          </div>
        </div>
        <ContractLinks project={project} links={metadata?.links} />
      </header>
      <ContractTabs contractId={id} />
    </>
  );
}

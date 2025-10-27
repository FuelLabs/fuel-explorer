import { Skeleton, Tooltip } from '@fuels/ui';
import { getProjectImage } from 'app-commons';
import clsx from 'clsx';
import { useState } from 'react';
import { useContractMetadata } from '~/systems/Transaction/hooks/useContractMetadata';

type TxContractIconProps = {
  contractId: string | null | undefined;
  size?: string;
  children: React.ReactNode;
};

export function TxContractIcon({
  contractId,
  children,
  size = '38px',
}: TxContractIconProps) {
  const { data, isLoading: isMetadataLoading } =
    useContractMetadata(contractId);
  const [imageFallback, setImageFallback] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  if (contractId && !imageFallback && data?.project?.image) {
    return (
      <Tooltip
        content={`${data?.project?.name} (${data?.metadata?.name})`}
        open={!data?.project && !data?.metadata ? false : undefined}
        delayDuration={0}
      >
        <div>
          {(isImageLoading || isMetadataLoading) && (
            <Skeleton height={size} width={size} className="rounded-full" />
          )}
          {data?.project?.image && data?.metadata && (
            <img
              src={getProjectImage(data.project.image)}
              alt={data.metadata.name}
              width={size}
              height={size}
              className={clsx('rounded-full overflow-hidden', {
                hidden: isImageLoading,
              })}
              onLoad={() => setIsImageLoading(false)}
              onError={() => {
                setImageFallback(true);
              }}
            />
          )}
        </div>
      </Tooltip>
    );
  }

  return <>{children}</>;
}

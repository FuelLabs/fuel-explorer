import { Skeleton } from '@fuels/ui';
import { getProjectImage } from 'app-commons';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { TxIcon } from '~/systems/Transaction/component/TxIcon/TxIcon';
import type { TxIconType } from '~/systems/Transaction/types';

type MetadataLogoProps = {
  type: TxIconType;
  name?: string;
  image?: string;
  size?: number;
};

export function MetadataLogo({
  type,
  name,
  image,
  size = 38,
}: MetadataLogoProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageFallback, setImageFallback] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    if (imgRef.current?.complete) {
      if (imgRef.current.naturalWidth) {
        setIsImageLoading(false);
        return;
      }

      setImageFallback(true);
    }
  }, []);

  if (image && !imageFallback) {
    return (
      <div>
        {isImageLoading && (
          <Skeleton
            height={`${size}px`}
            width={`${size}px`}
            className="rounded"
          />
        )}
        <img
          ref={imgRef}
          src={getProjectImage(image)}
          alt={name}
          width={size}
          height={size}
          className={clsx('rounded', {
            hidden: isImageLoading,
          })}
          onLoad={() => setIsImageLoading(false)}
          onError={() => {
            setImageFallback(true);
          }}
        />
      </div>
    );
  }

  return <TxIcon type={type} status="Submitted" radius="large" />;
}

import { Skeleton } from '@fuels/ui';
import { IconFileOff } from '@tabler/icons-react';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { shortAddress } from '~portal/systems/Core';

interface NFTImageProps {
  assetId: string;
  image: string | undefined;
}

export const NFTImage = ({ assetId, image }: NFTImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const [fallback, setFallback] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (imgRef.current?.complete) {
      if (imgRef.current.naturalWidth) {
        setLoading(false);
        return;
      }

      setFallback(true);
    }
  }, []);

  if (image && !fallback) {
    return (
      <div className="w-full aspect-square rounded-[12px] overflow-hidden">
        {isLoading && <Skeleton width="100%" height="100%" />}
        <img
          className={clsx('w-full object-cover', {
            isLoading: 'hidden',
          })}
          ref={imgRef}
          src={image}
          alt={shortAddress(assetId)}
          onLoad={() => setLoading(false)}
          onError={() => {
            setFallback(true);
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center rounded-[12px] w-[100%] aspect-square border border-[#7B7B7B]">
      <IconFileOff color="gray" size={36} />
    </div>
  );
};

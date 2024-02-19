import { Image } from '@fuel-ui/react';
import React, { useEffect, useState } from 'react';

type ProjectBannerProps = {
  name?: string;
  banner?: string;
  style?: React.CSSProperties;
};

export const ProjectBanner = ({ name, banner, style }: ProjectBannerProps) => {
  const [imageError, setImageError] = useState(false);
  const defaultImageUrl = '/ecosystem/bannerImages/default.jpeg'; // Corrected path

  useEffect(() => {
    setImageError(false); // Reset error state when banner prop changes
  }, [banner]);

  const imageUrl = banner
    ? `/ecosystem/bannerImages/${banner}.jpeg`
    : defaultImageUrl;

  const handleError = () => {
    setImageError(true); // Set error true when loading the banner fails
  };

  return (
    <div>
      <Image
        src={imageError ? defaultImageUrl : imageUrl}
        alt={name || 'Default Banner'}
        onError={handleError}
        style={style}
      />
    </div>
  );
};

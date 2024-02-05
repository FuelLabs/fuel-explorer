import { ContentLoader } from '@fuel-ui/react';

export const InfoTextLoader = () => {
  return (
    <ContentLoader
      speed={2}
      height="18"
      width="70"
      aria-label="Loading Transaction Info"
    >
      <ContentLoader.Rect width="70" height="18" rx="4" />
    </ContentLoader>
  );
};

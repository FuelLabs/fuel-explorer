import { useBreakpoints } from '@fuels/ui';
import { IconBolt } from '@tabler/icons-react';
import { getProjectImage } from 'app-commons';
import { useState } from 'react';
import { tv } from 'tailwind-variants';

type ProjecImageProps = {
  name: string;
  image?: string;
};

export const ProjectImage = ({ name, image }: ProjecImageProps) => {
  const classes = styles();

  const [imageFallback, setImageFallback] = useState(false);
  const { isMobile } = useBreakpoints();

  return (
    <div>
      {image && !imageFallback ? (
        <img
          src={getProjectImage(image)}
          alt={name}
          width={isMobile ? 40 : 48}
          height={isMobile ? 40 : 48}
          className={classes.projectImage()}
          onError={() => {
            setImageFallback(true);
          }}
        />
      ) : (
        <IconBolt
          color="red"
          aria-label="project-icon"
          height={isMobile ? 40 : 48}
          className={classes.projectIcon()}
        />
      )}
    </div>
  );
};

export const styles = tv({
  slots: {
    projectIcon:
      'pointer-events-none px-3 py-2 [&_svg]:stroke-2 bg-black rounded-lg',
    projectImage:
      'rounded-lg object-cover min-w-[40px] min-h-[40px] laptop:min-w-[48px] laptop:min-h-[48px]',
  },
});

import { IconButton } from '@fuels/ui';
import { IconBolt } from '@tabler/icons-react';
import { useState } from 'react';
import { tv } from 'tailwind-variants';
import { relativeUrl } from '~portal/systems/Core';

type ProjecImageProps = {
  name: string;
  image?: string;
};

export const ProjecImage = ({ name, image }: ProjecImageProps) => {
  const classes = styles();

  const [imageFallback, setImageFallback] = useState(false);

  return (
    <div>
      {image && !imageFallback ? (
        <img
          src={relativeUrl(`/ecosystem/images/${image}.jpeg`)}
          alt={name}
          width={40}
          height={40}
          onError={() => {
            setImageFallback(true);
          }}
        />
      ) : (
        <IconButton
          color="red"
          variant="ghost"
          icon={IconBolt}
          aria-label="project-icon"
          iconSize={20}
          className={classes.projectIcon()}
        />
      )}
    </div>
  );
};

export const styles = tv({
  slots: {
    projectIcon: 'pointer-events-none px-3 py-2 [&_svg]:stroke-2',
  },
});

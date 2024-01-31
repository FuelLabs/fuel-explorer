import { cssObj } from '@fuel-ui/css';
import { IconButton, Image } from '@fuel-ui/react';
import { useState } from 'react';

type ProjecImageProps = {
  name: string;
  image?: string;
};

export const ProjecImage = ({ name, image }: ProjecImageProps) => {
  const [imageFallback, setImageFallback] = useState(false);

  return (
    <div>
      {image && !imageFallback ? (
        <Image
          src={`/ecosystem/images/${image}.jpeg`}
          alt={name}
          width={40}
          height={40}
          onError={() => {
            setImageFallback(true);
          }}
        />
      ) : (
        <IconButton
          intent="error"
          variant="ghost"
          icon="Bolt"
          aria-label="project-icon"
          iconSize={20}
          css={styles.projectIcon}
        />
      )}
    </div>
  );
};

const styles = {
  projectIcon: cssObj({
    pointerEvents: 'none',
    padding: '$3 $2',
    '& svg': {
      strokeWidth: '1.5px',
    },
  }),
};

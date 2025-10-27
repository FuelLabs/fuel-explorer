import { motion } from 'framer-motion';
import { animations } from '~portal/systems/Core';

import type { Project } from '../../types';

import { Card } from '@fuels/ui';

import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

const MotionCard = motion(Card);

export type ProjectItemProps = Pick<
  Project,
  'isFeatured' | 'isLive' | 'isLiveMainnet' | 'url' | 'isFuelSeason'
> & {
  innerJsx: ReactNode;
};

export const ProjectItemWrapper = ({
  url,
  isLive,
  isLiveMainnet,
  isFeatured,
  isFuelSeason,
  innerJsx,
}: ProjectItemProps) => {
  const classes = styles({ isFeatured });

  const onCardPress = () => {
    window.open(url, '_blank');
  };

  return (
    <MotionCard
      {...animations.appearIn({
        transition: { type: 'spring' },
      })}
      className={classes.card()}
      onClick={onCardPress}
      variant={
        isFeatured || isLive || isLiveMainnet || isFuelSeason
          ? 'classic'
          : 'ghost'
      }
    >
      {innerJsx}
    </MotionCard>
  );
};

const styles = tv({
  slots: {
    card: [
      'cursor-pointer gap-2 p-4 laptop:p-5',
      'transition-all duration-200 ease-in-out',
      'outline outline-1 outline-offset-0',
      'outline-gray-5 hover:outline-brand',
      'hover:scale-105 hover:outline-2',
    ],
  },
  variants: {
    isFeatured: {
      true: {
        card: 'outline-yellow-7 hover:outline-yellow-8',
      },
    },
  },
});

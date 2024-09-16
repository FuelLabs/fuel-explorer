import { motion } from 'framer-motion';
import type { FC } from 'react';
import { animations, getUrlHostName } from '~portal/systems/Core';
import { stopPropagation } from '~portal/systems/Core/utils/stopPropagation';

import type { Project } from '../../types';
import { ProjecImage } from '../ProjectImage';

import {
  Badge,
  Button,
  Card,
  HStack,
  Link,
  Text,
  Tooltip,
  VStack,
  cx,
} from '@fuels/ui';
import { IconBrandDiscord, IconBrandX } from '@tabler/icons-react';
import { IconBrandGithub } from '@tabler/icons-react';
import { IconArrowUpRight } from '@tabler/icons-react';
import { tv } from 'tailwind-variants';
import { ProjectItemLoader } from './ProjectItemLoader';

const MotionCard = motion(Card);

export type ProjectItemProps = Project & {
  onClick?: () => void;
};

type ProjectItemComponent = FC<ProjectItemProps> & {
  Loader: typeof ProjectItemLoader;
};

export const ProjectItem: ProjectItemComponent = ({
  name,
  description,
  image,
  url,
  twitter,
  discord,
  status,
  github,
  isLive,
  isFeatured,
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
      variant={isFeatured || isLive ? 'classic' : 'ghost'}
    >
      <Card.Body className={classes.body()}>
        <ProjecImage name={name} image={image} />
        <VStack gap="2" justify="between" className={classes.details()}>
          <VStack align="start" gap="3">
            <HStack align="start" justify="between" className={classes.title()}>
              <Text className={classes.textProjectName()}>{name}</Text>
              <HStack gap="0">
                {twitter && (
                  <Tooltip content={twitter}>
                    <Button
                      as="a"
                      href={twitter}
                      className={classes.socialButton()}
                      onClick={stopPropagation}
                      variant="ghost"
                      size="1"
                      target="_blank"
                    >
                      <IconBrandX size={20} stroke={1} color="gray" />
                    </Button>
                  </Tooltip>
                )}
                {discord && (
                  <Tooltip content={discord}>
                    <Button
                      as="a"
                      href={discord}
                      className={classes.socialButton()}
                      onClick={stopPropagation}
                      variant="ghost"
                      size="1"
                      target="_blank"
                    >
                      <IconBrandDiscord size={20} stroke={1} color="gray" />
                    </Button>
                  </Tooltip>
                )}
                {github && (
                  <Tooltip content={github}>
                    <Button
                      as="a"
                      href={github}
                      className={classes.socialButton()}
                      onClick={stopPropagation}
                      variant="ghost"
                      size="1"
                      target="_blank"
                    >
                      <IconBrandGithub size={20} stroke={1} color="gray" />
                    </Button>
                  </Tooltip>
                )}
                <Tooltip content={url}>
                  <Button
                    className={classes.socialButton()}
                    variant="ghost"
                    size="1"
                  >
                    <IconArrowUpRight size={20} stroke={1} color="gray" />
                  </Button>
                </Tooltip>
              </HStack>
            </HStack>
            <Text className={classes.textDescription()}>{description}</Text>
          </VStack>
          <HStack align="center" justify="between" wrap="wrap">
            <Link
              as="a"
              className={classes.link()}
              href={url}
              color="gray"
              size="3"
              externalIcon={null}
            >
              {getUrlHostName(url)}
            </Link>
          </HStack>
        </VStack>
      </Card.Body>
      <Card.Footer className={classes.footer()}>
        {status?.map((s, index) => (
          <Badge
            key={index}
            color="gray"
            size="1"
            className={cx(classes.tag(), classes.tagStatus())}
            variant="ghost"
          >
            {s}
          </Badge>
        ))}
        {isFeatured ? (
          <Badge
            color="yellow"
            size="1"
            className={classes.tag()}
            variant="surface"
          >
            Featured
          </Badge>
        ) : null}
        {isLive ? (
          <Badge
            color="green"
            size="2"
            className={classes.tag()}
            variant="surface"
          >
            Live
          </Badge>
        ) : (
          <Badge
            color="gray"
            size="1"
            className={cx(classes.tag(), classes.tagStatus())}
            variant="ghost"
          >
            Building
          </Badge>
        )}
      </Card.Footer>
    </MotionCard>
  );
};

const styles = tv({
  slots: {
    card: [
      'cursor-pointer gap-2',
      'transition-all duration-200 ease-in-out',
      'border-none border-brand',
      'hover:border hover:border-solid hover:scale-105',
    ],
    details: 'flex flex-col justify-between flex-1',
    link: 'underline p-0 pointer-events-none text-sm',
    dot: [
      'w-1 h-1 rounded-full border border-solid border-border',
      'bg-green-500 shadow-[0_0_4px_0_#00F58C]',
    ],
    tag: ['rounded-sm py-1 px-2 pointer-events-none'],
    tagStatus: ['text-heading'],
    title: ['w-full'],
    body: 'flex flex-1 flex-row items-start gap-4 justify-start px-6 py-4',
    statusContainer: 'flex flex-wrap justify-end items-end mt-auto',
    textProjectName: 'text-heading',
    textDescription: 'text-sm',
    socialButton: 'bg-transparent',
    footer: 'items-end',
  },
  variants: {
    isFeatured: {
      true: {
        card: 'border border-solid border-yellow-7 hover:border-yellow-8 hover:border-2',
      },
    },
  },
});

ProjectItem.Loader = ProjectItemLoader;

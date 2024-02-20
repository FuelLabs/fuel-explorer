import { motion } from 'framer-motion';
import type { FC } from 'react';
import { animations, getUrlHostName } from '~portal/systems/Core';

import type { Project } from '../../types';
import { ProjecImage } from '../ProjectImage';

import {
  Badge,
  Box,
  Button,
  Card,
  HStack,
  Link,
  Text,
  Tooltip,
  VStack,
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
}: ProjectItemProps) => {
  const classes = styles();

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
    >
      <Card.Body className={classes.body()}>
        <ProjecImage name={name} image={image} />
        <VStack gap="2" justify="between" className={classes.details()}>
          <VStack align="start" gap="1">
            <HStack align="start" justify="between" className={classes.title()}>
              <Text className={classes.textProjectName()}>{name}</Text>
              <HStack>
                {twitter && (
                  <Tooltip content={twitter}>
                    <Button
                      as="a"
                      href={twitter}
                      className={classes.socialButton()}
                      size="2"
                    >
                      <IconBrandX size={20} stroke={1} />
                    </Button>
                  </Tooltip>
                )}
                {discord && (
                  <Tooltip content={discord}>
                    <Button
                      as="a"
                      href={discord}
                      className={classes.socialButton()}
                      size="2"
                    >
                      <IconBrandDiscord size={20} stroke={1} />
                    </Button>
                  </Tooltip>
                )}
                {github && (
                  <Tooltip content={github}>
                    <Button
                      as="a"
                      href={github}
                      className={classes.socialButton()}
                      size="2"
                    >
                      <IconBrandGithub size={20} stroke={1} />
                    </Button>
                  </Tooltip>
                )}
                <Tooltip content={url}>
                  <IconArrowUpRight size={20} stroke={1} />
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
              size="2"
              externalIcon={null}
            >
              {getUrlHostName(url)}
            </Link>
            {isLive ? (
              <Box />
              // This was not migrated to new UI because it's not being used anymore
              // <Tag intent="base" size="xs" className={classes.tag()} variant="ghost">
              //   <Box className={classes.dot()} />
              //   {'Live on testnet'}
              // </Tag>
            ) : null}
          </HStack>
          <HStack
            align="center"
            justify="end"
            wrap="wrap"
            className={classes.statusContainer()}
          >
            {status?.map((s, index) => (
              <Badge
                key={index}
                color="gray"
                size="1"
                className={classes.tag()}
                variant="ghost"
              >
                {s}
              </Badge>
            ))}
          </HStack>
        </VStack>
      </Card.Body>
    </MotionCard>
  );
};

const styles = tv({
  slots: {
    card: [
      'transition-transform duration-200 ease-in-out transition-border',
      ':hover:pointer :hover:border-1 :hover:border-border :hover:transform-scale-102',
    ],
    details: 'flex flex-col justify-between flex-1',
    link: 'underline p-0 pointer-events-none',
    dot: [
      'w-1 h-1 rounded-full border border-solid border-border',
      'bg-green-500 shadow-[0_0_4px_0_#00F58C]',
    ],
    tag: [
      'text-heading rounded-sm py-1 px-2',
      // 'bg-gray-500 mr-2',
    ],
    title: ['w-full'],
    body: 'flex flex-row items-start gap-4 justify-start p-6',
    statusContainer: 'flex flex-wrap justify-end items-end mt-auto',
    textProjectName: 'text-sm text-heading',
    textDescription: 'text-xs',
    socialButton: 'text-heading',
  },
});

ProjectItem.Loader = ProjectItemLoader;

import { IconBrandDiscord, IconBrandX } from '@tabler/icons-react';
import { IconBrandGithub } from '@tabler/icons-react';
import { IconArrowUpRight } from '@tabler/icons-react';
import { tv } from 'tailwind-variants';

import {
  Badge,
  Button,
  CardBody,
  CardFooter,
  HStack,
  Link,
  Text,
  Tooltip,
  VStack,
} from '@fuels/ui';

import { getUrlHostName } from 'app-commons';
import type { Project } from '../../types';
import { ProjectImage } from '../ProjectImage';
import { ProjectItemButton } from './ProjectItemButton';

export const ProjectItemSSRContent = ({
  name,
  description,
  image,
  url,
  twitter,
  discord,
  github,
  isLive,
  isFeatured,
  isLiveMainnet,
  isFuelSeason,
  points,
}: Omit<Project, 'tags'>) => {
  const classes = styles();

  return (
    <>
      <CardBody className={classes.container()}>
        <ProjectImage name={name} image={image} />
        <VStack gap="0" justify="between" className={classes.details()}>
          <VStack align="start" gap="0" className={classes.body()}>
            <HStack
              align="start"
              justify="between"
              className={classes.titleContainer()}
            >
              <HStack className={classes.title()}>
                <Text className={classes.textProjectName()}>{name}</Text>
                {!!isFeatured && (
                  <Badge
                    color="yellow"
                    size="1"
                    className={classes.featuredTag()}
                    variant="surface"
                  >
                    Featured
                  </Badge>
                )}
              </HStack>
              <HStack gap="0">
                {!!twitter && (
                  <Tooltip content={twitter}>
                    <ProjectItemButton href={twitter}>
                      <IconBrandX size={20} stroke={1} color="gray" />
                    </ProjectItemButton>
                  </Tooltip>
                )}
                {!!discord && (
                  <Tooltip content={discord}>
                    <ProjectItemButton href={discord}>
                      <IconBrandDiscord size={20} stroke={1} color="gray" />
                    </ProjectItemButton>
                  </Tooltip>
                )}
                {!!github && (
                  <Tooltip content={github}>
                    <ProjectItemButton href={github}>
                      <IconBrandGithub size={20} stroke={1} color="gray" />
                    </ProjectItemButton>
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
              size="3"
              externalIcon={null}
            >
              {getUrlHostName(url)}
            </Link>
          </HStack>
        </VStack>
      </CardBody>
      <CardFooter className={classes.footer()}>
        {!!isLiveMainnet && (
          <Badge
            color="green"
            size="2"
            className={classes.tag()}
            variant="surface"
          >
            Mainnet
          </Badge>
        )}
        {!!isLive && !isLiveMainnet && (
          <Badge
            color="green"
            size="2"
            className={classes.tag()}
            variant="surface"
          >
            Testnet
          </Badge>
        )}
        {!isLiveMainnet && !isLive && (
          <Badge
            color="gray"
            size="1"
            className={`${classes.tag()} ${classes.tagStatus()}`}
            variant="ghost"
          >
            Building
          </Badge>
        )}
        {!!points && (
          <Badge
            color="blue"
            size="1"
            className={`${classes.tag()} ${classes.tagStatus()}`}
            variant="ghost"
          >
            {points}x Points
          </Badge>
        )}
        {!!isFuelSeason && (
          <Badge
            color="blue"
            size="1"
            className={`${classes.tag()} ${classes.tagStatus()}`}
            variant="ghost"
          >
            Fuel Season I
          </Badge>
        )}
      </CardFooter>
    </>
  );
};

const styles = tv({
  slots: {
    details: 'flex flex-col justify-between flex-1',
    link: 'mt-3 underline p-0 pointer-events-none text-sm text-gray-11',
    dot: [
      'w-1 h-1 rounded-full border border-solid border-border',
      'bg-green-500 shadow-[0_0_4px_0_#00F58C]',
    ],
    tag: ['rounded-sm py-1 px-2 pointer-events-none'],
    featuredTag: ['rounded-sm pointer-events-none'],
    tagStatus: ['text-heading'],
    titleContainer: ['w-full'],
    title: [
      'w-full gap-1.5 laptop:gap-3 flex flex-col laptop:flex-row justify-center items-start laptop:justify-start laptop:items-center',
    ],
    container:
      'flex flex-1 flex-row items-start gap-2 laptop:gap-5 justify-start px-0',
    body: 'gap-1.5',
    statusContainer: 'flex flex-wrap justify-end items-end mt-auto',
    textProjectName: 'text-heading',
    textDescription: 'text-sm text-pretty',
    socialButton: 'bg-transparent laptop:pe-0',
    footer: 'items-end px-0',
  },
});

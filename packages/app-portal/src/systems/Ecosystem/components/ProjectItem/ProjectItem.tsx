import { Box, Button, Card, Text } from '@fuel-ui/react';
import { motion } from 'framer-motion';
import { type FC } from 'react';
import React, { useState } from 'react';
import { animations } from '~/systems/Core';

import type { Project } from '../../types';
import { ProjectDetailPanel } from '../ProjectDetailPanel';
import { ProjectImage } from '../ProjectImage';

import './CSS/animations.css';
import { ProjectItemLoader } from './ProjectItemLoader';
import { styles } from './styles';

const MotionCard = motion(Card);

export type ProjectItemProps = Project & {
  onPress?: () => void;
  onSelect?: (project: Project) => void;
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
  github,
  isLive,
  tags,
  banner,
}: ProjectItemProps) => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const onCardPress = () => {
    setSelectedProject({
      name,
      description,
      image,
      url,
      twitter,
      discord,
      github,
      isLive,
      tags,
      banner,
    });
    setIsPanelVisible(true);
  };

  const handleClosePanel = () => {
    setIsPanelVisible(false);
    setSelectedProject(null); // Reset the selected project when closing the panel
  };

  const renderPanel = () => {
    if (selectedProject && isPanelVisible) {
      return (
        <Box
          css={isPanelVisible ? styles.panelVisible : styles.panelHidden}
          onAnimationEnd={() => {
            if (!isPanelVisible) setSelectedProject(null);
          }}
        >
          <ProjectDetailPanel
            project={selectedProject}
            onClose={handleClosePanel}
          />
        </Box>
      );
    }
    return null;
  };

  return (
    <>
      <MotionCard
        withDividers
        {...animations.appearIn({
          transition: { type: 'spring' },
        })}
        onClick={onCardPress}
        variant="outlined"
        css={styles.card}
      >
        <Card.Body css={styles.body}>
          <Box css={styles.image}>
            <ProjectImage name={name} image={image} />
          </Box>
          <Box.Stack gap="$2" justify="space-between" css={styles.details}>
            <Box.Stack align="flex-start" gap="$1">
              <Box.Flex
                align="flex-start"
                justify="space-between"
                css={styles.title}
              >
                <Text fontSize="base" color="intentsBase12">
                  {name}
                </Text>
              </Box.Flex>
              <Text fontSize="sm"> {description}</Text>
            </Box.Stack>
          </Box.Stack>
        </Card.Body>
        <Card.Footer css={styles.cardFooter} gap="$3" direction="row-reverse">
          {isLive ? (
            <Button intent="base" size="xs" variant="outlined">
              <Box css={styles.dot} />
              {'Testnet'}
            </Button>
          ) : (
            <Button intent="base" size="xs" variant="outlined">
              <Box css={styles.dotBuilding} />
              {'Building'}
            </Button>
          )}
          <Box style={styles.boxBottom}>
            {twitter && (
              // biome-ignore lint/style/useSelfClosingElements: <explanation>
              <Button
                as="a"
                href={twitter}
                target="_blank"
                rel="noopener noreferrer"
                size="xs"
                intent="base"
                variant="ghost"
                leftIcon={'BrandX'}
              ></Button>
            )}
            {github && (
              <Button
                as="a"
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                size="xs"
                intent="base"
                leftIcon={'BrandGithub'}
                variant="ghost"
              />
            )}
            {discord && (
              <Button
                as="a"
                href={discord}
                target="_blank"
                rel="noopener noreferrer"
                size="xs"
                intent="base"
                leftIcon={'BrandDiscord'}
                variant="ghost"
              />
            )}
            <Button
              as="a"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              size="xs"
              variant="outlined"
              intent="base"
              leftIcon={'ExternalLink'}
            />
          </Box>
        </Card.Footer>
      </MotionCard>
      {renderPanel()}
    </>
  );
};

ProjectItem.Loader = ProjectItemLoader;

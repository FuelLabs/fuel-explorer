import { Alert, Badge, Box, Button, Tag, TagCloseButton } from '@fuel-ui/react';
import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import type { Project } from '../../types';
import { ProjectBanner } from '../ProjectBanner';
import { ProjectImage } from '../ProjectImage';

import { styles } from './styles';

type ProjectDetailPanelProps = {
  project: Project;
  onClose: () => void;
};

const ProjectDetailPanel: FC<ProjectDetailPanelProps> = ({
  project,
  onClose,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isPanelVisible, setPanelVisible] = useState(true);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 750);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setPanelVisible(false);
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 750);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {isPanelVisible && (
        <Box ref={panelRef} css={styles.panelStyle} data-mobile={isMobileView}>
          <Box style={styles.bannerContainer}>
            <Box>
              <ProjectBanner
                name={project.name}
                banner={project.banner}
                style={styles.banner}
              />
              <Box css={styles.closeButton}>
                <TagCloseButton onPress={onClose} />
              </Box>
            </Box>
            <Box css={styles.imageContainer}>
              <Box css={styles.image}>
                <ProjectImage name={project.name} image={project.image} />
              </Box>
            </Box>
          </Box>
          <h1 style={styles.h1}>{project.name}</h1>
          {project.isLive ? (
            <Tag intent="base" size="xs" variant="outlined" css={styles.button}>
              <Box css={styles.dotLive} />
              Live on Testnet
            </Tag>
          ) : (
            <Tag intent="base" size="xs" variant="outlined" css={styles.button}>
              <Box css={styles.dotBuilding} />
              {'Building'}
            </Tag>
          )}
          {project.url && (
            <Button
              as="a"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="xs"
              leftIcon="ExternalLink"
              color="intentsBase8"
              intent="base"
              css={styles.websiteButton}
            >
              Visit Website
            </Button>
          )}

          <Box style={styles.tagBox}>
            {project.tags?.map((tag, index) => (
              <Badge key={index} variant="outlined" style={styles.badge}>
                {tag}
              </Badge>
            ))}
          </Box>
          <Box css={styles.divider} />

          <p style={styles.paragraph}>{project.description}</p>
          <Box css={styles.divider} />
          <h2 style={styles.h2}>Socials</h2>
          <Box css={styles.socials}>
            {project.twitter && (
              <Button
                as="a"
                href={project.twitter}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                intent="error"
                variant="ghost"
                leftIcon={'BrandX'}
              >
                Twitter
              </Button>
            )}
            {project.github && (
              <Button
                as="a"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                leftIcon={'BrandGithub'}
                variant="ghost"
              >
                GitHub
              </Button>
            )}
            {project.discord && (
              <Button
                as="a"
                href={project.discord}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                intent="info"
                leftIcon={'BrandDiscord'}
                variant="ghost"
              >
                Discord
              </Button>
            )}
          </Box>
          <Box css={styles.alert}>
            <Alert status="info">
              <Alert.Description style={{ fontSize: '13px' }}>
                This content is provided by the app developers. Links and
                content are not verified nor endorsed by Fuel. If you have any
                questions, please contact the project directly.
              </Alert.Description>
            </Alert>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ProjectDetailPanel;

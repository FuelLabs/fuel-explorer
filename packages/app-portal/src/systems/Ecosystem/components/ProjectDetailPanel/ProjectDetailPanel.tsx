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
  const [longDescription, setLongDescription] = useState('');

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

  const parseTxtContent = (txtContent: string): string => {
    // Escape HTML tags to prevent XSS attacks
    let escapedContent = txtContent.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Convert **text** to <strong>text</strong> for bold
    escapedContent = escapedContent.replace(
      /\*\*(.*?)\*\*/g,
      '<strong>$1</strong>',
    );

    // Convert headers (lines starting with '# ')
    escapedContent = escapedContent.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    escapedContent = escapedContent.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    escapedContent = escapedContent.replace(/^## (.*$)/gim, '<h2>$1</h2>');

    // Convert bullet lists (lines starting with '* ')
    escapedContent = escapedContent.replace(/(\n- (.*))+/g, (match) => {
      const bullets = match
        .trim()
        .split('\n')
        .map((item) => `<li>${item.substring(2)}</li>`)
        .join('');
      return `<ul>${bullets}</ul>`;
    });
    escapedContent = escapedContent.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2">$1</a>',
    );

    // Replace line breaks with <br> for proper display
    escapedContent = escapedContent
      .replace(/\n\n/g, '<p></p>')
      .replace(/\n/g, '<br>');

    // Handle bullet lists
    escapedContent = escapedContent.replace(
      /(?:<br \/>)*- (.+?)(?=<br \/>|$)/g,
      (match, item) => {
        return `<ul><li>${item}</li></ul>`;
      },
    );

    // Combine consecutive <li> elements into a single <ul>
    escapedContent = escapedContent.replace(/<\/ul><ul>/g, '');

    return escapedContent;
  };

  useEffect(() => {
    const fetchDescription = async () => {
      const filePath = `/public/Ecosystem/projectDescriptions/${project.image}.txt`;
      try {
        const response = await fetch(filePath);
        if (response.ok) {
          let text = await response.text();
          text = parseTxtContent(text); // Use the parser here
          setLongDescription(text);
        } else {
          throw new Error('Text file not found, using short description');
        }
      } catch (error) {
        console.error(error);
        setLongDescription(parseTxtContent(project.description)); // Fallback and parse short description
      }
    };
    if (project.name) {
      fetchDescription();
    }
  }, [project.name, project.description]);

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
          <Box css={styles.contentWrapper}>
            <Box
              style={styles.paragraph}
              // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
              dangerouslySetInnerHTML={{ __html: longDescription }}
            />
          </Box>
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

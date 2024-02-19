import { Box, Button, Card, Tag, Text } from '@fuel-ui/react';
import React from 'react';

import type { Project } from '../../types';
import { ProjectImage } from '../ProjectImage';

import { styles } from './styles';

interface CardComponentProps {
  project: Project;
  onSelect: (project: Project) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  applyFadeEffect?: boolean;
  isFadingIn?: boolean;
}

const CardComponent: React.FC<CardComponentProps> = ({
  project,
  onSelect,
  onMouseEnter,
  onMouseLeave,
  applyFadeEffect,
  isFadingIn,
}) => {
  if (!project) return null;
  const cardStyle = applyFadeEffect
    ? isFadingIn
      ? styles.fadeIn
      : styles.fadeOut
    : {};

  return (
    <Box
      onClick={() => onSelect(project)}
      css={cardStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {' '}
      <Card
        variant="outlined"
        css={styles.card}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Card.Header
          css={{
            backgroundImage: `url(${
              project.banner
                ? `/ecosystem/bannerImages/${project.banner}.jpeg`
                : '/ecosystem/bannerImages/default.jpeg'
            })`,
            backgroundSize: 'cover',
            height: 'fit-content',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            position: 'relative',
            overflow: 'hidden',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <Box css={styles.projectImageWrapper}>
            <Box css={styles.image}>
              <ProjectImage name={project.name} image={project.image} />
            </Box>
          </Box>
        </Card.Header>
        <Card.Body css={styles.cardBody}>
          <Text fontSize="base" color="intentsBase12" css={styles.header}>
            {project.name}
          </Text>
          <Box css={styles.statusContainer}>
            {project.tags?.map((tag, index) => (
              <Tag
                key={index}
                variant="ghost"
                intent="base"
                size="xs"
                style={{
                  fontSize: '$xs',
                  fontWeight: '500',
                }}
                css={styles.tag}
              >
                {tag}
              </Tag>
            ))}
          </Box>
          <Box css={styles.cardContent}>
            <Text>{project.description}</Text>
          </Box>
        </Card.Body>
        <Card.Footer css={styles.cardFooter} gap="$3" direction="row-reverse">
          {project.isLive ? (
            <Button
              intent="base"
              size="sm"
              variant="outlined"
              css={styles.button}
            >
              <Box css={styles.dotLive} />
              Live on Testnet
            </Button>
          ) : (
            <Button
              intent="base"
              size="sm"
              variant="outlined"
              css={styles.button}
            >
              <Box css={styles.dotBuilding} />
              {'Building'}
            </Button>
          )}
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '5px',
              marginLeft: 'auto',
            }}
          >
            {project.twitter && (
              <Button
                href={project.twitter}
                as="a"
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                intent="base"
                variant="ghost"
                leftIcon={'BrandX'}
                // css={styles.button}
              />
            )}
            {project.github && (
              <Button
                href={project.github}
                as="a"
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                intent="base"
                leftIcon={'BrandGithub'}
                variant="ghost"
                //css={styles.button}
              />
            )}
            {project.discord && (
              <Button
                href={project.discord}
                as="a"
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                intent="base"
                leftIcon={'BrandDiscord'}
                variant="ghost"
                //css={styles.button}
              />
            )}
            <Button
              href={project.url}
              as="a"
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              variant="outlined"
              intent="base"
              leftIcon={'ExternalLink'}
              //css={styles.button}
            />
          </Box>
        </Card.Footer>
      </Card>
    </Box>
  );
};

export default CardComponent;

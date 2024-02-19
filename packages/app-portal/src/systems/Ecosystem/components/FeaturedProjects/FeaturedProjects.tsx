import { Box, IconButton } from '@fuel-ui/react';
import React, { useState, useEffect } from 'react';

import type { Project } from '../../types';
import { ProjectDetailPanel } from '../ProjectDetailPanel';

import './CSS/animations.css';
import CardComponent from './CardComponent';
import { styles } from './styles';

const FeaturedProjects = ({ projects }: { projects: Project[] }) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isFadingIn, setIsFadingIn] = useState(true);
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setIsPanelVisible(true); // Show panel immediately
  };

  const handleClosePanel = () => {
    setIsPanelVisible(false); // Hide panel
  };
  const isSingleProject = projects.length === 1;
  const isTwoProjects = projects.length === 2;

  const gridContainerStyle = isSingleProject
    ? styles.gridContainerSingle
    : styles.gridContainer;

  const nextProject = () => {
    setIsFadingIn(false); // Start fade out
    setTimeout(() => {
      setCurrentProjectIndex((currentProjectIndex + 1) % projects.length);
      setIsFadingIn(true); // Start fade in
    }, 300);
  };

  const prevProject = () => {
    setIsFadingIn(false);
    setTimeout(() => {
      setCurrentProjectIndex(
        (currentProjectIndex - 1 + projects.length) % projects.length,
      );
      setIsFadingIn(true);
    }, 300);
  };

  const onMouseEnterHandler = () => {
    setIsPaused(true);
  };

  const onMouseLeaveHandler = () => {
    setIsPaused(false);
  };

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(nextProject, 7500);
      return () => clearInterval(interval);
    }
  }, [currentProjectIndex, isPaused]);

  useEffect(() => {
    const handleResize = () => {};
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDotClick = (index: number) => {
    setIsFadingIn(false);
    setTimeout(() => {
      setCurrentProjectIndex(index);
      setIsFadingIn(true);
    }, 300);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleProjectChange = () => {
    setIsFadingIn(false);
    setTimeout(() => {
      setCurrentProjectIndex((currentProjectIndex + 1) % projects.length);
      setIsFadingIn(true);
    }, 300);
  };

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(handleProjectChange, 7500);
      return () => clearInterval(interval);
    }
  }, [currentProjectIndex, isPaused]);

  const renderPanel = () => {
    if (selectedProject) {
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
      <Box
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        <Box css={gridContainerStyle}>
          {isTwoProjects && windowWidth > 740 ? (
            <>
              {/* Render both projects without fading */}
              <CardComponent
                project={projects[0]}
                onSelect={handleProjectSelect}
                onMouseEnter={onMouseEnterHandler}
                onMouseLeave={onMouseLeaveHandler}
              />
              <CardComponent
                project={projects[1]}
                onSelect={handleProjectSelect}
                onMouseEnter={onMouseEnterHandler}
                onMouseLeave={onMouseLeaveHandler}
              />
            </>
          ) : (
            <>
              {/* Render with fading effect */}
              <CardComponent
                project={projects[currentProjectIndex]}
                onSelect={handleProjectSelect}
                onMouseEnter={onMouseEnterHandler}
                onMouseLeave={onMouseLeaveHandler}
                applyFadeEffect={!isSingleProject}
                isFadingIn={isFadingIn}
              />
              {!isSingleProject && windowWidth > 740 && (
                <CardComponent
                  project={
                    projects[(currentProjectIndex + 1) % projects.length]
                  }
                  onSelect={handleProjectSelect}
                  onMouseEnter={onMouseEnterHandler}
                  onMouseLeave={onMouseLeaveHandler}
                  applyFadeEffect={!isSingleProject}
                  isFadingIn={isFadingIn}
                />
              )}
            </>
          )}
        </Box>
      </Box>
      {!isSingleProject && !isTwoProjects && (
        <Box css={styles.dotsContainer}>
          <IconButton
            variant="link"
            intent="base"
            onClick={prevProject}
            aria-label="Previous Project"
            icon={'ArrowLeft'}
            css={styles.arrowButton}
          />
          {projects.map((_, index) => (
            <Box
              key={index}
              css={
                index === currentProjectIndex ? styles.activeDot : styles.dot
              }
              onClick={() => handleDotClick(index)}
            />
          ))}
          <IconButton
            variant="link"
            intent="base"
            onClick={nextProject}
            aria-label="Next Project"
            icon={'ArrowRight'}
            css={styles.arrowButton}
          />
        </Box>
      )}
      {isTwoProjects && windowWidth <= 740 && (
        <Box css={styles.dotsContainer}>
          <IconButton
            variant="link"
            intent="base"
            onClick={prevProject}
            aria-label="Previous Project"
            icon={'ArrowLeft'}
            css={styles.arrowButton}
          />
          {projects.map((_, index) => (
            <Box
              key={index}
              css={
                index === currentProjectIndex ? styles.activeDot : styles.dot
              }
              onClick={() => handleDotClick(index)}
            />
          ))}
          <IconButton
            variant="link"
            intent="base"
            onClick={nextProject}
            aria-label="Next Project"
            icon={'ArrowRight'}
            css={styles.arrowButton}
          />
        </Box>
      )}
      {renderPanel()}
    </>
  );
};

export default FeaturedProjects;

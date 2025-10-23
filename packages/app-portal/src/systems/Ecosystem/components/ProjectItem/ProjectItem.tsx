import type { Project } from '../../types';

import { memo } from 'react';
import { ProjectItemSSRContent } from './ProjectItemSSRContent';
import { ProjectItemWrapper } from './ProjectItemWrapper';

export type ProjectItemProps = Omit<Project, 'tags'> & {
  onClick?: () => void;
};

const _ProjectItem = ({
  name,
  description,
  image,
  url,
  twitter,
  discord,
  github,
  isLive,
  isFeatured,
  points,
  isLiveMainnet,
  isFuelSeason,
}: ProjectItemProps) => {
  // Prerender all the possible SSR content and pass it as a prop to the client component
  const ssrContent = (
    <ProjectItemSSRContent
      name={name}
      description={description}
      image={image}
      url={url}
      twitter={twitter}
      discord={discord}
      github={github}
      isLive={isLive}
      isFeatured={isFeatured}
      points={points}
      isLiveMainnet={isLiveMainnet}
      isFuelSeason={isFuelSeason}
    />
  );

  return (
    <ProjectItemWrapper
      url={url}
      isLive={isLive}
      isLiveMainnet={isLiveMainnet}
      isFuelSeason={isFuelSeason}
      isFeatured={isFeatured}
      innerJsx={ssrContent}
    />
  );
};

export const ProjectItem = memo(_ProjectItem);

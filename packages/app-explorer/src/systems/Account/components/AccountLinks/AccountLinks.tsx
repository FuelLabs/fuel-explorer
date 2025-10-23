import { Button, Dropdown } from '@fuels/ui';
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandX,
  IconChevronDown,
  IconExternalLink,
} from '@tabler/icons-react';
import { getUrlHostName } from 'app-commons';
import { MetadataLogo } from '~/systems/Core/components/MetadataLogo/MetadataLogo';
import type {
  PredicateMetadata,
  Project,
} from '~portal/systems/Ecosystem/types';

type AccountLinksProps = {
  project: Project;
  metadata: PredicateMetadata;
};

export function AccountLinks({ project, metadata }: AccountLinksProps) {
  const hasLinks = metadata.links.length > 0;
  const hasAnySocial = project?.twitter || project?.github || project?.discord;

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button
          radius="full"
          variant="ghost"
          color="gray"
          size="1"
          rightIcon={IconChevronDown}
        >
          <MetadataLogo
            type="Predicate"
            image={metadata.image}
            name={metadata.name}
            size={16}
          />
          Created with {metadata.name}
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item className="gap-1 cursor-pointer" color="gray" asChild>
          <a href={project.url} target="_blank" rel="noreferrer">
            <IconExternalLink size="1em" /> {getUrlHostName(project.url)}
          </a>
        </Dropdown.Item>
        {hasLinks && <Dropdown.Separator />}
        {metadata.links.map((link) => (
          <Dropdown.Item
            className="gap-1 cursor-pointer"
            key={link.url}
            color="gray"
            asChild
          >
            <a href={link.url} target="_blank" rel="noreferrer">
              <IconExternalLink size="1em" /> {link.title}
            </a>
          </Dropdown.Item>
        ))}
        {hasAnySocial && <Dropdown.Separator />}
        {project.twitter && (
          <Dropdown.Item className="gap-1 cursor-pointer" color="gray" asChild>
            <a href={project.twitter} target="_blank" rel="noreferrer">
              <IconBrandX size="1em" /> X (Twitter)
            </a>
          </Dropdown.Item>
        )}
        {project.github && (
          <Dropdown.Item className="gap-1 cursor-pointer" color="gray" asChild>
            <a href={project.github} target="_blank" rel="noreferrer">
              <IconBrandGithub size="1em" /> Github
            </a>
          </Dropdown.Item>
        )}
        {project.discord && (
          <Dropdown.Item className="gap-1 cursor-pointer" color="gray" asChild>
            <a href={project.discord} target="_blank" rel="noreferrer">
              <IconBrandDiscord size="1em" /> Discord
            </a>
          </Dropdown.Item>
        )}
      </Dropdown.Content>
    </Dropdown>
  );
}

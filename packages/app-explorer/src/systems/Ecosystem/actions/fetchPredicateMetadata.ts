import { ECOSYSTEM_PROJECTS_URL, ETH_CHAIN_NAME } from 'app-commons';
import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import type { Project } from '~portal/systems/Ecosystem/types';

const schema = z.object({
  bytecode: z.string().nullable(),
});

export const fetchPredicateMetadata = act(schema, async (input) => {
  const { bytecode } = input;

  if (!ECOSYSTEM_PROJECTS_URL || !bytecode) {
    return { project: null, metadata: null };
  }

  const projects = (await (
    await fetch(ECOSYSTEM_PROJECTS_URL)
  ).json()) as Array<Project>;

  for (const project of projects) {
    const predicatesByNetwork = project.predicates?.[ETH_CHAIN_NAME];

    if (predicatesByNetwork) {
      const metadata = predicatesByNetwork.find((predicate) => {
        const blobId = predicate.blob_id.replace(/^0x/, '');
        return !!blobId && bytecode.includes(blobId);
      });
      if (metadata) {
        return { project, metadata };
      }
    }
  }

  return { project: null, metadata: null };
});

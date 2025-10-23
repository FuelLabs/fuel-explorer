'use server';

import { ECOSYSTEM_PROJECTS_URL, ETH_CHAIN_NAME } from 'app-commons';
import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import type { Project } from '~portal/systems/Ecosystem/types';

const schema = z.object({
  id: z.string().nullable(),
});

export const fetchContractMetadata = act(schema, async (input) => {
  const { id } = input;

  if (!ECOSYSTEM_PROJECTS_URL || !id) {
    return { project: null, metadata: null };
  }

  const projects = (await (
    await fetch(ECOSYSTEM_PROJECTS_URL, {})
  ).json()) as Array<Project>;

  for (const project of projects) {
    const contractsByNetwork = project.contracts?.[ETH_CHAIN_NAME];

    if (contractsByNetwork) {
      const metadata = contractsByNetwork.find(
        (c) => c.id.toLowerCase() === id.toLowerCase(),
      );
      if (metadata) {
        return { project, metadata };
      }
    }
  }

  return { project: null, metadata: null };
});

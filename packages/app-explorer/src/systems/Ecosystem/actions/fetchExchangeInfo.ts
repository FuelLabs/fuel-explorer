'use server';

import { ECOSYSTEM_PROJECTS_URL } from 'app-commons';
import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import type { ExchangeProject, Project } from '~portal/systems/Ecosystem/types';

const schema = z.object({
  address: z.string().min(1, 'Address is required'),
});

const exchangeSchema = z.object({
  showAccountTag: z.literal(true),
  isExternalExchange: z.literal(true).optional(),
  address: z.string(),
  name: z.string(),
  image: z.string().optional(),
  url: z.string().url('Invalid URL format'),
  twitter: z.string().url('Invalid Twitter URL format').optional(),
  discord: z.string().url('Invalid Discord URL format').optional(),
});

export const fetchExchangeInfo = act(schema, async (input) => {
  const { address } = input;

  if (!ECOSYSTEM_PROJECTS_URL) {
    throw new Error('ECOSYSTEM_PROJECTS_URL is not set');
  }

  const projects = (await (
    await fetch(ECOSYSTEM_PROJECTS_URL)
  ).json()) as Array<Project>;

  const exchangeProject = projects.find(
    (p): p is ExchangeProject =>
      p.showAccountTag === true &&
      p.address?.toLowerCase() === address.toLowerCase(),
  );

  if (exchangeProject) {
    try {
      // Validate the exchange data matches our schema
      exchangeSchema.parse(exchangeProject);
      return {
        isExchange: true,
        exchangeInfo: exchangeProject,
      };
    } catch (error) {
      console.error('Invalid exchange data:', error);
      return {
        isExchange: false,
        exchangeInfo: null,
      };
    }
  }

  return {
    isExchange: false,
    exchangeInfo: null,
  };
});

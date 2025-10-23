import { z } from 'zod';
import { ApiService } from '../../../services/api';

const schema = z.object({
  query: z.string(),
});

export const search = async ({ query }: { query: string }) => {
  try {
    // Validate input using the same schema as Next.js
    const result = schema.safeParse({ query });
    if (!result.success) {
      throw new Error('Invalid search input');
    }

    return await ApiService.search(query);
  } catch (error) {
    console.error('Error searching:', error);
    return null;
  }
};

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { logger } from '~/core/Logger';

async function updateSchema(): Promise<void> {
  try {
    const filename = path.join('./src/graphql/schemas/fuelcore.graphql');
    logger.info(`Fixing schema file ${filename}`);
    const data = await fs.readFile(filename, 'utf8');
    const updatedContent = data.replace(
      /witnessIndex: Int!/g,
      'witnessIndex: U16!',
    );
    await fs.writeFile(filename, updatedContent, 'utf8');
    logger.debug('File has been updated successfully.');
  } catch (error) {
    logger.error('Update schema error:', error);
  }
}

updateSchema();

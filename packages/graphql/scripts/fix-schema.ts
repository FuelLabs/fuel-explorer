import { promises as fs } from 'node:fs';
import path from 'node:path';

async function updateSchema(): Promise<void> {
  try {
    console.log(process.argv[1]);
    const filename = path.join('./src/graphql/schemas/fuelcore.graphql');
    console.log(`Fixing schema file ${filename}`);
    const data = await fs.readFile(filename, 'utf8');
    const updatedContent = data.replace(
      /witnessIndex: Int!/g,
      'witnessIndex: U16!',
    );
    await fs.writeFile(filename, updatedContent, 'utf8');
    console.log('File has been updated successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
}

updateSchema();

import NewAddBlockRange from './application/uc/NewAddBlockRange';

async function main() {
  const from = parseInt(process.argv[2]);
  const to = parseInt(process.argv[3]) || from;
  const addBlockRange = new NewAddBlockRange();
  const input = {
    from,
    to,
  };
  await addBlockRange.execute(input);
}

main();

import { Program } from './infra/server/Program';

(async () => {
  const program = new Program();
  program.create();
})();

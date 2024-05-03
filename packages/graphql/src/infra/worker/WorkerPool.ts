import { Piscina } from 'piscina';
import { workerFilepath } from './Worker';

export const pool = new Piscina({
  filename: workerFilepath,
});

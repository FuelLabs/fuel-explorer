import { runDevelopment, runServer } from './server';

const { WATCH } = process.env;

if (WATCH === 'true') {
  runDevelopment();
} else {
  runServer();
}

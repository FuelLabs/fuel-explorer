import dotenv from 'dotenv';
dotenv.config();

import app from './';

const { PORT } = process.env;
const port = PORT || 4444;

// Start the server:
app.listen(port, () =>
  console.log(`🚀 Explorer api running at http://localhost:${port}/graphql`),
);

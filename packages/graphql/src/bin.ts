import dotenv from 'dotenv';
dotenv.config();

import app from './';

// Start the server:
app.listen(4444, () =>
  console.log('🚀 Explorer api running at http://localhost:4444/graphql'),
);

import { config } from 'dotenv';

config();

import app from './server';

// Start the server:
app.listen(4444);

import { createSchema } from '@fuel-explorer/graphql';
import { createYoga } from 'graphql-yoga';

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

const url = process.env.FUEL_PROVIDER_URL!;
const schema = createSchema(url);

export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
  context: () => ({ url }),
});

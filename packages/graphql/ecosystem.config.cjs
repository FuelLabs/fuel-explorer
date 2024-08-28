module.exports = {
  apps: [
    {
      name: 'graphql',
      script: './dist/app.js',
      mode: 'cluster',
      instances: '8',
    },
    {
      name: 'consumer',
      script: './dist/consumer.js',
      mode: 'cluster',
      instances: '6',
    },
    {
      name: 'syncer',
      script: './dist/syncer.js',
      mode: 'cluster',
      instances: '1',
    },
  ],
};

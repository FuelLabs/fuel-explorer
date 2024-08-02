module.exports = {
  apps: [
    {
      name: 'graphql',
      script: './dist/app.js',
      mode: 'cluster',
      instances: '-1',
    },
    {
      name: 'syncer',
      script: './dist/consumer.js',
      mode: 'cluster',
      instances: '4',
    },
    {
      name: 'syncer',
      script: './dist/syncer.js',
      mode: 'cluster',
      instances: '1',
    },
  ],
};

module.exports = {
  apps: [
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
    {
      name: 'assets',
      script: './dist/assets.js',
      mode: 'cluster',
      instances: '1',
    },
    {
      name: 'balance',
      script: './dist/balance.js',
      mode: 'cluster',
      instances: '1',
    },
    {
      name: 'l1',
      script: './dist/l1.js',
      mode: 'cluster',
      instances: '1',
    },
    {
      name: 'cosmos',
      script: './dist/cosmos.js',
      mode: 'cluster',
      instances: '1',
    },
    {
      name: 'jobs',
      script: './dist/jobs.js',
      mode: 'cluster',
      instances: '1',
    },
  ],
};

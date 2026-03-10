module.exports = {
  apps: [
    {
      name: 'graphql',
      script: './dist/app.js',
      mode: 'cluster',
      instances: '8',
    },
    {
      name: 'syncer',
      script: './dist/syncer.js',
      mode: 'cluster',
      instances: '1',
    },
    {
      name: 'timer',
      script: './dist/timer.js',
      mode: 'cluster',
      instances: '1',
    },
  ],
};

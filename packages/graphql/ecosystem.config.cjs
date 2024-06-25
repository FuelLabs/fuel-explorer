module.exports = {
  apps: [
    {
      name: 'graphql',
      script: './dist/app.js',
      instances: 'max',
      exec_mode: 'cluster',
    },
    {
      name: 'syncer',
      script: './dist/syncer.js',
      instances: 'max',
      exec_mode: 'cluster',
    },
  ],
};

module.exports = {
  apps: [
    {
      name: 'graphql',
      script: './dist/app.js',
      instances: '1',
      exec_mode: 'cluster',
    },
    {
      name: 'syncer',
      script: './dist/syncer.js',
    },
  ],
};

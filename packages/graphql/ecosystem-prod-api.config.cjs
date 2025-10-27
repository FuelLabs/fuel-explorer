module.exports = {
  apps: [
    {
      name: 'graphql',
      script: './dist/app.js',
      mode: 'cluster',
      instances: '8',
    },
  ],
};

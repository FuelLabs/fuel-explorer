module.exports = {
  apps: [
    {
      name: 'graphql',
      script: './src/app.ts',
      interpreter: 'tsx',
    },
    {
      name: 'syncer',
      script: './src/syncer.ts',
      interpreter: 'tsx',
    },
  ],
};

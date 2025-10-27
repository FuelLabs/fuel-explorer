const IS_DEBUG = process.env.DEBUG;
const APP = process.env.APP;

const commonOptions = {
  interpreter: 'tsx',
  node_args: IS_DEBUG ? ['--inspect-brk'] : [],
  // watch: true,
  ignore_watch: ['node_modules', './src/**/*.gen.js'],
};

module.exports = {
  apps: [
    ...(APP === 'graphql'
      ? [
          {
            ...commonOptions,
            name: 'graphql',
            script: './src/app.ts',
          },
        ]
      : []),
    ...(APP === 'syncer'
      ? [
          {
            ...commonOptions,
            name: 'syncer',
            script: './src/syncer.ts',
          },
        ]
      : []),
    ...(APP === 'assets'
      ? [
          {
            ...commonOptions,
            name: 'assets',
            script: './src/assets.ts',
          },
        ]
      : []),
    ...(APP === 'balance'
      ? [
          {
            ...commonOptions,
            name: 'balance',
            script: './src/balance.ts',
          },
        ]
      : []),
    ...(APP === 'l1'
      ? [
          {
            ...commonOptions,
            name: 'l1',
            script: './src/l1.ts',
          },
        ]
      : []),
    ...(APP === 'cosmos'
      ? [
          {
            ...commonOptions,
            name: 'cosmos',
            script: './src/cosmos.ts',
          },
        ]
      : []),
    ...(APP === 'jobs'
      ? [
          {
            ...commonOptions,
            name: 'jobs',
            script: './src/jobs.ts',
          },
        ]
      : []),
  ],
};

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
  ],
};

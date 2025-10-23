import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib';

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '~portal': resolve(__dirname, './src'),
        '~public-portal': resolve(__dirname, './public'),
        crypto: 'crypto-browserify',
        buffer: 'buffer',
        process: 'process/browser',
        wagmi: resolve(__dirname, '../../node_modules/wagmi'),
        '@wagmi/core': resolve(__dirname, '../../node_modules/@wagmi/core'),
        connectkit: resolve(__dirname, '../../node_modules/connectkit'),
        'connectkit/build/types': resolve(
          __dirname,
          '../../node_modules/connectkit/build/types',
        ),
        '@fuels/ui': resolve(__dirname, '../ui/src'),
      },
      preserveSymlinks: true,
    },
    define: {
      global: 'globalThis',
    },
    build: isLib
      ? {
          lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'AppPortal',
            fileName: 'app-portal',
            formats: ['es', 'cjs'],
          },
          rollupOptions: {
            external: (id) => {
              // Externalize all node_modules
              if (id.includes('node_modules')) {
                return true;
              }
              // Externalize workspace packages, but NOT @fuels/ui components
              if (id.startsWith('app-') || id.startsWith('@fuel-explorer/')) {
                return true;
              }
              // Externalize @fuels/ packages except UI components
              if (id.startsWith('@fuels/') && !id.startsWith('@fuels/ui/')) {
                return true;
              }
              return false;
            },
            output: {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
                'react-router-dom': 'ReactRouterDOM',
              },
            },
          },
        }
      : {
          // App build configuration
          rollupOptions: {
            input: resolve(__dirname, 'index.html'),
          },
        },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'clsx',
        'react-is',
        'tiny-invariant',
        'eventemitter3',
        'abitype',
        'react-smooth',
        'recharts-scale',
        'victory-vendor/d3-scale',
        'victory-vendor/d3-shape',
        '@noble/curves/secp256k1',
        '@noble/hashes/ripemd160',
        '@noble/hashes/sha256',
        '@noble/curves/abstract/utils',
        'object-assign',
        'isows',
        'crypto-browserify',
        'buffer',
        'process/browser',
        '@fuels/ui',
      ],
      exclude: ['app-commons'],
    },
    server: {
      port: 3001,
      host: true,
    },
  };
});

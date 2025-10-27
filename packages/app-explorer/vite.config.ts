import path from 'node:path';
import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';
// @ts-ignore - postcss-import doesn't have types
import postcssImport from 'postcss-import';
import tailwindcss from 'tailwindcss';
import tailwindcssNesting from 'tailwindcss/nesting';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
    react(),
    svgr(),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        dir: 'dist',
      },
    },
    commonjsOptions: {
      include: [/eventemitter3/, /node_modules/],
    },
  },
  define: {
    global: 'globalThis',
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    },
  },
  envPrefix: 'VITE_',
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '~staking': path.resolve(__dirname, '../app-staking/src'),
      '@fuel-explorer/graphql/sdk': path.resolve(
        __dirname,
        '../graphql/src/graphql/generated/sdk.ts',
      ),
      '@fuel-explorer/graphql/sdkProvider': path.resolve(
        __dirname,
        '../graphql/src/graphql/generated/sdk-provider.ts',
      ),
      '@fuel-explorer/graphql': path.resolve(__dirname, '../graphql/src'),
      '~portal': path.resolve(__dirname, '../app-portal/src'),
      'app-commons/usePausedContract': path.resolve(
        __dirname,
        '../app-commons/src/hooks/usePausedContract',
      ),
      'app-commons/useSafeWriteContract': path.resolve(
        __dirname,
        '../app-commons/src/hooks/useSafeWriteContract',
      ),
      'app-commons/src/chains/ethWagmi': path.resolve(
        __dirname,
        '../app-commons/src/chains/ethWagmi',
      ),
      'app-commons/PausedContractDialogContent': path.resolve(
        __dirname,
        '../app-commons/src/components/PausedContractDialogContent',
      ),
      'app-commons/PausedContractAlert': path.resolve(
        __dirname,
        '../app-commons/src/components/PausedContractAlert',
      ),
      'app-commons/safeWriteContract': path.resolve(
        __dirname,
        '../app-commons/src/hooks/useSafeWriteContract/safeWriteContract',
      ),
      'app-commons/': path.resolve(__dirname, '../app-commons/src/'),
      'app-commons': path.resolve(__dirname, '../app-commons/src'),
      'app-portal': path.resolve(__dirname, '../app-portal/src'),
      '@fuels/ui/styles.css': path.resolve(
        __dirname,
        '../ui/src/theme/index.css',
      ),
      '@fuels/ui': path.resolve(__dirname, '../ui/src'),
      // Polyfill aliases for compatibility
      buffer: 'buffer',
      process: 'process/browser',
    },
    dedupe: ['react', 'react-dom', 'wagmi', 'connectkit', 'viem'],
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'react-helmet-async',
      'process',
      'buffer',
    ],
    exclude: [
      'app-portal',
      '@fuels/ui',
      'app-commons',
      'app-staking',
      '@fuel-explorer/graphql',
    ],
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
    postcss: {
      plugins: [postcssImport, tailwindcssNesting, tailwindcss, autoprefixer],
    },
  },
  server: {
    port: 3030,
    host: true,
    strictPort: true,
    watch: {
      ignored: [
        '!**/node_modules/@fuels/ui/**',
        '!**/node_modules/app-commons/**',
      ],
    },
    fs: {
      allow: ['..'],
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const isSsr = mode === 'ssr';

  return {
    appType: isSsr ? 'custom' : 'spa',
    plugins: [react()],

    // Bundle CJS deps into the SSR output so Node's ESM loader
    // doesn't choke on their named exports during prerender.
    ssr: {
      noExternal: ['react-helmet-async'],
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    build: {
      ...(isSsr
        ? {
            ssr: true,
            outDir: 'dist/server',
            rollupOptions: {
              input: path.resolve(__dirname, 'src/entry-server.tsx'),
              output: {
                entryFileNames: '[name].js',
                format: 'esm',
              },
            },
          }
        : {
            outDir: 'dist',
            rollupOptions: {
              output: {
                entryFileNames: 'assets/[name]-[hash].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash][extname]',
                manualChunks: {
                  vendor: ['react', 'react-dom', 'react-router-dom'],
                  ui: ['framer-motion', 'lucide-react'],
                },
              },
            },
          }),
    },

    server: {
      open: '/',
    },
  };
});

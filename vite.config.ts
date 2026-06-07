import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const isSsr = mode === 'ssr';

  return {
    appType: isSsr ? 'custom' : 'spa',
    plugins: [react()],

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

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const root = path.resolve(__dirname);

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    rollupOptions: {
      input: {
        index:                path.resolve(root, 'index.html'),
        homepage:             path.resolve(root, 'Whitebooks Homepage.html'),
        whitebooks:           path.resolve(root, 'Whitebooks.html'),
        heroVariations:       path.resolve(root, 'Hero Variations.html'),
        softwares:            path.resolve(root, 'Softwares.html'),
        apis:                 path.resolve(root, 'APIs.html'),
        apiGst:               path.resolve(root, 'API - GST.html'),
        apiEInvoice:          path.resolve(root, 'API - e-Invoice.html'),
        apiEWayBill:          path.resolve(root, 'API - e-Way Bill.html'),
        apiKsa:               path.resolve(root, 'API - KSA e-Invoice.html'),
        softwareAccounting:   path.resolve(root, 'Software - Accounting.html'),
        softwareGst:          path.resolve(root, 'Software - GST.html'),
        softwareEInvoice:     path.resolve(root, 'Software - e-Invoice.html'),
        softwareEWayBill:     path.resolve(root, 'Software - e-Way Bill.html'),
        softwareKsa:          path.resolve(root, 'Software - KSA e-Invoicing.html'),
        devportal:            path.resolve(root, 'WhiteBooks Developer Portal.html'),
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },

  server: {
    open: '/',
  },
});

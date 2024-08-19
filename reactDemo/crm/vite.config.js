import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    eslintPlugin({
      cache: false,
      exclude: /node_modules/,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import'@/assets/css/variables.scss';",
        charset: false,
      },
    },
    preprocessorMaxWorkers: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    open: true,
  },
});

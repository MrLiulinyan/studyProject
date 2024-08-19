import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import eslintPlugin from 'vite-plugin-eslint';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    eslintPlugin({
      cache: false,
      exclude: /node_modules/,
    }),
    AutoImport({
      imports: ['vue', 'uni-app', 'pinia'],
      eslintrc: {
        enabled: true,
        globalsPropValue: true,
      },
    }),
  ],
  server: {
    port: 8080,
    proxy: {
      '/host': {
        target: 'https://tea.qingnian8.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/host/, ''),
      },
    },
  },
});

import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

const __dirname = process.env.PROJECT_DIR || '.';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '#components': path.resolve(__dirname, './src/components'),
      '#pages': path.resolve(__dirname, './src/pages'),
      '#blocks': path.resolve(__dirname, './src/blocks'),
      '#routes': path.resolve(__dirname, './src/routes'),
      '#hooks': path.resolve(__dirname, './src/hooks'),
      '#utils': path.resolve(__dirname, './src/utils'),
      '#blocks-locales': path.resolve(__dirname, './src/blocks/locales'),
      '#services': path.resolve(__dirname, './src/services'),
      '#types': path.resolve(__dirname, './src/types'),
      '#assets': path.resolve(__dirname, './src/assets'),
    },
  },
});

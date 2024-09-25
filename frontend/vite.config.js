import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['xlsx'], // Mark 'xlsx' as external
    },
    outDir: 'frontend',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Proxy API requests to backend during development
        changeOrigin: true,
      },
    },
  },
});

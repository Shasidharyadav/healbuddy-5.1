import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // This prevents 'xlsx' from being included in the final bundle during production
      external: ['xlsx'], 
    },
    outDir: 'frontend', // Specify the output directory as 'frontend'
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Proxy API requests to the backend during development
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: rewrite API path if needed
      },
    },
  },
  optimizeDeps: {
    include: ['xlsx'], // Pre-bundle 'xlsx' to improve development speed
  },
});

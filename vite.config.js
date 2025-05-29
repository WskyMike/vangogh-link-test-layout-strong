import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: '/vangogh-link-test-layout-strong/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    open: true,
    port: 5173
  },
  resolve: {
    alias: {
      '@': '/scripts',
      '@styles': '/styles',
      '@blocks': '/blocks'
    }
  }
});
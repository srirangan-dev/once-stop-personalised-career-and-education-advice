// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],

  // Base path for production builds (important for Vercel)
  base: mode === 'development' ? '/' : './',

  // Dev server settings
  server: {
    proxy: mode === 'development' ? {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    } : {},
  },

  // Build output folder
  build: {
    outDir: 'dist',
  },
}))
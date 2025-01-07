import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // or use '0.0.0.0'
    port: 3000, // Optional: Set a specific port
  },
  // Base URL configuration for deployment
  base: '/',
  build: {
    outDir: 'dist', // Output directory for build
    rollupOptions: {
      input: 'index.html', // Entry point of your app
    },
  },
})

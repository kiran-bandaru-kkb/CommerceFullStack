import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // Proxy all /api requests to your Django backend
      '/api': 'http://127.0.0.1:8000',
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      '^/vin/decode': {
        target: 'https://frauwall-auto-dev.azurewebsites.net',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {},
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
          'ui-vendor': ['lucide-react'],
          // Page chunks
          'home': ['./src/pages/home/Home.tsx'],
          'vin-decoder': ['./src/pages/vin-decoder/VinDecoder.tsx'],
          'auth': ['./src/pages/auth/Login.tsx', './src/pages/auth/Register.tsx'],
        },
      },
    },
    chunkSizeWarningLimit: 600, // Increase limit slightly to reduce warnings
  },
})

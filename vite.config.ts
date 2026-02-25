import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/heliosxau/',
  plugins: [react()],
  assetsInclude: ['**/*.lottie'],
  server: {
    host: true,
    allowedHosts: ['downwardly-brashiest-halley.ngrok-free.dev']
  },
  build: {
    outDir: 'dist_new'
  }
})

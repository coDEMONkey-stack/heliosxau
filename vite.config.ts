import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  assetsInclude: ['**/*.lottie'],
  server: {
    host: true,
    allowedHosts: ['downwardly-brashiest-halley.ngrok-free.dev']
  }
})

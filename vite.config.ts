import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), cloudflare()],
  assetsInclude: ['**/*.lottie'],
  server: {
    host: true,
    allowedHosts: ['downwardly-brashiest-halley.ngrok-free.dev']
  }
})
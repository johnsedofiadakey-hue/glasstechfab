import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'logo.png'],
      manifest: {
        short_name: 'Glasstech',
        name: 'Glasstech Fabrications Hub',
        icons: [
          {
            src: '/favicon.svg',
            type: 'image/svg+xml',
            sizes: '512x512'
          }
        ],
        start_url: '.',
        display: 'standalone',
        theme_color: '#1A1410',
        background_color: '#F9F7F4'
      }
    })
  ],
})

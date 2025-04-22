import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Presso',
        short_name: 'Presso',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#6f4e37',
        icons: [
          {
            src: 'presso-icon.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});

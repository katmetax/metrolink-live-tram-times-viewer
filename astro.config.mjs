import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';

// https://astro.build/config
import react from '@astrojs/react';

// https://astro.build/config
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    AstroPWA({
      registerType: 'autoUpdate',
      includeAssets: ['/icons/favicon.svg', '/icons/apple-icon-180.png'],
      workbox: {
        clientsClaim: true,
        skipWaiting: true
      },
      manifest: {
        name: 'Metrolink Tram Times',
        short_name: 'Metrolink Tram Times',
        description: 'Find out when the next Manchester Metrolink tram is',
        theme_color: '#11191f',
        icons: [
          {
            src: '/icons/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icons/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  output: 'server',
  adapter: netlify(),
});

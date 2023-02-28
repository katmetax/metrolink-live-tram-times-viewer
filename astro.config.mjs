import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';

// https://astro.build/config
import react from '@astrojs/react';

// https://astro.build/config
import netlify from '@astrojs/netlify/functions';

// https://astro.build/config
export default defineConfig({
	integrations: [
		react(),
		AstroPWA({
			includeAssets: ['favicon.svg', 'apple-icon-180.png'],
			manifest: {
				name: 'Metrolink Tram Times',
				short_name: 'Metrolink Tram Times',
				description: 'Find out when the next Manchester Metrolink tram is',
				theme_color: '#11191f',
				icons: [
					{
						src: 'manifest-icon-192.maskable.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'manifest-icon-512.maskable.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: 'manifest-icon-512.maskable.png',
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

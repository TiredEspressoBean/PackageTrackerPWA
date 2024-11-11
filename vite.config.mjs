import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import {VitePWA} from "vite-plugin-pwa";

export default defineConfig({
  plugins: [react(), tsconfigPaths(),
	  VitePWA({
	  registerType: 'autoUpdate', // Automatically updates service worker
	  includeAssets: ['favicon.svg', 'robot.txt'],
	  manifest: {
		  name: 'Where\'s My Package',
		  short_name: 'WMP',
		  description: 'A package tracking applications',
		  theme_color: '#47cab4ff',
		  background_color: '#ffffff',
		  start_url: '/',
		  display: 'standalone',
		  icons: [
			  {
				  src: '/public/icons/manifest-icon-192.maskable.png',
				  sizes: '192x192',
				  type: 'image/png',
			  },
			  {
				  src: '/public/icons/manifest-icon-512.maskable.png',
				  sizes: '512x512',
				  type: 'image/png',
			  },
		  ],
	  },
  }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import {VitePWA} from "vite-plugin-pwa";

export default defineConfig({
  plugins: [react(), tsconfigPaths(),
	  VitePWA({
		  "name": "Where's My Package",
		  "short_name": "WMP",
		  "start_url": "/",
		  "display": "standalone",
		  "background_color": "#ffffff",
		  "lang": "en",
		  "scope": "/",
		  "description": "A package tracking application",
		  "theme_color": "#47cab4",
		  "icons": [
			  {
				  "src": "/public/icons/manifest-icon-192.maskable.png",
				  "sizes": "192x192",
				  "type": "image/png"
			  },
			  {
				  "src": "/public/icons/manifest-icon-512.maskable.png",
				  "sizes": "512x512",
				  "type": "image/png"
			  }
		  ],
		  "categories": [
			  "productivity",
			  "shopping",
			  "utilities"
		  ]
	  }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
});

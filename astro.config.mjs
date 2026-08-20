// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://satpcgo.es',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  // Use a non-standard port (14321) so it doesn't collide with other
  // dev servers (3000, 4200, 4321, 5173, etc.) when running multiple
  // projects in parallel.
  server: {
    port: 14321,
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  vite: {
    resolve: {
      alias: {
        '~': new URL('./src/', import.meta.url).pathname,
      },
    },
  },
});

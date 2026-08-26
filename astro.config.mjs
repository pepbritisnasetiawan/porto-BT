import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://pepbritisnasetiawan.github.io',
  base: '/porto-BT',
  integrations: [sitemap()],
  server: { port: 4321 },
});

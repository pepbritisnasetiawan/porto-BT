import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://porto-bt.pepbritisnasetiawan.dev',
  integrations: [sitemap()],
  server: { port: 4321 },

});

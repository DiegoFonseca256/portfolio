// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // The live address. Canonical URLs, hreflang alternates, Open Graph tags and the sitemap all derive from it.
  site: 'https://diegofonseca.vercel.app',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    react(),
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', pt: 'pt-BR' } },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
});

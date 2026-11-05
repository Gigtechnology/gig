// @ts-check
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// TODO : à confirmer avec le client — final production domain
const SITE_URL = process.env.SITE_URL || 'https://gig-yvpk.vercel.app';

export default defineConfig({
  site: SITE_URL,
  output: 'static', // every page is prerendered; /api/quote opts out (prerender = false)
  adapter: vercel(),
  integrations: [sitemap({ filter: (page) => !page.includes('/api/') && !page.includes('/thank-you') })],
  env: {
    schema: {
      GOOGLE_PLACES_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      PLACE_ID: envField.string({ context: 'server', access: 'secret', optional: true }),
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      QUOTE_TO_EMAIL: envField.string({ context: 'server', access: 'secret', optional: true }),
      QUOTE_FROM_EMAIL: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
});

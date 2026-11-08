import type { APIRoute } from 'astro';
import siteData from '../data/site.json';

export const GET: APIRoute = ({ site }) => {
  // Maintenance mode: ask search engines not to crawl anything
  if (siteData.maintenance) {
    return new Response('User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
  const sitemap = new URL('/sitemap-index.xml', site).href;
  return new Response(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

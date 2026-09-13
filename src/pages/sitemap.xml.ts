import type { APIRoute } from 'astro';
import { site as portfolio } from '../data/site';
export const GET: APIRoute = ({ site }) => {
  const paths = ['/'];
  const lastmod = portfolio.lastModified.slice(0, 10);
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${new URL(path, site)}</loc><lastmod>${lastmod}</lastmod></url>`).join('')}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

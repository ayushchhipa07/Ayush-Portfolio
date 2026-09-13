import type { APIRoute } from 'astro';
import { site as identity } from '../../data/site';
export const GET: APIRoute = ({ site }) =>
  new Response(
    `Contact: mailto:${identity.email}\nPreferred-Languages: en, hi\nCanonical: ${new URL('/.well-known/security.txt', site)}\nExpires: 2027-09-01T00:00:00Z\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );

import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) => {
  const agents = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-SearchBot',
    'Claude-User',
    'PerplexityBot',
    'Google-Extended',
    'Applebot-Extended',
    '*',
  ];
  return new Response(
    agents.map((agent) => `User-agent: ${agent}\nAllow: /`).join('\n\n') +
      `\n\nSitemap: ${new URL('/sitemap.xml', site)}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
};

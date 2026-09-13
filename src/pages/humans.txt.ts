import type { APIRoute } from 'astro';
import { site as identity } from '../data/site';
export const GET: APIRoute = ({ site }) =>
  new Response(
    `/* TEAM */\nName: ${identity.name}\nRole: Software Engineer\nLocation: Jaipur, Rajasthan, India\nContact: ${identity.email}\nGitHub: ${identity.github}\nLinkedIn: ${identity.linkedin}\n\n/* SITE */\nURL: ${site}\nLanguage: English (India)\nStack: Astro, TypeScript, CSS\nPurpose: One-page project showcase, service inquiries, and recruiter inquiries\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );

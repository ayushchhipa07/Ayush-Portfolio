import type { APIRoute } from 'astro';
import { site as identity, projects } from '../data/site';
export const GET: APIRoute = ({ site }) =>
  new Response(
    `# Ayush Chhipa\n\n> Software Engineer in Jaipur, India. Full-stack developer at Businessnow Private Limited, contributing to NiyamHub and ComplyRelax.\n\n## Projects\n${projects.map((project) => `- [${project.name}](${new URL(`/#${project.id}`, site)}): ${project.description}\n  Stack: ${project.stack.join(', ')}.\n  Live product: ${project.live}`).join('\n')}\n\n## Portfolio\n- [About](${new URL('/#about', site)}): Professional background, BCA education, and HackerRank certification.\n- [Skills](${new URL('/#skills', site)}): Frontend, backend, and automation tools.\n- [Services](${new URL('/#services', site)}): Full-stack development, product improvements, APIs, and automation.\n- [Contact](${new URL('/#contact', site)}): Software engineering roles and freelance projects.\n- [GitHub](${identity.github})\n- [LinkedIn](${identity.linkedin})\n\nNiyamHub and ComplyRelax are both projects of Businessnow Private Limited. Ayush contributes to their software and workflows as part of his role at the company.\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );

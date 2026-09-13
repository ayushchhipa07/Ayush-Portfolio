import { defineConfig } from 'astro/config';
import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';
import { redirects } from './redirects.mjs';

if (existsSync('.env')) loadEnvFile('.env');

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://ayushchhipa-codes.onrender.com',
  output: 'static',
  trailingSlash: 'always',
  redirects,
  devToolbar: { enabled: false },
  build: { format: 'directory' },
  vite: { css: { postcss: { plugins: [] } } },
});

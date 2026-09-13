import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { createApp } from './app.js';

dotenv.config({ path: fileURLToPath(new URL('.env', import.meta.url)), quiet: true });
const port = Number(process.env.PORT || 4322);
const host =
  process.env.PORTFOLIO_HOST || (process.env.RENDER === 'true' ? '0.0.0.0' : '127.0.0.1');
const env = { ...process.env };
if (host === '127.0.0.1') {
  env.CLIENT_ORIGIN = [
    env.CLIENT_ORIGIN || env.PUBLIC_SITE_URL || 'https://ayushchhipa-codes.onrender.com',
    `http://127.0.0.1:${port}`,
  ].join(',');
}
const app = createApp({ env });
app.listen(port, host, () =>
  console.log(`Portfolio and contact service running at http://${host}:${port}`),
);

import { existsSync, readFileSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { loadEnvFile } from 'node:process';
if (existsSync('.env')) loadEnvFile('.env');
if (existsSync('server/.env')) loadEnvFile('server/.env');
const problems = [];
for (const key of ['IDENTITY_APPROVED', 'COMPLYRELAX_APPROVED', 'METRICS_APPROVED']) {
  if (process.env[key] !== 'true')
    problems.push(`${key} must be true after Ayush explicitly approves the final content.`);
}
const domain = process.env.PUBLIC_SITE_URL;
try {
  if (!domain || new URL(domain).protocol !== 'https:') throw new Error();
} catch {
  problems.push('PUBLIC_SITE_URL must be the confirmed HTTPS domain.');
}
const resume = process.env.PUBLIC_RESUME_PATH || '/Ayush-Chhipa-Resume.docx';
const resumePath = resolve('public', `.${resume}`);
if (
  !resume.startsWith('/') ||
  !/\.(pdf|docx)$/i.test(resume) ||
  !resumePath.startsWith(resolve('public') + sep) ||
  !existsSync(resumePath)
)
  problems.push('Add the approved resume PDF or DOCX under public/ and configure its path.');
else {
  const bytes = readFileSync(resumePath);
  const valid = /\.pdf$/i.test(resume)
    ? bytes.subarray(0, 5).equals(Buffer.from('%PDF-'))
    : bytes.subarray(0, 4).equals(Buffer.from([0x50, 0x4b, 0x03, 0x04])) &&
      bytes.includes(Buffer.from('[Content_Types].xml')) &&
      bytes.includes(Buffer.from('word/document.xml'));
  if (!valid) problems.push('The resume must be a valid PDF or DOCX file.');
}
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS)
  problems.push('Configure EMAIL_USER and EMAIL_PASS for real contact delivery.');
if (problems.length) {
  console.error('Publication is not ready:\n' + problems.map((item) => `- ${item}`).join('\n'));
  process.exitCode = 1;
} else
  console.log(
    'Content prerequisites recorded. Complete the deployment and webmaster verification checklist in LAUNCH_CHECKLIST.md.',
  );

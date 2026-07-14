import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import sharp from 'sharp';

const root = process.cwd();
const articlesDirectory = path.join(root, 'content', 'articles');
const outputDirectory = path.join(root, 'public', 'articles');

const escapeXml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

const wrapText = (value, maxCharacters) => {
  const words = String(value).trim().split(/\s+/);
  const lines = [];
  let line = '';

  words.forEach((word) => {
    const nextLine = line ? `${line} ${word}` : word;
    if (nextLine.length > maxCharacters && line) {
      lines.push(line);
      line = word;
    } else {
      line = nextLine;
    }
  });

  if (line) lines.push(line);
  return lines.slice(0, 3);
};

if (fs.existsSync(articlesDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });

  const articleFiles = fs
    .readdirSync(articlesDirectory)
    .filter((fileName) => fileName.endsWith('.md') && !fileName.startsWith('_'));

  for (const fileName of articleFiles) {
    const source = fs.readFileSync(path.join(articlesDirectory, fileName), 'utf8');
    const { data } = matter(source);
    if (data.draft) continue;

    const slug = String(data.slug || fileName.replace(/\.md$/, ''));
    const titleLines = wrapText(data.title, 30);
    const subtitle = String(data.subtitle || data.description || '');
    const topics = Array.isArray(data.tags) ? data.tags.slice(0, 3).join(' · ') : '';
    const titleMarkup = titleLines.map((line, index) => `<tspan x="84" dy="${index === 0 ? 0 : 82}">${escapeXml(line)}</tspan>`).join('');

    const svg = `
      <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
        <rect width="1200" height="630" fill="#f8e9cc"/>
        <rect x="28" y="28" width="1144" height="574" rx="34" fill="none" stroke="#061d27" stroke-opacity="0.16"/>
        <rect x="84" y="72" width="58" height="58" rx="16" fill="#4fc8c2"/>
        <text x="113" y="112" text-anchor="middle" font-family="Arial, sans-serif" font-size="25" font-weight="700" fill="#ffffff">W.</text>
        <text x="166" y="108" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="#8f1711">CONNOR LOVE · ARTICLES</text>
        <text x="84" y="226" font-family="Arial, sans-serif" font-size="68" font-weight="700" letter-spacing="-2" fill="#061d27">${titleMarkup}</text>
        <text x="84" y="510" font-family="Arial, sans-serif" font-size="28" font-weight="500" fill="#43545a">${escapeXml(subtitle.slice(0, 76))}</text>
        <text x="84" y="562" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#8f1711">${escapeXml(topics.toUpperCase())}</text>
      </svg>`;

    await sharp(Buffer.from(svg)).png({ quality: 92 }).toFile(path.join(outputDirectory, `${slug}-og.png`));
  }
}

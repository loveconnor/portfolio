import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const ARTICLES_DIRECTORY = path.join(process.cwd(), 'content', 'articles');
const REQUIRED_FIELDS = ['title', 'description', 'dateReleased'];

const normalizeDate = (value) => {
  const date = value instanceof Date ? value : new Date(`${value}T12:00:00Z`);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString().slice(0, 10);
};

const getReadingTime = (content) => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
};

const getWordCount = (content) => content.trim().split(/\s+/).filter(Boolean).length;

const normalizeTags = (value) => {
  if (Array.isArray(value)) {
    return value.map(String).filter(Boolean);
  }

  return value ? [String(value)] : [];
};

const getRenderableContent = (content, title, subtitle) => {
  const lines = content.trimStart().split('\n');

  if (lines[0]?.trim() === `# ${title}`) {
    lines.shift();

    while (lines[0]?.trim() === '') {
      lines.shift();
    }

    const subtitleLine = lines[0]?.trim();
    if (subtitle && (subtitleLine === `*${subtitle}*` || subtitleLine === `_${subtitle}_`)) {
      lines.shift();
    }
  }

  return lines.join('\n').trimStart();
};

const getArticleFileNames = () => {
  if (!fs.existsSync(ARTICLES_DIRECTORY)) {
    return [];
  }

  return fs.readdirSync(ARTICLES_DIRECTORY).filter((fileName) => fileName.endsWith('.md') && !fileName.startsWith('_'));
};

const readArticleFile = (fileName) => {
  const fileSlug = fileName.replace(/\.md$/, '');
  const fullPath = path.join(ARTICLES_DIRECTORY, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const metadata = {
    ...data,
    dateReleased: data.dateReleased || data.date,
  };

  if (metadata.draft) {
    return null;
  }

  const missingFields = REQUIRED_FIELDS.filter((field) => !metadata[field]);
  if (missingFields.length) {
    throw new Error(`${fileName} is missing required frontmatter: ${missingFields.join(', ')}`);
  }

  const normalizedDate = normalizeDate(metadata.dateReleased);
  if (!normalizedDate) {
    throw new Error(`${fileName} has an invalid dateReleased value.`);
  }

  const normalizedModifiedDate = normalizeDate(metadata.dateModified || metadata.updated || normalizedDate);
  if (!normalizedModifiedDate) {
    throw new Error(`${fileName} has an invalid dateModified value.`);
  }

  const slug = metadata.slug ? String(metadata.slug).trim() : fileSlug;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`${fileName} has an invalid slug. Use lowercase words separated by hyphens.`);
  }

  const title = String(metadata.title);
  const subtitle = metadata.subtitle ? String(metadata.subtitle) : '';
  const tags = normalizeTags(metadata.tags);

  return {
    slug,
    title,
    subtitle,
    description: String(metadata.description),
    author: metadata.author ? String(metadata.author) : 'Connor Love',
    tags,
    category: metadata.category ? String(metadata.category) : tags[0] || 'Article',
    dateReleased: normalizedDate,
    dateModified: normalizedModifiedDate,
    readingTime: getReadingTime(content),
    wordCount: getWordCount(content),
    ogImage: metadata.ogImage ? String(metadata.ogImage) : `/articles/${slug}-og.png`,
    content: getRenderableContent(content, title, subtitle),
  };
};

export const getAllArticles = () => {
  const articles = getArticleFileNames()
    .map(readArticleFile)
    .filter(Boolean)
    .sort((a, b) => new Date(b.dateReleased).getTime() - new Date(a.dateReleased).getTime());

  const slugs = new Set();
  articles.forEach((article) => {
    if (slugs.has(article.slug)) {
      throw new Error(`Duplicate article slug: ${article.slug}`);
    }
    slugs.add(article.slug);
  });

  return articles;
};

export const getArticleBySlug = (slug) => getAllArticles().find((article) => article.slug === slug) || null;

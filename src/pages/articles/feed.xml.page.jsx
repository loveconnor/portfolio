import { getAllArticles } from '@src/lib/articles';

const escapeXml = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');

function Feed() {
  return null;
}

export function getServerSideProps({ res }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://connorlove.com';
  const items = getAllArticles()
    .map(
      (article) => `
        <item>
          <title>${escapeXml(article.title)}</title>
          <link>${siteUrl}/articles/${escapeXml(article.slug)}</link>
          <guid>${siteUrl}/articles/${escapeXml(article.slug)}</guid>
          <pubDate>${new Date(`${article.dateReleased}T12:00:00Z`).toUTCString()}</pubDate>
          <author>loveconnor2005@gmail.com (${escapeXml(article.author)})</author>
          ${article.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('')}
          <description>${escapeXml(article.description)}</description>
        </item>`,
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>Connor Love — Articles</title>
        <link>${siteUrl}/articles</link>
        <description>Notes on design, development, and building thoughtful digital products.</description>
        <language>en-us</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${items}
      </channel>
    </rss>`;

  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(xml);
  res.end();

  return { props: {} };
}

export default Feed;

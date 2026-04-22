import { getAllPosts } from "@/features/posts/data";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatRssDate(value: string) {
  return new Date(value).toUTCString();
}

export async function GET() {
  const posts = await getAllPosts();
  const lastBuildDate = posts[0]?.updatedAt ?? posts[0]?.publishedAt ?? new Date().toISOString();

  const items = posts
    .map((post) => {
      const postUrl = `${siteConfig.url}/posts/${post.slug}`;
      const categories = [post.category, ...post.tags]
        .map((category) => `      <category>${escapeXml(category)}</category>`)
        .join("\n");

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${formatRssDate(post.publishedAt)}</pubDate>
${categories}
    </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.title)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>ko</language>
    <lastBuildDate>${formatRssDate(lastBuildDate)}</lastBuildDate>
    <atom:link href="${siteConfig.rssUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

import { getAllPosts } from "@/features/posts/data";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const posts = await getAllPosts();
  const body = [
    `# ${siteConfig.name}`,
    "",
    siteConfig.description,
    "",
    "## Site",
    `- URL: ${siteConfig.url}`,
    `- Language: ${siteConfig.language}`,
    `- RSS: ${siteConfig.rssUrl}`,
    `- Sitemap: ${siteConfig.url}/sitemap.xml`,
    "",
    "## Main sections",
    `- Home: ${siteConfig.url}`,
    `- Posts: ${siteConfig.url}/posts`,
    `- About: ${siteConfig.url}/about`,
    "",
    "## Public posts",
    ...posts.map(
      (post) =>
        `- [${post.title}](${siteConfig.url}/posts/${post.slug}): ${post.description}`,
    ),
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

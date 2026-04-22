const siteUrl = "https://yunkoo.dev";

export const siteConfig = {
  name: "yunkoo.dev",
  title: "yunkoo.dev",
  description: "엉망진창 삽질하는 개발 블로그",
  url: siteUrl,
  ogImage: "/blog-logo.svg",
  rssUrl: `${siteUrl}/rss.xml`,
} as const;

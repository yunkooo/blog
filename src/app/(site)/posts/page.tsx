import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/features/posts/data";
import { formatKoreanDate } from "@/features/posts/utils/format-korean-date";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  description: siteConfig.description,
  alternates: {
    canonical: "/posts",
    types: {
      "application/rss+xml": siteConfig.rssUrl,
    },
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: `${siteConfig.url}/posts`,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 py-8 sm:py-10">
      <section className="px-0 py-1 sm:py-3">
        <div className="divide-y divide-border">
          {posts.map((post) => (
            <article key={post.slug} className="py-4 first:pt-0 last:pb-0 sm:py-5">
              <Link
                href={`/posts/${post.slug}`}
                className="group block rounded-2xl border border-transparent px-2 py-3 transition-colors duration-200 hover:border-border/60 hover:bg-muted/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 sm:px-4"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-8">
                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span className="rounded-full border border-border/70 px-2.5 py-1 text-xs uppercase tracking-[0.14em]">
                        {post.readingTimeText}
                      </span>
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground transition-colors group-hover:bg-accent"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div>
                      <h2 className="text-lg tracking-[-0.015em] transition-colors group-hover:text-foreground/75 sm:text-xl">
                        {post.title}
                      </h2>
                      <p className="mt-2.5 text-sm leading-7 text-muted-foreground sm:text-base">
                        {post.description}
                      </p>
                    </div>
                  </div>

                  <time className="shrink-0 text-sm text-muted-foreground/90 md:mt-1 md:whitespace-nowrap">
                    {formatKoreanDate(post.publishedAt)}
                  </time>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

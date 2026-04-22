import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { getAllPosts } from "@/posts/api";
import { formatKoreanDate } from "@/posts/utils/format-korean-date";

export const metadata: Metadata = {
  description: "프론트엔드 개발 기록과 회고를 모아둔 글 목록입니다.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: "프론트엔드 개발 기록과 회고를 모아둔 글 목록입니다.",
    url: siteConfig.url,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: siteConfig.title,
    description: "프론트엔드 개발 기록과 회고를 모아둔 글 목록입니다.",
  },
};

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <main className="flex-1 py-8 sm:py-10">
      <section className="px-0 py-1 sm:py-3">
        <div className="divide-y divide-border">
          {posts.map((post) => (
            <article key={post.slug} className="py-4 first:pt-0 last:pb-0 sm:py-5">
              <Link
                href={`/posts/${post.slug}`}
                className="group block rounded-2xl px-2 py-3 transition-all duration-200 hover:bg-muted/25 hover:px-3 sm:px-4"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-8">
                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span className="rounded-full border border-border/80 px-2.5 py-1 text-xs uppercase tracking-[0.14em]">
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
                      <h2 className="text-lg tracking-[-0.01em] transition-colors group-hover:text-foreground/75 sm:text-xl">
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

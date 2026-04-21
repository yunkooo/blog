import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatKoreanDate, getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Posts",
  description: "프론트엔드 개발 기록과 회고를 모아둔 글 목록입니다.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `Posts | ${siteConfig.name}`,
    description: "프론트엔드 개발 기록과 회고를 모아둔 글 목록입니다.",
    url: siteConfig.url,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `Posts | ${siteConfig.name}`,
    description: "프론트엔드 개발 기록과 회고를 모아둔 글 목록입니다.",
  },
};

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
        <SiteHeader currentSection="posts" />

        <main className="flex-1 py-10 sm:py-12">
          <section className="px-0 py-2 sm:py-4">
            <div className="divide-y divide-border">
              {posts.map((post) => (
                <article key={post.slug} className="py-5 first:pt-0 last:pb-0">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="group block rounded-2xl px-2 py-3 transition-colors hover:bg-muted/30 sm:px-4"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
                      <div className="min-w-0 flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <span>{post.readingTimeText}</span>
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <div>
                          <h2 className="text-xl transition-colors group-hover:text-muted-foreground">
                            {post.title}
                          </h2>
                          <p className="mt-3 text-muted-foreground">{post.description}</p>
                        </div>
                      </div>

                      <time className="shrink-0 text-sm text-muted-foreground md:mt-1 md:whitespace-nowrap">
                        {formatKoreanDate(post.publishedAt)}
                      </time>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}

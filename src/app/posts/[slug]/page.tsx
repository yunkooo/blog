import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  formatKoreanDate,
  getPostBySlug,
  getPostSlugs,
  renderPostContent,
} from "@/lib/posts";
import { siteConfig } from "@/lib/site";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const url = `${siteConfig.url}/posts/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/posts/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      locale: "ko_KR",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      tags: post.tags,
      authors: [siteConfig.name],
      images: [
        {
          url: siteConfig.ogImage,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.description,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function PostDetailPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const content = await renderPostContent(post.content);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
        <SiteHeader currentSection="posts" />

        <main className="flex-1 py-8 sm:py-10">
          <article className="px-0 py-1 sm:py-2">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              목록으로 돌아가기
            </Link>

            <header className="mt-4 border-b border-border pb-6 sm:pb-7">
              <div className="flex flex-wrap items-center gap-2.5 text-sm text-muted-foreground">
                <span className="rounded-full border border-border/80 px-2.5 py-1 text-xs uppercase tracking-[0.14em]">
                  {post.category}
                </span>
                <time dateTime={post.publishedAt}>{formatKoreanDate(post.publishedAt)}</time>
                <span className="text-border" aria-hidden="true">
                  ·
                </span>
                <span>{post.readingTimeText}</span>
              </div>

              <h1 className="mt-4 text-[1.9rem] font-semibold tracking-tight sm:text-[2.45rem]">
                {post.title}
              </h1>
              <p className="mt-3 w-full text-base leading-8 text-muted-foreground sm:text-lg">
                {post.description}
              </p>

              {post.tags.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-background px-3 py-1 text-sm text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </header>

            <div className="post-content mt-7 w-full sm:mt-8">{content}</div>
          </article>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { getPostBySlug, getPostSlugs } from "@/features/posts/data";
import { renderPostContent } from "@/features/posts/components/post-content";
import { formatKoreanDate } from "@/features/posts/utils/format-korean-date";
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
    description: post.description,
    alternates: {
      canonical: `/posts/${post.slug}`,
      types: {
        "application/rss+xml": siteConfig.rssUrl,
      },
    },
    openGraph: {
      title: siteConfig.title,
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
      title: siteConfig.title,
      description: post.description,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function PostDetailPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const content = await renderPostContent(post.content);
  const postUrl = `${siteConfig.url}/posts/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.ogImage}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  return (
    <main className="flex-1 py-8 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <article className="px-0 py-1 sm:py-2">
        <Link
          href="/"
          className="inline-flex items-center rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          목록으로 돌아가기
        </Link>

        <header className="mt-4 border-b border-border pb-6 sm:pb-7">
          <div className="flex flex-wrap items-center gap-2.5 text-sm text-muted-foreground">
            <span className="rounded-full border border-border/70 px-2.5 py-1 text-xs uppercase tracking-[0.14em]">
              {post.category}
            </span>
            <time dateTime={post.publishedAt}>{formatKoreanDate(post.publishedAt)}</time>
            <span className="text-border" aria-hidden="true">
              ·
            </span>
            <span>{post.readingTimeText}</span>
          </div>

          <h1 className="mt-4 text-[1.88rem] font-semibold tracking-tight sm:text-[2.45rem]">
            {post.title}
          </h1>
          <p className="mt-3 w-full text-[0.98rem] leading-8 text-muted-foreground sm:text-[1.06rem]">
            {post.description}
          </p>

          {post.tags.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/80 bg-background px-3 py-1 text-sm text-muted-foreground"
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
  );
}
